#!/usr/bin/env node
/**
 * @file verify.mjs
 * @description Single quality gate shared by `prebuild` and the git
 * pre-commit hook. Runs every check the project enforces:
 *
 *   1. console-scan   forbidden console.* callsites (debug leftovers)
 *   2. typecheck      tsc --noEmit over all .ts/.tsx sources
 *   3. eslint         all module areas (style governance, token rules)
 *   4. stored gates   every submodule's recorded gate result +
 *                     coverage summary — modules gate themselves at
 *                     commit/push; a missing/stale stamp falls back to
 *                     running that module's suite with coverage
 *   5. coverage-gate  per-file 100% on statements/branches/functions/lines
 *                     in every module
 *   6. security-scan  Snyk (SNYK_TOKEN) / yarn audit fallback
 *                     writes experiments/docs/reports/snyk-report.json
 *
 * Every step writes machine-readable reports consumed by
 * shared/scripts/build/deploy-info.mjs → dist/deploy-info/ → CMS
 * "Build" tab. Exits non-zero if ANY step fails — callers must not
 * build/commit.
 *
 * Escape hatch for local iteration: VERIFY_ONLY=lint,test limits the run.
 *
 * Steps run CONCURRENTLY — they are independent read-only checks (none
 * mutates another's inputs), so serial execution only wasted wall time.
 * Output is buffered per step and printed whole on completion, so
 * interleaved children never corrupt each other's report sections.
 */

import { spawn } from 'node:child_process'

const STEPS = {
  format:
    'yarn prettier --check "**/*.{js,mjs,cjs,ts,tsx,scss,css,json,md,yml,yaml,html}" --ignore-unknown',
  'console-scan': 'node shared/scripts/verify/console-scan.mjs',
  typecheck: 'yarn tsc --noEmit',
  lint: 'yarn eslint shared core website cms experiments --max-warnings=0',
  stylelint: 'yarn stylelint "{shared,core,website,cms,experiments}/**/*.scss" --max-warnings=0',
  test: 'node shared/scripts/verify/scope-gates.mjs links',
  'coverage-gate': 'node shared/scripts/verify/coverage-gate.mjs',
  'security-scan': 'node shared/scripts/verify/security-scan.mjs',
}

const only = (process.env.VERIFY_ONLY || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const steps = Object.entries(STEPS).filter(([name]) => !only.length || only.includes(name))

const failures = []

/**
 * Runs one step with piped stdio — the child's full output is captured and
 * replayed under its banner once it exits, which keeps parallel children
 * from interleaving their report blocks mid-line.
 * @param {string} name step name (banner + failure list)
 * @param {string} cmd shell command to execute
 * @returns {Promise<void>} resolves after the child's output is flushed
 */
const runStep = (name, cmd) =>
  new Promise((resolve) => {
    // shell:true — commands carry quoted globs (prettier/stylelint) that
    // only a shell can expand.
    const child = spawn(cmd, {
      cwd: process.cwd(),
      env: { ...process.env, FORCE_COLOR: '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    })

    const chunks = []

    child.stdout.on('data', (c) => chunks.push(c))
    child.stderr.on('data', (c) => chunks.push(c))

    child.on('error', (err) => {
      chunks.push(Buffer.from(String(err)))
    })

    child.on('close', (code) => {
      process.stdout.write(`\n═══ verify: ${name} ═══\n`)

      for (const chunk of chunks) process.stdout.write(chunk)

      if (code === 0) {
        console.log(`✓ ${name}`)
      } else {
        failures.push(name)
        console.error(`✗ ${name} FAILED`)
      }

      resolve()
    })
  })

await Promise.all(steps.map(([name, cmd]) => runStep(name, cmd)))

if (failures.length) {
  console.error(`\n✗ verify FAILED: ${failures.join(', ')} — fix before building/committing`)
  process.exit(1)
}

console.log('\n✓ verify: all checks passed')
