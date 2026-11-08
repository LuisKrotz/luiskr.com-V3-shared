#!/usr/bin/env node
/**
 * Reports uncovered statements / branches / functions for a source file from
 * coverage/coverage-final.json. Coordinates are transformed-space; use the
 * --source-map decode when the JSX transformer emits maps.
 *
 * Reads every module's reports/coverage/coverage-final.json (per-module
 * reports — see shared/tests/jest.preset.mjs) and searches them all.
 *
 * Usage: node shared/scripts/verify/coverage-gaps.mjs <src-relative-path...>
 */

import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Repo root — the script lives at shared/scripts/verify/.
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

// The modules that emit per-module coverage reports (star-field and
// website-side experiment reports fold into their module's file).
const MODULES = [
  'shared',
  'core',
  'website',
  'cms',
  'experiments/earth-playground',
  'experiments/docs',
]

// Only modules that have actually run coverage contribute — a
// missing report just means that module hasn't been measured yet.
const covFiles = MODULES.map((m) => join(root, m, 'reports/coverage/coverage-final.json')).filter(
  existsSync
)

// Merge all maps — keys are absolute paths so modules can't collide.
const cov = Object.assign({}, ...covFiles.map((f) => JSON.parse(readFileSync(f, 'utf8'))))

for (const arg of process.argv.slice(2)) {
  // Resolve the arg to a coverage key — suffix-match against the
  // module source roots OR a bare-path match, so callers can pass
  // either 'Component.js' or 'utils/data/db.js'.
  const key = Object.keys(cov).find(
    (k) =>
      ['shared/src', 'core', 'website', 'cms', 'experiments', 'local-modules'].some((d) =>
        k.endsWith(`/${d}/${arg}`)
      ) || k.endsWith(`/${arg}`)
  )

  if (!key) {
    console.log(`## ${arg}: no coverage entry`)

    continue
  }

  const d = cov[key]

  // Output lines accumulate — the file header first, one line per
  // uncovered construct after.
  const out = [`## ${arg}`]

  // ── Uncovered statements ───────────────────────────────────────
  for (const [id, hits] of Object.entries(d.s)) {
    if (!hits) {
      const loc = d.statementMap[id]

      out.push(`  stmt L${loc.start.line}-${loc.end.line} c${loc.start.column}`)
    }
  }

  // ── Uncalled functions ─────────────────────────────────────────
  for (const [id, hits] of Object.entries(d.f)) {
    if (!hits) {
      const loc = d.fnMap[id].loc

      out.push(`  func L${loc.start.line}-${loc.end.line} c${loc.start.column}`)
    }
  }

  // ── Untaken branch arms ────────────────────────────────────────
  // d.b maps branch id → per-arm hit array; each 0 is an arm that
  // never ran. Prefer the arm's own location; fall back to the
  // branch's shared loc when the map only carries one.
  for (const [id, arms] of Object.entries(d.b)) {
    arms.forEach((hits, i) => {
      if (!hits) {
        const loc = d.branchMap[id].locations?.[i] || d.branchMap[id].loc

        out.push(
          `  br#${id} arm${i} ${d.branchMap[id].type} L${loc?.start?.line}-${loc?.end?.line} c${loc?.start?.column}`
        )
      }
    })
  }

  console.log(out.join('\n'))
}
