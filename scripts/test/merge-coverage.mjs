#!/usr/bin/env node
/**
 * @file merge-coverage.mjs
 * @description Unions the raw coverage maps each module's Jest run wrote to
 * <module>/reports/coverage/coverage-final.json, then re-emits PER-MODULE
 * reports filtered to that module's authored source roots.
 *
 * Why this step exists: module suites run in isolation, but coverage is
 * cross-cutting — a website suite that imports a core util produces real
 * hits in core's tree. Jest only instruments collectCoverageFrom globs, so
 * every module config instruments ALL authored source; each raw map then
 * describes the whole tree as seen by that module's tests. Merging them
 * gives every module its true coverage — the union of every suite that
 * touched its files — which is what scripts/verify/coverage-gate.mjs
 * enforces at 100% per file.
 *
 * Outputs per module (under <module>/reports/coverage/):
 *   coverage-final.json    merged map filtered to the module's src roots
 *   coverage-summary.json  per-file metric summary (deploy-info consumes)
 *   index.html + assets    browsable HTML report
 *
 * Usage: node shared/scripts/test/merge-coverage.mjs [module…]
 */
import fs from 'node:fs'
import path from 'node:path'
import istanbulCoverage from 'istanbul-lib-coverage'
import libReport from 'istanbul-lib-report'
import reports from 'istanbul-reports'

import { discoverModules, REPO_ROOT } from '../modules.mjs'

const { createCoverageMap } = istanbulCoverage

const ROOT = REPO_ROOT

/**
 * Module → { root, src } mirrors coverage-gate.mjs: `root` is where reports
 * land, `src` the authored-source roots whose files enter the filtered map.
 * Sourced from discoverModules() so scaffolded experiments self-register.
 */
const MODULES = Object.fromEntries(
  discoverModules().map((m) => [m.name, { root: m.root, src: m.src }])
)

const only = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const emit = Object.entries(MODULES).filter(([n]) => !only.length || only.includes(n))

const runDir = (root) => path.join(ROOT, root, 'reports', 'coverage-run')
const coverageDir = (root) => path.join(ROOT, root, 'reports', 'coverage')

// Union EVERY module's raw map regardless of `only` — cross-module hits are
// real coverage (a website suite exercising a core util), so a scoped run
// like `--coverage core` must still union the other modules' raw maps or the
// re-emitted report silently drops their contributions. `only` only filters
// which per-module reports are written below.
//
// Maps are merged PER FILE. Jest instrumentation is dialect-shaped — each
// module's transform (babel vs ts preset options) can emit different
// statement/branch location tables for the SAME source, and istanbul
// unions by location, so cross-dialect entries can never merge. The old
// rule kept the newest-mtime shape and discarded the rest, which let an
// arbitrary run order overwrite a well-covered file with a nearly-empty
// entry (e.g. a later module's raw map recording the file 6% while its own
// module measured 88%). Instead: the module that OWNS the file supplies
// the authoritative dialect; every entry sharing that shape is unioned
// (a 0-hit entry is "not measured by that suite", not "uncovered"). Files
// outside every module's src root fall back to the newest shape. A stale
// run whose shape no longer matches the owner dialect is still discarded —
// its phantom uncovered locations could never be hit.
const rawMaps = []

for (const [name, { root }] of Object.entries(MODULES)) {
  const file = path.join(runDir(root), 'coverage-final.json')
  if (!fs.existsSync(file)) {
    process.stderr.write(
      `merge-coverage: ${name} has no coverage-run/coverage-final.json — skipped\n`
    )
    continue
  }

  rawMaps.push({
    name,
    mtime: fs.statSync(file).mtimeMs,
    data: JSON.parse(fs.readFileSync(file, 'utf-8')),
  })
}

if (!rawMaps.length) {
  process.stderr.write(
    'merge-coverage: no module coverage maps found — run tests with --coverage first\n'
  )
  process.exit(1)
}

// Fingerprint of a file-coverage entry's location tables — two maps that
// produced different location sets saw different versions of the source.
const shapeOf = (fc) => JSON.stringify([fc.statementMap, fc.branchMap, fc.fnMap])

const byFile = new Map()

for (const { name, mtime, data } of rawMaps) {
  for (const [file, fc] of Object.entries(data)) {
    const inner = fc.data || fc
    let list = byFile.get(file)

    if (!list) {
      list = []
      byFile.set(file, list)
    }

    list.push({ name, mtime, fc: inner })
  }
}

const merged = createCoverageMap()

for (const [file, entries] of byFile) {
  // Owner module = the module whose src root prefixes the file. Its raw map
  // carries this file's canonical instrumentation dialect.
  const owner = Object.values(MODULES).find(({ src }) =>
    src.some((d) => file.startsWith(`${path.join(ROOT, d)}${path.sep}`))
  )

  const ownerName = owner ? Object.keys(MODULES).find((k) => MODULES[k] === owner) : undefined

  const ownerEntries = ownerName ? entries.filter((e) => e.name === ownerName) : []

  const chosenShape =
    ownerEntries.length > 0
      ? shapeOf(ownerEntries.reduce((a, b) => (b.mtime > a.mtime ? b : a)).fc)
      : shapeOf(entries.reduce((a, b) => (b.mtime > a.mtime ? b : a)).fc)

  const current = entries.filter((e) => shapeOf(e.fc) === chosenShape)
  const union = createCoverageMap()

  for (const e of current) union.addFileCoverage(e.fc)

  merged.addFileCoverage(union.fileCoverageFor(file))
}

for (const [name, { root, src }] of emit) {
  const prefixes = src.map((d) => `${path.join(ROOT, d)}${path.sep}`)
  const filtered = createCoverageMap()

  for (const file of merged.files()) {
    // Skip entries for sources a stale run recorded but which no longer
    // exist — their phantom 0% lines are unfixable by definition.
    if (prefixes.some((p) => file.startsWith(p)) && fs.existsSync(file))
      filtered.addFileCoverage(merged.fileCoverageFor(file))
  }

  const outDir = coverageDir(root)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'coverage-final.json'), JSON.stringify(filtered.toJSON()))

  const context = libReport.createContext({ dir: outDir, coverageMap: filtered })
  for (const kind of ['json-summary', 'html']) reports.create(kind).execute(context)

  const totals = filtered.getCoverageSummary()
  process.stdout.write(
    `✓ ${name}: merged coverage → ${path.relative(ROOT, outDir)} ` +
      `(stmts ${totals.statements.pct}% | branches ${totals.branches.pct}% | ` +
      `funcs ${totals.functions.pct}% | lines ${totals.lines.pct}%)\n`
  )
}
