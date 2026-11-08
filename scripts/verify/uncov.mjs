/**
 * @file uncov.mjs
 * @description Coverage-gap reporter: for each source file passed on
 * argv it prints the uncovered branch arms, statements, and functions
 * with the transformed-source line they map to — the quick "what's
 * left for 100%" tool the coverage tails are written against.
 *
 * Line numbers prefixed `T` refer to the TRANSFORMED source (oxc
 * JSX→h() output) because istanbul instruments that code, not the
 * authored JSX — offsets drift a few lines from the .jsx on disk.
 *
 * Usage: node scripts/verify/uncov.mjs <file-substring>…
 * (run from a module root that has coverage/coverage-final.json).
 */
import { transformSync } from 'rolldown/utils'
import fs from 'fs'

// The module's merged istanbul coverage map — keyed by absolute path.
const cov = JSON.parse(fs.readFileSync('coverage/coverage-final.json', 'utf8'))

// File filters from argv — each is suffix-matched against coverage keys.
const targets = process.argv.slice(2)

for (const t of targets) {
  // Suffix match lets callers pass 'Component.js' instead of the full path.
  const key = Object.keys(cov).find((k) => k.endsWith(t))

  if (!key) {
    console.log(`NO COVERAGE: ${t}`)
    continue
  }

  const f = cov[key]

  // Reproduce the build's JSX transform so line numbers land where
  // istanbul counted them (classic runtime, h/Fragment pragmas —
  // same as the bundler's jsx-in-js transform).
  const xsrc = transformSync('x.jsx', fs.readFileSync(key, 'utf8'), {
    lang: 'jsx',
    jsx: { runtime: 'classic', pragma: 'h', pragmaFrag: 'Fragment' },
  })

  const lines = xsrc.code.split('\n')

  console.log(`\n=== ${t} ===`)

  // ── Branch arms ────────────────────────────────────────────────
  // f.b maps branch id → hit counts per arm; branchMap gives loc+type.
  const missB = {}

  for (const [bid, hits] of Object.entries(f.b)) {
    const loc = f.branchMap[bid]

    // Each hit slot is one arm — a 0 means that arm never ran.
    hits.forEach((h, i) => {
      if (h === 0) {
        const l = loc.loc.start.line

        missB[l] = missB[l] || []

        missB[l].push(`${loc.type}[${i}]`)
      }
    })
  }

  // Print each uncovered arm with the transformed line it sits on.
  for (const l of Object.keys(missB).sort((a, b) => a - b)) {
    console.log(`B T${l} ${missB[l].join(',')}: ${(lines[l - 1] || '').trim().slice(0, 110)}`)
  }

  // ── Statements ─────────────────────────────────────────────────
  // f.s maps statement id → hits; dedupe the line numbers (several
  // statements can share a transformed line).
  const missS = [
    ...new Set(
      Object.keys(f.s)
        .filter((k) => f.s[k] === 0)
        .map((k) => f.statementMap[k].start.line)
    ),
  ].sort((a, b) => a - b)

  if (missS.length) console.log(`S uncovered: ${missS.map((l) => `T${l}`).join(' ')}`)

  // Show the first 15 uncovered lines as context — enough to target
  // the tail file without flooding the terminal.
  missS
    .slice(0, 15)
    .forEach((l) => console.log(`  T${l}: ${(lines[l - 1] || '').trim().slice(0, 100)}`))

  // ── Functions ──────────────────────────────────────────────────
  // f.f maps fn id → hits; fnMap gives the declaration site.
  const missF = Object.keys(f.f)
    .filter((k) => f.f[k] === 0)
    .map((k) => f.fnMap[k].decl.start.line)

  if (missF.length)
    missF.forEach((l) => console.log(`F T${l}: ${(lines[l - 1] || '').trim().slice(0, 100)}`))
}
