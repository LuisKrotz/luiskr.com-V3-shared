/**
 * @file build-targets.mjs
 * @description Multi-target build orchestrator.
 *
 *   1. `vite build` once per tier in build/es-targets.mjs — each emits
 *      dist/v/<tier>/assets/{js,css,misc}/<name>-<hash>.* as ES modules.
 *      The tier floor is es2022 (iOS 16 / iPhone 8+X); the default tier
 *      additionally emits dist/index.html, dist/cms/index.html, public/
 *      assets and the service worker.
 *   2. esbuild each core/legacy-polyfills/* entry to
 *      dist/assets/polyfills/<name>-<hash>.js — fetched ONLY by engines
 *      whose runtime guards fail.
 *   3. Rewrite dist/index.html: swap the hardcoded module script for the
 *      inlined ES5 loader (scripts/build/browser-loader.js) + the tier/polyfill
 *      manifest, so every visitor downloads only the bundle their engine
 *      can execute. Modern browsers and Lighthouse get the default
 *      es2026/esnext bundle with zero polyfills and zero prefixes.
 *
 * Invoked by `yarn build` AFTER the prebuild verify gate passes.
 */
// zlib/fs async work rides the libuv threadpool — default width is 4, which
// would starve the ~19k-file compression drain and parallel vite children.
// Must be set before the first threadpool use, hence above all imports that
// could trigger one (imports themselves don't initialize the pool).
import os from 'node:os'
if (!process.env.UV_THREADPOOL_SIZE)
  process.env.UV_THREADPOOL_SIZE = String(Math.max(8, os.cpus().length))

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { ES_TARGETS, POLYFILLS, POLYFILL_ORDER, BROWSERS } from '../../build/es-targets.mjs'
import {
  buildLocalePages,
  prefetchStarMediaDims,
  prefetchTranslations,
} from './build-locale-pages.mjs'
import { buildLlmPages } from './generate-llm-pages.mjs'
import { withFsRetry, withFsRetryAsync } from './fs-retry.mjs'
import { queueCompressedWrite, drainCompressedWrites } from './compress-queue.mjs'
import { genOnnxModels } from './gen-onnx-models.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..', '..')
const DIST = path.join(ROOT, 'dist')

const run = (cmd, args, env = {}, label = '') =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: ROOT,
      env: { ...process.env, ...env },
      stdio: 'inherit',
      shell: false,
    })

    // Long build steps (rolldown's chunk render, minify) emit nothing for
    // minutes — a heartbeat keeps the log visibly alive instead of looking
    // frozen. Stderr so piped stdout stays clean.
    const t0 = Date.now()

    const heartbeat = setInterval(() => {
      process.stderr.write(
        `  … ${label || `${cmd} ${args.join(' ')}`} — ${Math.round((Date.now() - t0) / 1000)}s elapsed\n`
      )
    }, 30000)

    child.on('error', (err) => {
      clearInterval(heartbeat)
      reject(err)
    })

    child.on('exit', (code) => {
      clearInterval(heartbeat)

      if (code === 0) resolve()
      else reject(new Error(`${cmd} ${args.join(' ')} exited with code ${code}`))
    })
  })

// ── 1. Per-tier vite builds ─────────────────────────────────────────────────
// The first build owns emptyOutDir + publicDir copying; later builds only
// add their own v/<tier>/ directory (no html inputs, no public re-copy).
// LK_ONLY=a,b limits the build list (dev iteration; manifest still expects
// every tier on disk).
const only = process.env.LK_ONLY ? new Set(process.env.LK_ONLY.split(',')) : null
const buildList = ES_TARGETS.filter((t) => !only || only.has(t.name))

/**
 * Concurrent vite-build pool width. Each child peaks around 1.5–2.5GB
 * (rolldown graph + terser + compression plugin), so the cap is RAM-
 * derived: ~4GiB per build against total memory, bounded by cores.
 * LK_BUILD_WORKERS overrides for hosts with different budgets.
 */
const BUILD_WORKERS = (() => {
  const override = Number.parseInt(process.env.LK_BUILD_WORKERS ?? '', 10)

  if (Number.isFinite(override) && override > 0) return override

  const byRam = Math.floor(os.totalmem() / (4 * 1024 ** 3))
  const byCpu = Math.max(1, Math.floor(os.cpus().length / 3))

  return Math.max(2, Math.min(6, byRam, byCpu))
})()

/**
 * Runs `vite build` for one tier. `first` marks the owner build: it alone
 * wipes dist/ (emptyOutDir) and copies the public dir, so it must run
 * BEFORE the parallel wave starts.
 * @param {object} t ES_TARGETS entry
 * @param {number} i index in buildList (banner display only)
 * @param {boolean} first whether this build owns dist/ initialization
 * @returns {Promise<void>} resolves on child exit 0
 */
