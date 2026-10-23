/**
 * @file scripts/build/deploy-info.mjs
 * @description Assembles `dist/deploy-info/` — the "last deploy" bundle the CMS
 * exposes in its restricted Build tab.
 *
 * Sources:
 *   - .lighthouseci/manifest.json   latest Lighthouse CI run (representative runs only)
 *   - <module>/reports/coverage/coverage-summary.json  per-module Jest summaries
 *   - experiments/docs/reports/axe-report.json      axe-core WCAG accessibility scan
 *   - experiments/docs/reports/a11y-checker.json    IBM Equal Access full-site scan
 *   - experiments/docs/reports/snyk-report.json     Snyk / yarn-audit dependency scan
 *   - experiments/docs/reports/console-scan.json    console.* usage policy scan
 *
 * Outputs:
 *   - dist/deploy-info/index.json               manifest {generatedAt, commit, files}
 *   - dist/deploy-info/lighthouse-summary.json  per-URL scores + failing audits
 *   - dist/deploy-info/coverage-summary.json    Jest coverage totals + per-module
 *   - dist/deploy-info/axe-report.json          a11y violations per surface
 *   - dist/deploy-info/a11y-summary.json        IBM scan totals + per-rule/per-route
 *   - dist/deploy-info/snyk-report.json         dependency vulnerabilities
 *   - dist/deploy-info/console-scan.json        console.* usage findings
 *
 * Side effect: prunes .lighthouseci/ so ONLY the last run's representative
 * artifacts remain on disk (all other lhr-* reports are discarded).
 */

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { execSync } from 'node:child_process'

const ROOT = process.cwd()
const LHCI_DIR = path.join(ROOT, '.lighthouseci')
// Verify-pipeline scan reports live inside the docs module (served at
// /docs/reports/); dist/deploy-info bundles them from there.
const REPORTS_DIR = path.join(ROOT, 'experiments', 'docs', 'reports')
const OUT_DIR = path.join(ROOT, 'dist', 'deploy-info')

/**
 * Module workspaces that publish a coverage report — mirrors the
 * run-modules.mjs runner order.
 */
const COVERAGE_MODULES = [
  'shared',
  'core',
  'website',
  'cms',
  'experiments/earth-playground',
  'experiments/docs',
]

const DIST_DIR = path.join(ROOT, 'dist')
const TIERS_DIR = path.join(DIST_DIR, 'v')
const WASM_DIR = path.join(DIST_DIR, 'wasm')

const writeJson = (file, data) => {
  const tmp = `${file}.tmp`

  fs.writeFileSync(tmp, JSON.stringify(data, null, 2))
  fs.renameSync(tmp, file)
}

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

const gitCommit = () => {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return null
  }
}

// ─── Lighthouse ──────────────────────────────────────────────────────────────
/**
 * One representative run record — the shape manifest.json entries carry for
 * the collector (`isRepresentativeRun` runs only).
 * @param {object} lhr Parsed lhr-*.json report.
 * @param {string} filePath Absolute path of the lhr json.
 * @returns {{url: string, isRepresentativeRun: boolean, jsonPath: string,
 *   summary: object}} Synthesized manifest entry.
 */
const lhrEntry = (lhr, filePath) => ({
  url: lhr.finalDisplayedUrl || lhr.finalUrl || lhr.requestedUrl,
  isRepresentativeRun: true,
  jsonPath: filePath,
  summary: Object.fromEntries(
    Object.entries(lhr.categories || {}).map(([key, cat]) => [key, cat.score])
  ),
})

/**
 * Fallback run discovery when .lighthouseci/manifest.json is missing or
 * unreadable (interrupted/pruned runs): scan lhr-*.json files and keep the
 * NEWEST report per audited URL — manifest timestamps order chronologically,
 * so the highest fetchTime per url is the latest representative run.
 * @returns {Array} Synthesized manifest entries.
 */
