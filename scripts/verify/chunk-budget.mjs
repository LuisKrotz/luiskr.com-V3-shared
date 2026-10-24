#!/usr/bin/env node
/**
 * @file chunk-budget.mjs
 * @description Minified chunk-size gate. Scans dist/v/<tier>/assets/{js,css}
 * after the build and fails when any emitted file exceeds its budget:
 *
 *   JS  ≤ 50 KiB hard cap; ~10–30 KiB is the preferred granularity —
 *       http/2+ multiplexing makes that range the best trade between
 *       request overhead, compression context, and per-chunk parse cost.
 *   CSS ≤ 32 KiB hard cap. Stylesheets are atomic cascade units — splitting
 *       a single cascade-ordered sheet into smaller files adds render-
 *       relevant requests without reducing total bytes or parse work, so
 *       the cap guards growth rather than chasing a smaller number.
 *
 * Sizes are measured on the emitted minified files, not source maps or the
 * .br/.gz siblings — the gate guards how much code an engine must parse per
 * request.
 *
 * Splitting is module-granular, so pre-bundled vendor artifacts shipped as a
 * single module (three.webgpu/three.core/three.module, @firebase dist
 * bundles) and generated per-locale payload modules (virtual:i18n-boot/*,
 * virtual:docs-manifest) cannot be divided further by the bundler. Those
 * live in chunk-budget-exceptions.json with justification + review date —
 * every other file past the cap fails the gate.
 *
 * Every emitted tier is a native ES-module build (the matrix floor is
 * es2022 — no monolithic IIFE targets exist to exempt).
 *
 * Output: experiments/docs/reports/chunk-budget.json → bundled into
 * dist/deploy-info/ by scripts/build/deploy-info.mjs.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const DIST = path.join(ROOT, 'dist', 'v')
const REPORTS_DIR = path.join(ROOT, 'experiments', 'docs', 'reports')
const REPORT_FILE = path.join(REPORTS_DIR, 'chunk-budget.json')
const EXCEPTIONS_FILE = path.join(ROOT, 'chunk-budget-exceptions.json')

/** Hard caps on emitted file size (bytes). */
const BUDGETS = { js: 50 * 1024, css: 32 * 1024 }

const loadExceptions = () => {
  if (!fs.existsSync(EXCEPTIONS_FILE)) return []
  return JSON.parse(fs.readFileSync(EXCEPTIONS_FILE, 'utf-8')).exceptions || []
}

/**
 * Exception patterns are regex strings matched against the emitted file's
 * name-without-hash (e.g. `three.webgpu` matches `three.webgpu-CkO-_Y2V.js`
 * across every tier).
 */
const nameKey = (file) => file.replace(/-[A-Za-z0-9_-]{8}\.(js|css)$/, '')

const isExcepted = (file, kind, exceptions) => {
  const key = nameKey(file)

  return exceptions.some(
    (e) => (e.kind === '*' || e.kind === kind) && new RegExp(e.pattern).test(key)
  )
}

/** Recursively collects emitted .js/.css files under a tier's assets dir. */
const collectFiles = (dir, out = []) => {
  if (!fs.existsSync(dir)) return out

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)

    if (entry.isDirectory()) collectFiles(p, out)
    else if (/\.(js|css)$/.test(entry.name)) out.push(p)
  }

  return out
}

const exceptions = loadExceptions()
const tiers = fs.existsSync(DIST) ? fs.readdirSync(DIST) : []
const files = []

for (const tier of tiers) {
  collectFiles(path.join(DIST, tier, 'assets'), files)
}

const violations = []
const exempted = []
let scanned = 0

for (const file of files) {
  const kind = file.endsWith('.css') ? 'css' : 'js'
  const size = fs.statSync(file).size
  const rel = path.relative(ROOT, file)

  scanned++

  if (size <= BUDGETS[kind]) continue

  if (isExcepted(path.basename(file), kind, exceptions)) exempted.push({ file: rel, size, kind })
  else violations.push({ file: rel, size, kind, budget: BUDGETS[kind] })
}

fs.mkdirSync(REPORTS_DIR, { recursive: true })
fs.writeFileSync(
  REPORT_FILE,
  JSON.stringify(
    {
      budgets: BUDGETS,
      preferred: { js: 10 * 1024, css: 8 * 1024 },
      scanned,
      violations,
      exempted,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  )
)

for (const v of violations) {
  console.error(
    `chunk-budget: ${v.file} is ${(v.size / 1024).toFixed(1)} KiB — exceeds the ${v.budget / 1024} KiB ${v.kind} cap`
  )
}

if (violations.length) {
  console.error(
    `chunk-budget: ${violations.length} file(s) over budget — split or justify in chunk-budget-exceptions.json`
  )
  process.exit(1)
}

console.log(
  `chunk-budget: ${scanned} files scanned, ${exempted.length} exempted, all within budget`
)