const buildTier = (t, i, first) => {
  console.log(`\n═══ build ${i + 1}/${buildList.length}: ${t.name} (${t.format}) ═══`)

  // LK_KEEP_DIST keeps emptyOutDir off, so a rebuilt tier must clear its own
  // v/<tier>/ dir — stale hashed bundles would linger and the manifest scan
  // below could pick the old index-*.js, pointing visitors at dead code.
  withFsRetry(() => fs.rmSync(path.join(DIST, 'v', t.name), { recursive: true, force: true }))

  return run(
    'yarn',
    ['vite', 'build'],
    {
      LK_TARGET: t.name,
      LK_EMPTY_OUTDIR: first && !process.env.LK_KEEP_DIST ? '1' : '0',
      LK_NO_PUBLIC: first && !process.env.LK_KEEP_DIST ? '' : '1',
    },
    `vite build ${t.name}`
  )
}

const viteTiers = buildList

// ONNX model + ORT runtime artifacts regenerate into website/public
// BEFORE build 0 — that tier alone copies public/ into dist/, so the
// ML layer's .onnx graphs and /ort/ wasm must exist by then.
genOnnxModels()

// Build 0 owns the dist wipe + public copy — it must complete before any
// parallel sibling writes, or emptyOutDir could erase their early output.
await buildTier(viteTiers[0], buildList.indexOf(viteTiers[0]), true)

/**
 * Bounded drain over the remaining tiers: BUILD_WORKERS workers pull from
 * the shared index until exhausted. Each vite child writes only its own
 * dist/v/<tier>/ tree (LK_EMPTY_OUTDIR=0), so concurrent children can never
 * touch each other's output. Iterative worker-drain — the tasks are
 * already materialized, no self-similar traversal here.
 */
let tierCursor = 1

await Promise.all(
  Array.from({ length: Math.min(BUILD_WORKERS, Math.max(1, viteTiers.length - 1)) }, async () => {
    while (tierCursor < viteTiers.length) {
      const t = viteTiers[tierCursor]

      tierCursor++

      await buildTier(t, buildList.indexOf(t), false)
    }
  })
)

// ── 2. Polyfill bundles ─────────────────────────────────────────────────────
console.log('\n═══ polyfill bundles ═══')

const { rolldown } = await import('rolldown')

// One classic-script bundle per group — iife can't code-split, so each
// entry gets its own single-file build. Rolldown holds the graph in Rust
// off the JS thread, so the builds overlap cleanly under Promise.all —
// each bundle only ~100-300KB, six concurrent is well under any RAM cap.
// The es2022 tier floor bounds the syntax target too: polyfills are only
// fetched after a tier probe passed, so nothing older ever executes them.
await Promise.all(
  POLYFILLS.map(async (p) => {
    const bundle = await rolldown({
      input: { [p.name]: path.join(ROOT, p.entry) },
      platform: 'browser',
      transform: { target: 'es2022' },
    })

    try {
      await withFsRetryAsync(() =>
        bundle.write({
          dir: path.join(DIST, 'assets/polyfills'),
          format: 'iife',
          entryFileNames: '[name]-[hash].js',
          minify: true,
          codeSplitting: false,
        })
      )
    } finally {
      if (typeof bundle.close === 'function') await bundle.close()
    }
  })
)

// Hash-named files → runtime paths for the loader manifest.
const polyDir = path.join(DIST, 'assets/polyfills')

const polyFiles = fs.readdirSync(polyDir)

const findPoly = (name) =>
  `/assets/polyfills/${polyFiles.find((f) => f.startsWith(`${name}-`) && f.endsWith('.js'))}`

const polyManifest = POLYFILLS.map((p) => ({
  name: p.name,
  file: findPoly(p.name),
  guard: p.guard,
}))

// ── 3. Missing per-tier CSS ─────────────────────────────────────────────────
// Any tier whose vite build produced no css/ asset (rolldown emits none when
// code-splitting is off) gets the global sheet compiled directly:
// sass → lightningcss with the tier's prefix target.
const cssTargetMap = (cssTarget) => {
  if (cssTarget === 'esnext') return undefined
  const m = cssTarget.match(/^([a-z]+)(\d+)$/)
  if (!m) return undefined
  const version = parseInt(m[2], 10) << 16
  const map = {
    chrome: 'chrome',
    firefox: 'firefox',
    safari: 'safari',
    edge: 'edge',
    ie: 'ie',
    samsung: 'samsung',
    opera: 'opera',
  }
  const engine = map[m[1]]
  return engine ? { [engine]: version } : undefined
}

