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
// Maps are merged PER FILE with a freshness check: istanbul unions by
// statement/branch location, so a stale run that predates a source edit
// would inject phantom uncovered locations from the old file shape. When
// the maps disagree on a file's statement/branch/fn locations only the
// freshest run's entry is valid; identical shapes merge normally.
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

for (const { mtime, data } of rawMaps) {
  for (const [file, fc] of Object.entries(data)) {
    const inner = fc.data || fc
    let list = byFile.get(file)

    if (!list) {
      list = []
      byFile.set(file, list)
    }

    list.push({ mtime, fc: inner })
  }
}

const merged = createCoverageMap()

for (const [file, entries] of byFile) {
  const newest = entries.reduce((a, b) => (b.mtime > a.mtime ? b : a))
  const newestShape = shapeOf(newest.fc)

  if (entries.every((e) => shapeOf(e.fc) === newestShape)) {
    const union = createCoverageMap()

    for (const e of entries) union.addFileCoverage(e.fc)

    merged.addFileCoverage(union.fileCoverageFor(file))
  } else {
    merged.addFileCoverage(newest.fc)
  }
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
