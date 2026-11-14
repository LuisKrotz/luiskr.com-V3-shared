#!/usr/bin/env node
/**
 * @file scripts/verify/print-check.mjs — deterministic print-PDF
 * verification over the public route set.
 *
 * The checker drives real headless Chrome via puppeteer: every route is
 * scrolled end-to-end (arming the lazy media mounts a browsing user
 * would already hold), then `window.print()` runs the gated user job —
 * the same path a Ctrl/Cmd+P takes: settle sweep, media upgrades, the
 * decode barrier, and `printcommit` marking the snapshot-ready DOM.
 * The checker then recounts stragglers (PREP_CAP can release a wedged
 * fetch early) and emits the real `printToPDF` — which fires the
 * engine's own beforeprint (refreshMedia on the committed tree, never
 * a re-prep) — and rasterizes the output for the blank-tail check.
 *
 * Per-route assertions:
 *   1. media   — every image in the committed print tree is complete &&
 *                naturalWidth>0 (video poster stills, canvas plates,
 *                figure copies, cover photo). Retired `.print-src`
 *                layers and `is-fallback` CSS-art surfaces are exempt —
 *                the fallback IS the paint, not a missing image.
 *   2. text    — the prepped body's innerText clears the route floor
 *                (cover-only routes just need the masthead; content
 *                routes need real copy) and every `mustText` literal
 *                is present.
 *   3. tail    — the last PDF page carries ink (the back cover is a
 *                dark sheet; a white tail means a stranded blank page).
 *   4. qr      — at least `minQr` QR svg nodes exist in the print tree
 *                (the back-cover code is always there; link routes add
 *                per-link codes).
 *   5. pages   — emitted page count sits inside the route's expected
 *                window.
 *
 * Usage:
 *   yarn test:print                       — full route set on dist/
 *   yarn test:print --base=http://localhost:5179 — dev server, no build
 *   yarn test:print --paths=portfolio/melissa,search — scoped routes
 *   yarn test:print --keep                — keep emitted PDFs + rasters
 *
 * Artifacts: reports/print-check.json (bundled into dist/deploy-info)
 * plus per-route PDFs under reports/print-check/ when --keep.
 */

import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import puppeteer from 'puppeteer-core'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const DIST_DIR = path.join(ROOT, 'dist')
const REPORT_DIR = path.join(ROOT, 'reports', 'print-check')
const SUMMARY_FILE = path.join(REPORT_DIR, 'print-check.json')

/** Chrome binary — same discovery the scroll-fps gate uses. */
function resolveChrome() {
  const env =
    process.env.PRINT_CHECK_CHROME ||
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    process.env.SCROLL_FPS_CHROME
  if (env && fs.existsSync(env)) return env

  const cache = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome')
  if (fs.existsSync(cache)) {
    for (const ver of fs.readdirSync(cache).sort().reverse()) {
      const exe = path.join(cache, ver, 'chrome-win64', 'chrome.exe')
      if (fs.existsSync(exe)) return exe
    }
  }
  for (const cand of [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ]) {
    if (fs.existsSync(cand)) return cand
  }
  throw new Error('print-check: no Chrome binary found — set PRINT_CHECK_CHROME')
}

/** pdftoppm/magick come from the poppler+imagemagick installs the
 * media-convert pipeline already requires. */