/**
 * Lazily-cached sass compilation of the global sheet — the input file and
 * options are identical for every tier call, so the (~1-2s) compile runs
 * once per build instead of once per emitCss() call (up to 26 times).
 * Only the per-tier lightningcss `targets` differ downstream.
 */
let compiledCssSheet = null

const compiledSheet = async () => {
  if (compiledCssSheet) return compiledCssSheet

  const sass = await import('sass')

  compiledCssSheet = sass.compile(path.join(ROOT, 'core/sass/components/shell/app.scss'), {
    loadPaths: [path.join(ROOT, 'core/sass')],
    silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'],
    sourceMap: true,
    sourceMapIncludeSources: true,
  })

  return compiledCssSheet
}

const emitCss = async (t, prefix = 'index-') => {
  const { transform } = await import('lightningcss')

  const compiled = await compiledSheet()

  const outDir = path.join(DIST, 'v', t.name, 'assets', 'css')
  withFsRetry(() => fs.mkdirSync(outDir, { recursive: true }))

  const { code, map } = transform({
    filename: 'app.css',
    code: Buffer.from(compiled.css),
    minify: true,
    targets: cssTargetMap(t.cssTarget),
    errorRecovery: true,
    sourceMap: true,
    inputSourceMap: JSON.stringify(compiled.sourceMap),
  })

  const hash = crypto.createHash('md5').update(code).digest('hex').slice(0, 8)
  const name = `${prefix}${hash}.css`
  const finalCode = Buffer.concat([code, Buffer.from(`\n/*# sourceMappingURL=${name}.map */\n`)])

  // queueCompressedWrite performs the sync plain-file write itself and
  // defers only the .br/.gz siblings to the shared compression queue.
  queueCompressedWrite(path.join(outDir, name), finalCode)

  // Sass emits absolute build-machine paths in `sources` — rewrite them
  // repo-relative so deployed maps don't leak the filesystem layout.
  const parsedMap = JSON.parse(map.toString())

  parsedMap.sources = parsedMap.sources.map((s) =>
    s.replace(/^.*?(?=src[/\\]sass)/, '').replace(/\\/g, '/')
  )

  withFsRetry(() => fs.writeFileSync(path.join(outDir, `${name}.map`), JSON.stringify(parsedMap)))

  return name
}

// ── 4. Tier manifest from the emitted assets ────────────────────────────────
const tierManifest = []

for (const t of ES_TARGETS) {
  const jsDir = path.join(DIST, 'v', t.name, 'assets', 'js')
  const cssDir = path.join(DIST, 'v', t.name, 'assets', 'css')

  const jsFiles = fs.existsSync(jsDir) ? fs.readdirSync(jsDir) : []

  const js = jsFiles.find((f) => f.startsWith('index-') && f.endsWith('.js'))

  if (!js) {
    if (only) {
      console.warn(`  ! tier ${t.name} not built (LK_ONLY dev mode) — omitted from manifest`)
      continue
    }
    throw new Error(`missing entry bundle for tier ${t.name}`)
  }

  const cssFiles = fs.existsSync(cssDir) ? fs.readdirSync(cssDir) : []

  let css = cssFiles.filter((f) => f.startsWith('index-') && f.endsWith('.css'))

  if (!css.length) {
    const emitted = await emitCss(t)
    css = [emitted]
    console.log(`  css emitted for ${t.name}: ${emitted}`)
  } else {
    // rolldown-vite doesn't emit sourcemaps for code-split CSS assets yet —
    // ship the sass→lightningcss mapped global sheet alongside so every
    // tier carries a .css.map that resolves back to real .scss lines.
    const dbg = await emitCss(t, 'app-')
    console.log(`  css sourcemap emitted for ${t.name}: ${dbg}.map`)
  }

  tierManifest.push({
    name: t.name,
    js: `/v/${t.name}/assets/js/${js}`,
    css: css[0],
    module: t.format === 'module',
    default: t.name === 'es2026',
    tests: t.test,
  })
}

for (const t of tierManifest) t.css = `/v/${t.name}/assets/css/${t.css}`

// ── 5. Chunk-size gate — every emitted JS ≤ 50KiB / CSS ≤ 5KiB minified ────
// Runs while dist/ holds the fresh chunks but before the expensive
// locale-pages fan-out, so an over-budget regression fails the build here
// instead of after 18k documents were written.
await run(process.execPath, ['shared/scripts/verify/chunk-budget.mjs'], {}, 'chunk-budget scan')

// ── 6. Inline loader + manifest into dist/index.html ────────────────────────
const indexPath = path.join(DIST, 'index.html')

