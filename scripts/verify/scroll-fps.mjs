#!/usr/bin/env node
/**
 * @file scroll-fps.mjs — mobile scroll frame-rate gate.
 *
 * Serves the production build (`vite preview`), then scrolls key routes
 * under iOS and Android device profiles with 4x CPU throttling while a
 * rAF ticker records per-frame deltas. Every route/profile pair must hold
 * `FPS_MIN` (default 60 fps — the user's stated floor); a lower average or
 * a p95 frame above one dropped frame (33.3ms) fails the gate.
 *
 * Chrome resolution order: `$SCROLL_FPS_CHROME` →
 * `$PUPPETEER_EXECUTABLE_PATH` → the newest `~/.cache/puppeteer` install →
 * `which` fallbacks. `$LD_LIBRARY_PATH` is forwarded so locally unpacked
 * Chrome lib bundles keep working.
 *
 * Usage: `yarn test:fps` — requires a prior `yarn build` (preview serves
 * `dist/`). Tune via env: `FPS_MIN`, `FPS_PORT`, `FPS_ROUTES` (comma list).
 */

import { spawn, execFileSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import puppeteer from 'puppeteer-core'

const PORT = Number(process.env.FPS_PORT || 4173)
const BASE = `http://localhost:${PORT}`
const FPS_MIN = Number(process.env.FPS_MIN || 60)
const P95_MAX_MS = 33.3
const ROUTES = (process.env.FPS_ROUTES || '/,/portfolio/melissa').split(',')
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true }
const CPU_THROTTLE = 4
const SCROLL_MS = 6000
const NAV_TIMEOUT_MS = 90000

const PROFILES = {
  ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  android:
    'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Mobile Safari/537.36',
}

/**
 * Locates a Chrome/Chromium binary for puppeteer-core (which ships no
 * browser). Prefers explicit env vars, then the puppeteer cache, then
 * well-known system installs.
 * @returns {string} absolute path to an executable Chrome binary
 */
function resolveChrome() {
  const env = process.env.SCROLL_FPS_CHROME || process.env.PUPPETEER_EXECUTABLE_PATH

  if (env && existsSync(env)) return env

  const cacheDir = join(homedir(), '.cache', 'puppeteer', 'chrome')

  if (existsSync(cacheDir)) {
    const builds = readdirSync(cacheDir).sort().reverse()

    for (const build of builds) {
      const candidate = join(cacheDir, build, 'chrome-linux64', 'chrome')

      if (existsSync(candidate)) return candidate
    }
  }

  for (const bin of ['google-chrome', 'chromium', 'chromium-browser']) {
    try {
      return execFileSync('which', [bin], { encoding: 'utf-8' }).trim()
    } catch {
      // not installed under this name — try the next
    }
  }

  throw new Error('scroll-fps: no Chrome binary found — set SCROLL_FPS_CHROME')
}

/**
 * Starts `vite preview` for the built dist and waits until it answers.
 * @returns {import('node:child_process').ChildProcess} the server process
 */
async function startServer() {
  const server = spawn('yarn', ['vite', 'preview', '--port', String(PORT)], {
    stdio: ['ignore', 'pipe', 'inherit'],
  })

  const deadline = Date.now() + 30000

  while (Date.now() < deadline) {
    try {
      const res = await fetch(BASE, { method: 'HEAD' })

      if (res.ok || res.status === 404) return server
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  server.kill('SIGKILL')

  throw new Error('scroll-fps: vite preview did not start within 30s')
}

/**
 * Scrolls `document.scrollingElement` to the bottom over `SCROLL_MS` inside
 * the page while a rAF ticker records every inter-frame delta. Returns
 * the collected deltas (ms) for the harness to reduce.
 * @param {number} scrollMs — scroll duration, passed in because evaluate
 *   serializes this function into the page (module scope is invisible)
 * @returns {Promise<number[]>} per-frame deltas in milliseconds
 */
function collectScrollFrames(scrollMs) {
  const frames = []

  let last = 0

  const tick = (t) => {
    if (last) frames.push(t - last)
    last = t
    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)

  const t0 = performance.now()
  const doc = document.scrollingElement || document.documentElement
  const target = doc.scrollHeight - innerHeight

  const step = () => {
    const p = (performance.now() - t0) / scrollMs

    doc.scrollTop = Math.min(target, target * p)

    if (p < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)

  return new Promise((resolve) => setTimeout(() => resolve(frames), scrollMs + 1000))
}

/**
 * Reduces raw frame deltas into the gate metrics.
 * @param {number[]} deltas — per-frame milliseconds
 * @returns {{ fps: number, avg: number, p95: number, count: number }}
 */
function summarize(deltas) {
  const valid = deltas.filter((d) => d > 0 && d < 2000).sort((a, b) => a - b)

  if (!valid.length) return { fps: 0, avg: 0, p95: 0, count: 0 }

  const avg = valid.reduce((a, b) => a + b, 0) / valid.length

  return {
    fps: +(1000 / avg).toFixed(1),
    avg: +avg.toFixed(1),
    p95: +valid[Math.floor(valid.length * 0.95)].toFixed(1),
    count: valid.length,
  }
}

let server = null
let browser = null

const failures = []

try {
  const chromePath = resolveChrome()

  server = await startServer()
  browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    env: { ...process.env, LD_LIBRARY_PATH: process.env.LD_LIBRARY_PATH || '' },
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })

  for (const [name, ua] of Object.entries(PROFILES)) {
    for (const route of ROUTES) {
      const page = await browser.newPage()

      try {
        await page.setViewport(VIEWPORT)
        await page.setUserAgent(ua)

        const client = await page.createCDPSession()

        await client.send('Emulation.setCPUThrottlingRate', { rate: CPU_THROTTLE })
        await page.goto(`${BASE}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: NAV_TIMEOUT_MS,
        })
        await new Promise((resolve) => setTimeout(resolve, 8000))

        const metrics = summarize(await page.evaluate(collectScrollFrames, SCROLL_MS))
        const pass = metrics.fps >= FPS_MIN && metrics.p95 <= P95_MAX_MS
        console.log(
          `${pass ? 'PASS' : 'FAIL'} ${name} ${route} — fps=${metrics.fps} ` +
            `avg=${metrics.avg}ms p95=${metrics.p95}ms frames=${metrics.count}`
        )

        if (!pass) failures.push(`${name} ${route} (${metrics.fps}fps, p95 ${metrics.p95}ms)`)
      } finally {
        await page.close()
      }
    }
  }
} finally {
  if (browser) {
    await browser.close()

    browser.process()?.kill('SIGKILL')
  }

  server?.kill('SIGKILL')
}

if (failures.length) {
  console.error(`scroll-fps gate failed — below ${FPS_MIN}fps or p95>${P95_MAX_MS}ms:`)

  for (const failure of failures) {
    console.error(`  - ${failure}`)
  }

  process.exit(1)
}
