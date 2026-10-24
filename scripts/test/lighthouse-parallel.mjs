#!/usr/bin/env node
/**
 * @file lighthouse-parallel.mjs
 * @description Parallel replacement for `lhci autorun`'s collect phase.
 *
 * The configured matrix (lighthouserc.cjs collect.url × numberOfRuns) is
 * flattened into independent Lighthouse jobs and drained by a worker pool
 * instead of running serially — the 15-route × 3-run gate wall-times like
 * ~1/8 of the sequential run on a wide machine.
 *
 * Worker count is RAM/CPU-derived rather than "all cores": every job owns a
 * full Chrome instance (~0.5–1.5 GB) and shares the host's CPU, so uncapped
 * parallelism both OOMs the box AND inflates the observed main-thread times
 * Lantern simulates from. The cap leaves headroom so scores stay comparable
 * to the serial run. LK_LH_WORKERS overrides for other hosts.
 *
 * Each job writes the same plain `lhr-<ts>-<idx>.json` shape `lhci collect`
 * emits; `lhci assert` (invoked right after by build.mjs) reads them
 * unchanged — assertions stay declared only in lighthouserc.cjs.
 */

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const OUT_DIR = path.join(ROOT, '.lighthouseci')
const LH_BIN = path.join(ROOT, 'node_modules', 'lighthouse', 'cli', 'index.js')

const config = require(path.join(ROOT, 'lighthouserc.cjs'))
const collect = config.ci?.collect ?? {}

/** URL list + run count straight from lighthouserc.cjs — single source of truth. */
const urls = collect.url ?? []
const runsPerUrl = collect.numberOfRuns ?? 1

/** Chrome flags the preview cert needs, plus the flags collect itself declares. */
const chromeFlags = ['--headless', collect.settings?.chromeFlags].filter(Boolean).join(' ')

/**
 * Preview-server lifecycle: reuse a server already on :4173 (a dev session
 * may own it), otherwise spawn startServerCommand and wait for readiness.
 * @returns {Promise<{child: import('node:child_process').ChildProcess|null}>}
 */
const ensureServer = async () => {
  const probe = async () => {
    try {
      // NODE_TLS_REJECT_UNAUTHORIZED=0 is set on this process below — the
      // preview serves a self-signed localhost cert, same as lhci's
      // --ignore-certificate-errors chrome flag.
      const res = await fetch('https://localhost:4173/', { signal: AbortSignal.timeout(2000) })

      return res.ok
    } catch {
      return false
    }
  }

  if (await probe()) return { child: null }

  const [cmd, ...args] = (collect.startServerCommand ?? '').split(' ')

  if (!cmd) throw new Error('lighthouserc collect.startServerCommand missing')

  const child = spawn(cmd, args, { cwd: ROOT, stdio: 'ignore', shell: false })

  const deadline = Date.now() + 30_000

  while (Date.now() < deadline) {
    if (await probe()) return { child }

    await new Promise((r) => setTimeout(r, 250))
  }

  child.kill()

  throw new Error('preview server failed to become ready')
}

/**
 * One Lighthouse run as a subprocess — isolated Chrome per job, JSON
 * report straight into .lighthouseci/ in lhci's lhr-* naming.
 * @param {string} url route to measure
 * @param {string} outPath report destination
 * @returns {Promise<void>} resolves on exit 0
 */
const runJob = (url, outPath) =>
  new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        LH_BIN,
        url,
        '--quiet',
        '--output=json',
        `--output-path=${outPath}`,
        `--chrome-flags=${chromeFlags}`,
      ],
      { cwd: ROOT, stdio: 'ignore', shell: false }
    )

    child.on('error', reject)
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`lighthouse ${url} exited ${code}`))
    )
  })

/**
 * Parallel Chrome launches flake intermittently (NO_NAVSTART trace
 * failures, renderer OOM) — retry a couple times before surfacing so one
 * flake can't drop a URL's median sample.
 * @param {string} url route to measure
 * @param {string} outPath report destination
 * @param {number} attempts total attempts allowed
 * @returns {Promise<void>} resolves on the first successful attempt
 */
const runJobWithRetry = async (url, outPath, attempts = 3) => {
  for (let i = 1; i <= attempts; i++) {
    try {
      await runJob(url, outPath)

      return
    } catch (err) {
      if (i === attempts) throw err
    }
  }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const { child: server } = await ensureServer()

try {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  // Stale LHRs from previous runs would skew lhci's median math — clear
  // the report directory the same way `lhci collect` resets it.
  for (const f of fs.readdirSync(OUT_DIR))
    if (f.startsWith('lhr-')) fs.rmSync(path.join(OUT_DIR, f))

  const tasks = []

  for (const url of urls) for (let i = 0; i < runsPerUrl; i++) tasks.push(url)

  const workers = Math.max(
    2,
    Math.min(
      tasks.length,
      Math.floor(os.cpus().length / 2),
      Math.floor(os.freemem() / (2 * 1024 ** 3)),
      Number.parseInt(process.env.LK_LH_WORKERS ?? '', 10) || 8
    )
  )

  console.log(`lighthouse-parallel: ${tasks.length} runs over ${workers} workers`)

  let cursor = 0
  let stamp = Date.now()

  const t0 = Date.now()

  await Promise.all(
    Array.from({ length: workers }, async () => {
      while (cursor < tasks.length) {
        const url = tasks[cursor]

        cursor++

        const done = cursor
        const outPath = path.join(OUT_DIR, `lhr-${stamp++}.json`)

        await runJobWithRetry(url, outPath)
        console.log(`  ${done}/${tasks.length} ${url}`)
      }
    })
  )

  console.log(
    `lighthouse-parallel: ${tasks.length} runs in ${((Date.now() - t0) / 1000).toFixed(0)}s`
  )
} finally {
  server?.kill()
}