const scanLhrFiles = () => {
  let files

  try {
    files = fs.readdirSync(LHCI_DIR)
  } catch {
    return []
  }

  const latest = new Map()

  for (const entry of files) {
    if (!/^lhr-\d+\.json$/.test(entry)) continue

    const file = path.join(LHCI_DIR, entry)
    const lhr = readJson(file)

    if (!lhr) continue

    const url = lhr.finalDisplayedUrl || lhr.finalUrl || lhr.requestedUrl
    const fetchedAt = Date.parse(lhr.fetchTime || '') || 0
    const prev = latest.get(url)

    if (!prev || fetchedAt > prev.fetchedAt) {
      latest.set(url, { fetchedAt, rec: lhrEntry(lhr, file) })
    }
  }

  return [...latest.values()].map((v) => v.rec)
}

const collectLighthouse = () => {
  const manifest = readJson(path.join(LHCI_DIR, 'manifest.json'))
  const runs = Array.isArray(manifest) && manifest.length ? manifest : scanLhrFiles()

  if (!runs.length) return null

  const keep = new Set()

  const urls = runs
    .filter((run) => run.isRepresentativeRun)
    .map((run) => {
      const lhr = run.jsonPath ? readJson(path.resolve(LHCI_DIR, run.jsonPath)) : null

      ;[run.jsonPath, run.htmlPath].forEach((p) => {
        if (p) keep.add(path.resolve(LHCI_DIR, p))
      })

      const failedAudits = lhr
        ? Object.values(lhr.audits || {})
            .filter((a) => a.score !== null && a.score !== undefined && a.score < 1)
            .map((a) => ({ id: a.id, title: a.title, score: a.score }))
        : []

      return {
        url: run.url,
        scores: run.summary || null,
        failedAudits,
      }
    })

  // Keep only the last run's representative artifacts — discard everything else.
  for (const entry of fs.readdirSync(LHCI_DIR)) {
    const full = path.join(LHCI_DIR, entry)

    if (entry === 'manifest.json' || keep.has(full)) continue

    try {
      fs.rmSync(full, { force: true, recursive: true })
    } catch {
      // Best-effort prune.
    }
  }

  return { urls }
}

// ─── Coverage ────────────────────────────────────────────────────────────────
// Each module writes reports/coverage/coverage-summary.json; the bundle
// carries a merged `total` (the CMS renders it directly) plus the
// per-module summaries under `modules`.
const collectCoverage = () => {
  const modules = {}
  const totals = {}

  for (const mod of COVERAGE_MODULES) {
    const summary = readJson(path.join(ROOT, mod, 'reports', 'coverage', 'coverage-summary.json'))
    if (!summary?.total) continue

    modules[mod] = summary.total

    for (const [metric, m] of Object.entries(summary.total)) {
      const acc = (totals[metric] ||= { covered: 0, total: 0, skipped: 0, pct: 0 })
      acc.covered += m.covered || 0
      acc.total += m.total || 0
      acc.skipped += m.skipped || 0
    }
  }

  if (!Object.keys(modules).length) return null

  for (const m of Object.values(totals)) {
    m.pct = m.total ? Math.round((m.covered / m.total) * 10000) / 100 : 100
  }

  return { total: totals, modules }
}

// ─── IBM a11y scan ───────────────────────────────────────────────────────────
// experiments/docs/reports/a11y-checker.json is a multi-MB per-finding dump —
// the CMS gets a compact summary: totals, per-rule aggregates (with the page
// count each rule touches), and the routes that carry any gated findings.
// The full JSON stays served at /docs/reports/a11y-checker.json for drill-down.
const collectA11y = () => {
  const report = readJson(path.join(REPORTS_DIR, 'a11y-checker.json'))

  if (!report?.results) return null

  const rules = {}

  const routes = report.results.map((p) => {
    for (const f of p.findings || []) {
      const key = `${f.level}|${f.ruleId}`
      const bucket = (rules[key] ||= {
        level: f.level,
        ruleId: f.ruleId,
        count: 0,
        pages: new Set(),
        message: f.message,
      })

      bucket.count += 1
      bucket.pages.add(p.route)
    }

    return {
      route: p.route,
      violation: p.violation || 0,
      potentialviolation: p.potentialviolation || 0,
      recommendation: p.recommendation || 0,
      manual: p.manual || 0,
      gated: p.gated || 0,
      error: p.error || undefined,
    }
  })

  return {
    generatedAt: report.generatedAt,
    engine: report.engine,
    policy: report.policy,
    gatingLevels: report.gatingLevels,
    pages: report.pages,
    totals: report.totals,
    rules: Object.values(rules)
      .map(({ pages, ...r }) => ({ ...r, pages: pages.size }))
      .sort((a, b) => b.count - a.count),
    routes: routes.filter(
      (r) => r.violation || r.potentialviolation || r.recommendation || r.gated || r.error
    ),
  }
}