let html = fs.readFileSync(indexPath, 'utf8')

const loaderSrc = fs.readFileSync(path.join(ROOT, 'shared/scripts/build/browser-loader.js'), 'utf8')

const manifestSrc = `window.__LK=${JSON.stringify({ targets: tierManifest, polys: polyManifest, order: POLYFILL_ORDER, browsers: BROWSERS })};`

// Minify manifest + loader together (the loader is authored ES5-readable;
// terser ecma:5 keeps it parseable on the oldest engines it detects).
const { minify: terserMinify } = await import('terser')

const { code: loaderMin } = await terserMinify(manifestSrc + '\n' + loaderSrc, {
  ecma: 5,
  compress: { passes: 2 },
  mangle: { toplevel: true },
  format: { ascii_only: true },
})

// Replace the default-tier module script tag with the inline loader. The
// emitted html (default build) contains exactly one app entry script. On
// re-runs the html is already rewritten — locate the injected block by the
// modulepreload link + the `window.__LK` script instead.
const moduleScriptRe =
  /<script\s+type="module"\s+crossorigin\s+src="(\/v\/es2026\/assets\/js\/index-[^"]+\.js)"><\/script>/i
const injectedRe =
  /<link\s+rel="modulepreload"\s+crossorigin\s+href="(\/v\/es2026\/assets\/js\/index-[^"]+\.js)"><script>window\.__LK=[\s\S]*?<\/script>/i

const match = html.match(moduleScriptRe) || html.match(injectedRe)

if (!match) throw new Error('could not locate entry module script in dist/index.html')

const defaultEntry = match[1]

const loaderTag = `<link rel="modulepreload" crossorigin href="${defaultEntry}"><script>${loaderMin.trim()}</script>`

html = html.replace(match[0], loaderTag)

// Star-field dossier images store no dims — probe each unique CDN image
// once so emitted <img> tags carry real width/height attrs (cached for
// every locale's fan-out below). Pull the live RTDB translations in
// parallel so prerendered pages carry current per-locale CMS text.
await Promise.all([prefetchStarMediaDims(), prefetchTranslations()])

// Per-locale shells: emit dist/<loc>/<slug>/index.html for every sitemap
// route with translated title/meta/JSON-LD + hreflang alternates, and return
// the localized root document (alternates injected). CMS is never touched.
// buildLocalePages drains the shared compression queue internally — the
// ~19k-page fan-out's .br/.gz siblings land on the threadpool, not here.
const localePages = await buildLocalePages(DIST, html)

// LLM/agent replica surface — every public route emits a full-content
// .md + structured .json replica in every locale (canonical /llm/<loc>/
// mirror tree plus <route>.{md,json} siblings). Runs after locale-pages
// so the same prefetched RTDB translations feed both fan-outs and the
// <link rel="alternate"> tags injected by localize() resolve to files.
const llmPages = await buildLlmPages(DIST)

html = localePages.html

// Compressed index.html siblings (Firebase serves .br/.gz when present) —
// the plain write lands now, the compress pass joins the queue.
queueCompressedWrite(indexPath, html)

// Re-stamp the service-worker's precache revision for index.html so the new
// html (with the loader) is what Workbox serves.
const swPath = path.join(DIST, 'service-worker.js')

if (fs.existsSync(swPath)) {
  const htmlHash = crypto.createHash('md5').update(html).digest('hex')
  let sw = fs.readFileSync(swPath, 'utf8')
  sw = sw.replace(
    /\{url:"index\.html",revision:"[^"]+"\}/,
    `{url:"index.html",revision:"${htmlHash}"}`
  )

  // Only re-emit siblings that already exist — an uncompressed SW keeps
  // its served shape rather than gaining .br/.gz it never had.
  if (fs.existsSync(`${swPath}.br`) && fs.existsSync(`${swPath}.gz`)) {
    queueCompressedWrite(swPath, sw)
  } else {
    withFsRetry(() => fs.writeFileSync(swPath, sw))
  }
}

// Flush every queued sibling (css emits above + index/sw here) so the
// process only exits once the whole compressed surface is on disk.
const compressed = await drainCompressedWrites()

console.log(`\n  compressed siblings: ${compressed} documents via queue`)

console.log(
  `\n  locale-pages: ${localePages.written + 1} localized documents across ${localePages.locales} locales`
)
console.log(`  llm-pages: ${llmPages.written} replica files across ${llmPages.routes} routes`)
console.log('\n═══ done ═══')
for (const t of tierManifest) console.log(`  ${t.name}: ${t.js}`)
for (const p of polyManifest) console.log(`  polyfill ${p.name}: ${p.file}`)
