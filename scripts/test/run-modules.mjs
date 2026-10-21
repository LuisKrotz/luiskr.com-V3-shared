#!/usr/bin/env node
/**
 * @file run-modules.mjs
 * @description Runs the Jest suite of every module workspace — shared,
 * core, website, cms, earth-playground, docs — each with its own
 * jest.config.mjs and its own reports/ output. Suites now run under a
 * bounded concurrency pool instead of strictly sequentially: each pool
 * slot gets an equal share of the machine's total jest-worker budget
 * (RAM-derived, matching jest.preset.mjs's workerBudget formula), so
 * parallel module runs keep the same aggregate footprint one sequential
 * full-size pool would use. Per-module isolation still means a CMS
 * change never re-runs the docs suite when modules are named.
 *
 * Usage:
 *   node shared/scripts/test/run-modules.mjs [--coverage] [module…]
 *
 * Env:
 *   TEST_MODULE_JOBS — override the module-run concurrency (default: the
 *   largest pool that still gives each suite ≥3 jest workers).
 */
import { execFileSync, spawn } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'

import { discoverModules, REPO_ROOT } from '../modules.mjs'

// Module list is discovered, not hardcoded — experiments/<name>/ dirs with
// a jest.config.mjs self-register (see shared/scripts/modules.mjs).
const MODULES = discoverModules().map(({ name, root }) => [name, `${root}/jest.config.mjs`])

const args = process.argv.slice(2)
const coverage = args.includes('--coverage')
const only = args.filter((a) => !a.startsWith('--'))
const selected = MODULES.filter(([name]) => !only.length || only.includes(name))

const JEST = [
  '--experimental-vm-modules',
  '--disable-warning=ExperimentalWarning',
  path.join(REPO_ROOT, 'node_modules/jest/bin/jest.js'),
]

/**
 * Total jest-worker budget this machine affords — identical formula to
 * shared/tests/jest.preset.mjs workerBudget(): ~2GiB per plain worker,
 * ~3GiB under istanbul instrumentation, capped by cores−1. Splitting the
 * SAME total across concurrent module runs keeps the aggregate heap
 * under the reclaim ceiling instead of multiplying it by the pool size.
 */
const perWorkerGb = coverage ? 3 : 2
const totalBudget = Math.max(
  2,
  Math.min(Math.floor(os.totalmem() / (perWorkerGb * 1024 ** 3)), os.cpus().length - 1)
)

/**
 * Module-run concurrency: the largest pool where every suite still gets
 * ≥3 workers (below that, per-worker spawn cost outweighs parallelism).
 * TEST_MODULE_JOBS overrides; 1 restores the old strictly-serial shape.
 */
const MODULE_JOBS = (() => {
  const override = Number.parseInt(process.env.TEST_MODULE_JOBS ?? '', 10)

  if (Number.isFinite(override) && override > 0) return override

  return Math.max(1, Math.min(selected.length, Math.floor(totalBudget / 3)))
})()

/** Jest workers granted to each concurrent suite. */
const workersEach = Math.max(2, Math.floor(totalBudget / MODULE_JOBS))

/**
 * Runs one module's jest suite with piped stdio — output is buffered and
 * replayed under the module banner on exit so concurrent suites never
 * interleave report lines.
 * @param {string} name module name (banner + failure list)
 * @param {string} config jest.config.mjs path relative to root
 * @returns {Promise<boolean>} resolves true when the suite passed
 */
const runModule = (name, config) =>
  new Promise((resolve) => {
    const child = spawn(
      'node',
      [...JEST, '--config', config, ...(coverage ? ['--coverage'] : [])],
      {
        cwd: REPO_ROOT,
        env: { ...process.env, JEST_MAX_WORKERS: String(workersEach) },
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: false,
      }
    )

    const chunks = []

    child.stdout.on('data', (c) => chunks.push(c))
    child.stderr.on('data', (c) => chunks.push(c))
    child.on('error', (err) => chunks.push(Buffer.from(String(err))))

    child.on('close', (code) => {
      process.stdout.write(`\n═══ jest: ${name} ═══\n`)

      for (const chunk of chunks) process.stdout.write(chunk)

      if (code !== 0) process.stderr.write(`✗ ${name} suite failed\n`)

      resolve(code === 0)
    })
  })

/**
 * Bounded worker-drain over the selected modules — each slot pulls the
 * next suite until the list is exhausted. Iterative drain, not recursion:
 * the tasks are a flat list, not a self-similar structure.
 */
let cursor = 0
const outcomes = []

await Promise.all(
  Array.from({ length: Math.min(MODULE_JOBS, selected.length) }, async () => {
    while (cursor < selected.length) {
      const [name, config] = selected[cursor]

      cursor++

      outcomes.push(await runModule(name, config))
    }
  })
)

let failed = outcomes.includes(false)

// Per-module runs instrument all authored source, so each raw map only
// reflects that module's suites. Union them and re-emit reports filtered
// per module — the merged reports are what coverage-gate enforces.
if (coverage) {
  try {
    execFileSync('node', ['shared/scripts/test/merge-coverage.mjs', ...only], {
      stdio: 'inherit',
      cwd: REPO_ROOT,
    })
  } catch {
    failed = true
    process.stderr.write('✗ coverage merge failed\n')
  }
}

process.exit(failed ? 1 : 0)