// ─── Bundle stats ────────────────────────────────────────────────────────────
// Post-build dist/ sweep for the CMS Bundle section: per-tier JS/CSS
// (emitted bytes + unminified bytes recovered from each sourcemap's
// sourcesContent + the build's precompressed .gz/.br siblings), every
// prerendered HTML page, the wasm artifact table, and the remaining
// static assets — one file-type rollup plus the breakdowns the CMS
// renders per tier and per crate.

/** Byte size of a file, or null when absent. */
const fileSize = (file) => {
  try {
    return fs.statSync(file).size
  } catch {
    return null
  }
}

/**
 * Unminified source size for a built asset — the emitted `.map` carries
 * `sourcesContent` (the pre-minification module text); summing byte
 * lengths reproduces what the bundle weighed before terser/lightningcss.
 * @param {string} file Emitted bundle path.
 * @returns {number|null} Summed source bytes, or null without a map.
 */
const unminifiedSize = (file) => {
  const map = readJson(`${file}.map`)

  if (!Array.isArray(map?.sourcesContent)) return null

  let bytes = 0

  for (const src of map.sourcesContent) {
    if (typeof src === 'string') bytes += Buffer.byteLength(src)
  }

  return bytes
}

/** Recursive generator — yields every file path under `dir`. */
const walk = function* (dir) {
  let entries

  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    const p = path.join(dir, entry.name)

    if (entry.isDirectory()) yield* walk(p)
    else if (entry.isFile()) yield p
  }
}

// Auxiliary siblings emitted alongside every minified asset — excluded
// from primary-file scans (their sizes land on the parent's row).
const AUX_EXT = new Set(['.map', '.br', '.gz'])

// dist/ subtrees the sweep handles separately — tier trees, wasm
// artifacts, and this report itself get dedicated tables.
const SWEEP_SKIP = new Set(['v', 'wasm', 'deploy-info'])

// Compressed-size bound — files without .gz/.br siblings (root-level
// js, docs scripts) are compressed on the fly up to this size; beyond
// it the rollup reports 0 rather than burn build minutes on media.
const COMPUTE_MAX_BYTES = 2 * 1024 * 1024

/**
 * Sizes for one emitted file: raw bytes plus compressed bytes — the
 * build's precompressed .gz/.br siblings when they exist (vite's
 * compression emits them next to every bundled asset), computed via
 * zlib for smaller strays that ship uncompressed.
 * @param {string} file Emitted file path.
 * @returns {{bytes:number,gzip:number,brotli:number}} Size triple.
 */
const fileSizes = (file) => {
  const bytes = fileSize(file) || 0
  let gzip = fileSize(`${file}.gz`) || 0
  let brotli = fileSize(`${file}.br`) || 0

  if ((!gzip || !brotli) && bytes && bytes <= COMPUTE_MAX_BYTES) {
    const buf = fs.readFileSync(file)

    if (!gzip) gzip = zlib.gzipSync(buf).length
    if (!brotli) brotli = zlib.brotliCompressSync(buf).length
  }

  return { bytes, gzip, brotli }
}

/** Blank file-type bucket — counts plus minified/unminified/compressed bytes. */
const blank = () => ({ files: 0, bytes: 0, unminified: 0, gzip: 0, brotli: 0 })