const HAS_PDFTOPPM = (() => {
  try {
    execFileSync('pdftoppm', ['-v'], { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
})()
const HAS_MAGICK = (() => {
  try {
    execFileSync('magick', ['-version'], { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
})()

/* ── Route manifest ────────────────────────────────────────────────────
 * Each entry: path, the route class, a page-count window, an innerText
 * floor, a QR minimum, and literal strings the print must carry.
 * `coverOnly` routes emit just the cover+back sheets (search/404).
 */
const PORTFOLIO = [
  'aboutmarco',
  'brazilian-leather',
  'cecerele',
  'cicb',
  'clinica-de-desenvolvimento-nathalia-bond',
  'coza',
  'dell-design-system',
  'genesysinf-sageweb',
  'melissa',
  'metcha',
  'mini-melissa',
  'minimelissa',
  'mor',
  'nathalia-bond',
  'sage',
  'transa',
  'vibra',
]

const ROUTES = [
  { path: '/', kind: 'home', pages: [10, 80], minText: 2000, minQr: 1, mustText: ['Contents'] },
  // The index expands every media group — ~600 cards at one row each
  // legitimately fill a thick issue. The ceiling only guards runaway
  // pagination, not editorial length.
  // The index expands every media group — ~600 full-width card rows
  // (figure strip + title + URL + QR) legitimately fill a thick issue
  // at ~3 cards per sheet. The ceiling only guards runaway pagination.
  { path: '/sitemap', kind: 'index', pages: [150, 260], minText: 500, minQr: 1 },
  { path: '/search', kind: 'cover-only', pages: [1, 4], minText: 20, minQr: 1 },
  { path: '/404', kind: 'cover-only', pages: [1, 4], minText: 20, minQr: 1 },
  { path: '/animations', kind: 'content', pages: [3, 30], minText: 500, minQr: 1 },
  { path: '/earth-playground', kind: 'scene', pages: [2, 15], minText: 200, minQr: 1 },
  { path: '/star-field-experiment', kind: 'scene', pages: [2, 200], minText: 200, minQr: 1 },
  { path: '/gdpr', kind: 'legal', pages: [2, 15], minText: 300, minQr: 1 },
  { path: '/license', kind: 'legal', pages: [2, 15], minText: 300, minQr: 1 },
  { path: '/privacy-policy', kind: 'legal', pages: [2, 15], minText: 300, minQr: 1 },
  // In-depth docs — one necessarily carrying mermaid graphics.
  {
    path: '/docs/animations/physics-simulations',
    kind: 'docs',
    pages: [2, 20],
    minText: 300,
    minQr: 1,
  },
  { path: '/docs/architecture/routing', kind: 'docs', pages: [2, 20], minText: 300, minQr: 1 },
  { path: '/docs/guides/setup', kind: 'docs', pages: [2, 20], minText: 300, minQr: 1 },
  ...PORTFOLIO.map((slug) => ({
    path: `/portfolio/${slug}`,
    kind: 'portfolio',
    // Gallery walls print every figure — the media-rich projects (100+
    // captures) legitimately fill a thick issue. The ceiling only guards
    // runaway pagination, not editorial length.
    pages: [3, 90],
    minText: 400,
    minQr: 1,
  })),
]

/* ── Static server (mirrors the a11y checker's loopback serve) ───────── */
const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
  '.vtt': 'text/vtt',
  '.wasm': 'application/wasm',
  '.md': 'text/markdown',
  '.bin': 'application/octet-stream',
}

function serveDist() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0])
    let file = path.join(DIST_DIR, url)
    if (!file.startsWith(DIST_DIR)) {
      res.writeHead(403)
      res.end()
      return
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    if (!fs.existsSync(file) && fs.existsSync(`${file}.html`)) file = `${file}.html`
    if (!fs.existsSync(file)) file = path.join(DIST_DIR, '404', 'index.html')
    if (!fs.existsSync(file)) {
      res.writeHead(404)
      res.end('not found')
      return
    }
    const ext = path.extname(file).toLowerCase()
    res.writeHead(200, { 'content-type': MIME[ext] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }))
  )
}

/* ── Args ── */
const arg = (name) => {
  const eq = process.argv.find((a) => a.startsWith(`${name}=`))
  if (eq !== undefined) return eq.slice(name.length + 1)

  const i = process.argv.indexOf(name)
  return i > -1 ? process.argv[i + 1] : null
}
const BASE = arg('--base')
const ONLY =
  arg('--paths')
    ?.split(',')
    .map((s) => s.trim().replace(/^\//, '')) || null
const KEEP = process.argv.includes('--keep')

const routes = ONLY ? ROUTES.filter((r) => ONLY.includes(r.path.replace(/^\//, ''))) : ROUTES

let browser
let server
const results = []
const routeWarns = new Map()

const takeWarns = (route) => {
  const w = routeWarns.get(route) || []
  routeWarns.delete(route)
  return w
}
const fail = (route, what, detail) => {
  results.push({
    route,
    ok: false,
    what,
    detail: String(detail).slice(0, 300),
    warns: takeWarns(route),
  })
  console.log(`  FAIL ${route} — ${what}: ${detail}`)
}
// Non-fatal diagnostics — a commit-time straggler the barrier's stall
// bail legitimately releases is not a printed-media failure; the hard
// gate is the pdf's own beforeprint walk (`unloaded`) below.
const warn = (route, what, detail) => {
  const w = routeWarns.get(route) || []
  w.push({ what, detail: String(detail).slice(0, 300) })
  routeWarns.set(route, w)
  console.log(`  WARN ${route} — ${what}: ${detail}`)
}
const pass = (route, stats) => {
  results.push({ route, ok: true, ...stats, warns: takeWarns(route) })
  console.log(`  PASS ${route} — ${stats.pages}p, ${stats.unloaded} unloaded, ${stats.qr} qr`)
}

try {
  let base = BASE
  if (!base) {
    const served = await serveDist()
    server = served.server
    base = `http://127.0.0.1:${served.port}`
  }
  console.log(`print-check → ${base} (${routes.length} routes)`)

  browser = await puppeteer.launch({
    executablePath: resolveChrome(),
    headless: true,
    args: ['--disable-lcd-text'],
    // A persistent profile makes repeat runs converge like a real user's
    // browser: media already fetched stays warm in the HTTP cache, so a
    // re-check after a network stall only pulls the still-missing tail
    // instead of re-fetching the whole wall cold. Assertions are
    // unchanged — every img still has to be complete at commit.
    userDataDir: path.join(REPORT_DIR, '.chrome-profile'),
    // Media-index routes gate hundreds of CDN decodes behind the print
    // barrier and render ~90 sheets — the default 180s protocol ceiling
    // kills printToPDF mid-render on the heavy routes.
    protocolTimeout: 360000,
  })

  fs.mkdirSync(REPORT_DIR, { recursive: true })

  for (const route of routes) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })

    try {
      // Capture the committed print DOM the moment the engine's own
      // afterprint fires — registered before app code so it runs ahead
      // of print.ts's exit() restore.
      await page.evaluateOnNewDocument(() => {
        window.__printShot = null
        window.__walk = (root, out = []) => {
          for (const el of root.querySelectorAll('img, video, canvas')) {
            out.push({
              tag: el.tagName,
              cls: typeof el.className === 'string' ? el.className : '',
              src: (
                el.currentSrc ||
                el.getAttribute('src') ||
                el.getAttribute('poster') ||
                ''
              ).slice(0, 180),
              // Walk-ordinal — the committed and pdf-time DOMs share one
              // shape (parked videos are out before both shots), so the
              // index is element-stable and the refresh diff can tell a
              // real per-element re-swap from same-class sibling noise.
              i: out.length,
              complete: el.complete,
              nw: el.naturalWidth,
              w: Math.round(el.getBoundingClientRect?.().width || 0),
            })
          }
          for (const el of root.querySelectorAll('*')) {
            if (el.shadowRoot) window.__walk(el.shadowRoot, out)
          }
          return out
        }
        // Capture the printed DOM — NOT the afterprint state, which is
        // post-exit-restore (lazy screen srcs back in place). The hook is
        // armed lazily after the manual prep dispatch so it fires on the
        // pdf's own beforeprint, after print.ts's refreshMedia (its
        // listener registered at boot, before this one).
        window.__armPrintShot = () => {
          // Lifecycle trace — the enter/exit event sequence decides which
          // DOM the pdf renders (committed refresh vs a sync re-prep), and
          // a collapsed doc only shows its own sequence.
          window.__life = []
          const __stamp = (ev) =>
            window.__life.push(
              `${ev}|${document.documentElement.className}|cov=${document.querySelectorAll('.print-cover').length},face=${document.querySelectorAll('.print-face').length},dos=${document.querySelectorAll('.print-plate--dossier').length},back=${document.querySelectorAll('.print-back').length}`
            )
          window.addEventListener('printprepare', () => __stamp('prepare'))
          window.addEventListener('beforeprint', () => __stamp('beforeprint'))
          window.addEventListener('afterprint', () => __stamp('afterprint'))
          const __mq = matchMedia('print')
          __mq.addEventListener('change', (e) => __stamp(`mm=${e.matches}`))

          // The committed DOM at printcommit — the gate's own timestamp.
          // Capturing here beats a post-hoc evaluate: the dialog guard's
          // exit() can restore the screen DOM before a CDP eval lands.
          window.addEventListener(
            'printcommit',
            () => {
              __stamp('commit')
              window.__commitShot = window.__walk(document)
            },
            { once: true }
          )

          window.addEventListener('beforeprint', () => {
            window.__printShot = {
              text: document.body.textContent || '',
              media: window.__walk(document),
              qr: document.querySelectorAll('[class*=print-qr] svg, .print-back-qr svg').length,
              classes: [...document.querySelectorAll('[class*=print-]')]
                .map((e) => e.className)
                .join(' '),
              // Doc-level diagnostics — which stamped classes the render
              // ran under (print-cover-only / print-plate-doc / print-doc
              // each rewrite the whole sheet contract) plus the body's
              // direct children so a collapsed doc shows what survived.
              html: document.documentElement.className,
              bodyKids: [...document.body.children].map(
                (c) => `${c.tagName}.${String(c.className || '').slice(0, 60)}`
              ),
            }
          })
        }
      })

      // Cold-cache navigation budget — matches the commit window: a
      // media-index or engine route queues hundreds of CDN fetches behind
      // networkidle2 and a throttled link stretches every byte. The gate
      // asserts print correctness, not load speed (Lighthouse owns that),
      // so nav gets the same ceiling the job barrier does.
      await page.goto(`${base}${route.path}`, { waitUntil: 'networkidle2', timeout: 300000 })

      // Browse to the tail — arms every IO/lazy mount like a real reader.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 120))
        }
        window.scrollTo(0, 0)
      })
      await new Promise((r) => setTimeout(r, 1500))

      // Arm both capture hooks BEFORE the job — the printcommit walk
      // lands in-page at the exact commit tick (a post-hoc evaluate
      // races the dialog guard's exit() restore), and the beforeprint
      // walk sees the pdf's own refreshed DOM.
      await page.evaluate(() => window.__armPrintShot())

      // Commit via the gated user path — initPrintSupport wraps
      // window.print with runPrintJob: the settle sweep mounts lazy
      // media, every upgrade decode sits behind the barrier, and the
      // printcommit event marks the committed DOM as snapshot-ready.
      // A bare beforeprint dispatch would exercise only the degraded
      // menu-print path (no barrier), not what a real Ctrl+P prints.
      const committedP = page.evaluate(
        () =>
          new Promise((res) => {
            window.addEventListener('printcommit', () => res(true), { once: true })
            // Past PREP_CAP_HARD — a media-index route can legitimately
            // queue hundreds of CDN decodes before the gate releases, and
            // a cold cache stretches every fetch. Matches the pdf budget.
            setTimeout(() => res(false), 330000)
          })
      )
      await page.evaluate(() => window.print())
      const committed = await committedP

      // A job that never committed has no printable DOM — rendering it
      // anyway would chase a mid-prep document for minutes and assert
      // against garbage. Fail the route on the commit check below and
      // skip the pdf so the suite moves on.
      const pdfPath = path.join(REPORT_DIR, `${route.path.replace(/\//g, '_') || '_home'}.pdf`)
      if (committed) {
        // The pdf fires immediately — inside the dialog guard's grace
        // the job is still committed, so the pdf's own beforeprint rides
        // the cheap refreshMedia path instead of a full re-prep that
        // re-mounts every lazy card and re-kicks hundreds of decodes.
        await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, timeout: 360000 })
      }

      const shot = await page.evaluate(() => window.__printShot)

      // The committed-state walk captured at printcommit — preShot for
      // the refresh-diff and the settle recount in one. The pdf's own
      // beforeprint rides refreshMedia on the live job; diffing the two
      // shots shows whether refresh re-broke a decoded layer for a cold one.
      const preShot = await page.evaluate(() => window.__commitShot || null)
      const pendingCount = (preShot || []).filter(
        (m) => m.tag === 'IMG' && !m.cls.includes('print-src') && !(m.complete && m.nw > 0)
      ).length
      const settled = preShot !== null && pendingCount === 0

      // Tear down manually if the pdf's afterprint didn't reach.
      await page.evaluate(() => window.dispatchEvent(new Event('afterprint'))).catch(() => {})

      /* ── Assertions ── */
      let bad = false

      if (!committed) {
        fail(
          route.path,
          'commit',
          'printcommit never fired — the gated job wedged before the decode barrier'
        )
        bad = true
      }
      if (!shot) {
        fail(route.path, 'capture', 'afterprint hook saw no committed DOM')
        bad = true
      } else {
        const unloaded = shot.media.filter(
          (m) => m.tag === 'IMG' && !m.cls.includes('print-src') && !(m.complete && m.nw > 0)
        )
        if (unloaded.length) {
          fail(
            route.path,
            'media',
            `${unloaded.length} imgs blank: ${unloaded
              .slice(0, 3)
              .map((m) => m.src || m.cls)
              .join(' | ')}`
          )
          bad = true
          // Diff against the settled shot — a src that mutated between the
          // settle window and the pdf's own beforeprint points at refreshMedia
          // re-swapping a decoded layer for a cold one.
          const reSwapped = unloaded.filter((u) => {
            const before = (preShot || [])[u.i]
            return (
              before &&
              before.cls === u.cls &&
              before.src !== u.src &&
              before.complete &&
              before.nw > 0
            )
          })
          if (reSwapped.length) {
            fail(
              route.path,
              'media-refresh',
              `${reSwapped.length} imgs re-swapped to cold srcs by the pdf's own beforeprint`
            )
          }
        }
        if (!settled) {
          warn(route.path, 'media-settle', `${pendingCount} imgs still pending at commit`)
        }
        if (shot.text.replace(/\s+/g, ' ').trim().length < route.minText) {
          fail(route.path, 'text', `innerText ${shot.text.trim().length} < floor ${route.minText}`)
          bad = true
        }
        for (const t of route.mustText || []) {
          if (!shot.text.includes(t)) {
            fail(route.path, 'text', `missing literal "${t}"`)
            bad = true
          }
        }
        if (shot.qr < route.minQr) {
          fail(route.path, 'qr', `${shot.qr} qr nodes < ${route.minQr}`)
          bad = true
        }
      }

      // Tail-page ink: rasterize the last page and read mean luminance.
      // No committed job wrote no pdf — the commit failure already
      // recorded above is the route's verdict.
      if (committed && HAS_PDFTOPPM && HAS_MAGICK) {
        try {
          const info = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8' })
          const pages = Number(info.match(/Pages:\s+(\d+)/)?.[1] || 0)
          if (pages < route.pages[0] || pages > route.pages[1]) {
            const life = await page
              .evaluate(() => (window.__life || []).join(' > '))
              .catch(() => '')
            fail(
              route.path,
              'pages',
              `${pages} outside [${route.pages}] | html="${shot?.html || ''}" | kids=${(shot?.bodyKids || []).join('; ')} | life=${life}`
            )
            bad = true
          }
          const stem = path.join(REPORT_DIR, `tail-${route.path.replace(/\//g, '_')}`)
          execFileSync(
            'pdftoppm',
            ['-png', '-r', '40', '-f', String(pages), '-l', String(pages), pdfPath, stem],
            { stdio: 'pipe' }
          )
          const png = `${stem}-${String(pages).padStart(2, '0')}.png`
          if (fs.existsSync(png)) {
            const mean = Number(
              execFileSync('magick', [png, '-colorspace', 'Gray', '-format', '%[mean]', 'info:'], {
                encoding: 'utf8',
              })
            )
            if (mean > 64000) {
              fail(route.path, 'tail-blank', `last page mean ${mean.toFixed(0)} ≈ white`)
              bad = true
            }
            if (!KEEP) fs.rmSync(png, { force: true })
          }
          if (!bad) pass(route.path, { pages, unloaded: 0, qr: shot?.qr ?? 0 })
          if (!KEEP) fs.rmSync(pdfPath, { force: true })
        } catch (e) {
          fail(route.path, 'rasterize', e.message)
        }
      } else if (!bad) {
        pass(route.path, { pages: -1, unloaded: 0, qr: shot?.qr ?? 0 })
      }
    } catch (e) {
      fail(route.path, 'run', e.message)
    } finally {
      await page.close().catch(() => {})
    }
  }
} finally {
  await browser?.close().catch(() => {})
  server?.close()
}

const fails = results.filter((r) => !r.ok)
fs.mkdirSync(REPORT_DIR, { recursive: true })
fs.writeFileSync(
  SUMMARY_FILE,
  JSON.stringify(
    { routes: results.length, pass: results.length - fails.length, fail: fails.length, results },
    null,
    2
  )
)

console.log(
  `\nprint-check: ${results.length - fails.length}/${results.length} routes clean → ${path.relative(ROOT, SUMMARY_FILE)}`
)
process.exit(fails.length ? 1 : 0)