/** Folds one file's sizes (+ optional unminified bytes) into a bucket. */
const acc = (bucket, sizes, unminified = 0) => {
  bucket.files += 1
  bucket.bytes += sizes.bytes
  bucket.unminified += unminified
  bucket.gzip += sizes.gzip
  bucket.brotli += sizes.brotli
}

/**
 * Scans one tier tree (dist/v/<tier>/): JS + CSS bundles with source-map
 * unminified sizes, misc emitted payloads (fonts/wasm spills), and the
 * ten largest chunks for the CMS "heaviest output" list.
 * @param {string} dir dist/v/<tier> path.
 * @returns {{js:object,css:object,misc:object,largest:Array}}
 */
const collectTier = (dir) => {
  const js = blank()
  const css = blank()
  const misc = blank()
  const largest = []

  for (const file of walk(dir)) {
    const ext = path.extname(file)

    if (AUX_EXT.has(ext) || ext === '.json') continue

    const sizes = fileSizes(file)

    if (ext === '.js') {
      acc(js, sizes, unminifiedSize(file) || 0)
      largest.push({ file: path.relative(DIST_DIR, file), bytes: sizes.bytes })
    } else if (ext === '.css') {
      acc(css, sizes, unminifiedSize(file) || 0)
      largest.push({ file: path.relative(DIST_DIR, file), bytes: sizes.bytes })
    } else {
      acc(misc, sizes)
    }
  }

  largest.sort((a, b) => b.bytes - a.bytes)

  return { js, css, misc, largest: largest.slice(0, 10) }
}

/** Per-crate wasm table — .wasm module bytes + .js glue bytes each. */
const collectWasmCrates = () => {
  const crates = []

  let entries

  try {
    entries = fs.readdirSync(WASM_DIR, { withFileTypes: true })
  } catch {
    return crates
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    let wasmBytes = 0
    let jsBytes = 0
    let jsFiles = 0
    let files = 0

    for (const file of walk(path.join(WASM_DIR, entry.name))) {
      const ext = path.extname(file)

      files += 1

      if (ext === '.wasm') wasmBytes += fileSize(file) || 0
      else if (ext === '.js') {
        jsBytes += fileSize(file) || 0
        jsFiles += 1
      }
    }

    crates.push({ crate: entry.name, files, wasmBytes, jsBytes, jsFiles })
  }

  crates.sort((a, b) => a.crate.localeCompare(b.crate))

  return crates
}

/**
 * Full dist/ bundle inventory: a file-type rollup (js, css, html, wasm,
 * assets) with minified/unminified/compressed bytes, the per-tier
 * breakdown, the per-crate wasm table, and HTML grouped by top-level
 * directory (the prerendered locale trees).
 * @returns {object|null} The bundle-stats report, or null without dist/.
 */
const collectBundleStats = () => {
  if (!fs.existsSync(DIST_DIR)) return null

  const totals = { js: blank(), css: blank(), html: blank(), wasm: blank(), assets: blank() }
  const tiers = []
  const htmlByDir = {}
  const largest = []

  // Every emitted file under dist/ — classified by extension into the
  // rollup buckets; aux siblings (.map/.br/.gz) are folded into their
  // parent's sizes instead of counted as payload.
  for (const entry of fs.readdirSync(DIST_DIR, { withFileTypes: true })) {
    const top = path.join(DIST_DIR, entry.name)
    const files = entry.isDirectory() ? (SWEEP_SKIP.has(entry.name) ? [] : walk(top)) : [top]

    for (const file of files) {
      const ext = path.extname(file)

      if (AUX_EXT.has(ext)) continue

      const sizes = fileSizes(file)

      if (ext === '.js') {
        acc(totals.js, sizes, unminifiedSize(file) || 0)
      } else if (ext === '.css') {
        acc(totals.css, sizes, unminifiedSize(file) || 0)
      } else if (ext === '.html') {
        acc(totals.html, sizes)

        const dir = path.relative(DIST_DIR, path.dirname(file)).split(path.sep)[0] || '.'

        htmlByDir[dir] = htmlByDir[dir] || { dir, files: 0, bytes: 0 }
        htmlByDir[dir].files += 1
        htmlByDir[dir].bytes += sizes.bytes
      } else if (ext === '.wasm') {
        acc(totals.wasm, sizes)
      } else {
        acc(totals.assets, sizes)
      }
    }
  }

  // Tier trees get their own rows — the same buckets plus the ten
  // heaviest emitted chunks anywhere in the tier.
  let tierEntries

  try {
    tierEntries = fs.readdirSync(TIERS_DIR, { withFileTypes: true })
  } catch {
    tierEntries = []
  }

  for (const entry of tierEntries) {
    if (!entry.isDirectory()) continue

    const t = collectTier(path.join(TIERS_DIR, entry.name))

    tiers.push({ name: entry.name, ...t })

    largest.push(...t.largest)

    // Tier bundles ARE shipped js/css — fold every tier into the rollup
    // (each visitor downloads one tier; the CMS shows the per-tier rows
    // alongside the all-tiers total).
    for (const [key, bucket] of [
      ['js', t.js],
      ['css', t.css],
    ]) {
      totals[key].files += bucket.files
      totals[key].bytes += bucket.bytes
      totals[key].unminified += bucket.unminified
      totals[key].gzip += bucket.gzip
      totals[key].brotli += bucket.brotli
    }
  }

  const wasm = collectWasmCrates()

  for (const crate of wasm) {
    totals.wasm.files += crate.files
    totals.wasm.bytes += crate.wasmBytes
    // The wasm-pack glue is shipped js — counted here since the wasm/
    // subtree is skipped by the primary sweep.
    totals.js.files += crate.jsFiles
    totals.js.bytes += crate.jsBytes
  }

  largest.sort((a, b) => b.bytes - a.bytes)

  const byDir = Object.values(htmlByDir).sort((a, b) => b.files - a.files)

  return {
    generatedAt: new Date().toISOString(),
    totals,
    tiers,
    wasm,
    html: { ...totals.html, byDir: byDir.slice(0, 20) },
    largest: largest.slice(0, 15),
  }
}

// ─── Assemble ────────────────────────────────────────────────────────────────
const main = () => {
  const lighthouse = collectLighthouse()

  const coverage = collectCoverage()

  const bundle = collectBundleStats()

  const a11y = collectA11y()

  fs.mkdirSync(OUT_DIR, { recursive: true })

  const files = {}

  if (bundle) {
    writeJson(path.join(OUT_DIR, 'bundle-stats.json'), bundle)
    files.bundle = 'bundle-stats.json'
  }

  if (lighthouse) {
    writeJson(path.join(OUT_DIR, 'lighthouse-summary.json'), lighthouse)
    files.lighthouse = 'lighthouse-summary.json'
  }

  if (coverage) {
    writeJson(path.join(OUT_DIR, 'coverage-summary.json'), coverage)
    files.coverage = 'coverage-summary.json'
  }

  if (a11y) {
    writeJson(path.join(OUT_DIR, 'a11y-summary.json'), a11y)
    files.a11y = 'a11y-summary.json'
  }

  // Scan reports produced by the verify pipeline (axe jest suite, security-scan,
  // console-scan) — copied verbatim so the CMS shows exactly what gated the build.
  for (const [key, file] of [
    ['axe', 'axe-report.json'],
    ['snyk', 'snyk-report.json'],
    ['consoleScan', 'console-scan.json'],
  ]) {
    const report = readJson(path.join(REPORTS_DIR, file))
    if (report) {
      writeJson(path.join(OUT_DIR, file), report)
      files[key] = file
    }
  }

  const index = {
    generatedAt: new Date().toISOString(),
    commit: gitCommit(),
    files,
  }

  writeJson(path.join(OUT_DIR, 'index.json'), index)

  console.log(
    `[deploy-info] wrote ${OUT_DIR} (${Object.keys(files).join(', ') || 'no sources found'})`
  )
}

main()
