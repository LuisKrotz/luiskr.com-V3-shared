#!/usr/bin/env node
/**
 * @file scroll-fps.mjs — scroll frame-rate gate.
 *
 * Serves the production build (`vite preview`), then scrolls key routes
 * under iOS/Android mobile profiles (4x CPU throttling) and a desktop
 * profile while a rAF ticker records per-frame deltas. Every
 * route/profile pair must hold its floor — `FRAME_BUDGET.MOBILE_HZ`
 * (120fps) on mobile, `FRAME_BUDGET.DESKTOP_HZ` (240fps) on desktop —
 * and a p95 frame above one dropped frame fails the gate.
 *
 * Chrome resolution order: `$SCROLL_FPS_CHROME` →
 * `$PUPPETEER_EXECUTABLE_PATH` → the newest `~/.cache/puppeteer` install →
 * `which` fallbacks. `$LD_LIBRARY_PATH` is forwarded so locally unpacked
 * Chrome lib bundles keep working.
 *
 * Usage: `yarn test:fps` — requires a prior `yarn build` (preview serves
 * `dist/`). Tune via env: `FPS_MIN` (overrides every profile floor),
 * `FPS_PORT`, `FPS_ROUTES` (comma list).
 */

import { spawn, execFileSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import puppeteer from 'puppeteer-core'
import { FRAME_BUDGET } from '../../../core/tokens/motion/frame-budget.ts'

const PORT = Number(process.env.FPS_PORT || 4173)
const BASE = `http://localhost:${PORT}`
const FPS_MIN_OVERRIDE = Number(process.env.FPS_MIN || 0)
const ROUTES = (process.env.FPS_ROUTES || '/,/portfolio/melissa').split(',')
const MOBILE_VIEWPORT = {
  width: 390,
  height: 844,
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
}
const DESKTOP_VIEWPORT = {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
  isMobile: false,
  hasTouch: false,
}
const SCROLL_MS = 6000
const NAV_TIMEOUT_MS = 90000

// One dropped frame at the floor rate — a p95 beyond this means the
// route janks under its own budget, not just misses the average.
const droppedFrameMs = (hz) => 2000 / hz

const PROFILES = {
  ios: {
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    viewport: MOBILE_VIEWPORT,
    throttle: 4,
    minFps: FRAME_BUDGET.MOBILE_HZ,
  },
  android: {
    ua: 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Mobile Safari/537.36',
    viewport: MOBILE_VIEWPORT,
    throttle: 4,
    minFps: FRAME_BUDGET.MOBILE_HZ,
  },
  // Desktop runs unthrottled — the 240Hz floor already bounds the frame
  // to ~4.16ms, and throttling on top of it measures the emulator, not
  // the page.
  desktop: {
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
    viewport: DESKTOP_VIEWPORT,
    throttle: 1,
    minFps: FRAME_BUDGET.DESKTOP_HZ,
  },
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
    // Uncapped frame production — headless otherwise follows the host
    // display's vsync (~144-165Hz here) and the 240Hz desktop floor
    // could never be measured. Throttling still emulates slower CPUs.
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-frame-rate-limit',
      '--disable-gpu-vsync',
    ],
  })

  for (const [name, profile] of Object.entries(PROFILES)) {
    const minFps = FPS_MIN_OVERRIDE || profile.minFps
    const p95MaxMs = droppedFrameMs(minFps)

    for (const route of ROUTES) {
      const page = await browser.newPage()

      try {
        await page.setViewport(profile.viewport)
        await page.setUserAgent(profile.ua)

        const client = await page.createCDPSession()

        await client.send('Emulation.setCPUThrottlingRate', { rate: profile.throttle })
        await page.goto(`${BASE}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: NAV_TIMEOUT_MS,
        })
        await new Promise((resolve) => setTimeout(resolve, 8000))

        const metrics = summarize(await page.evaluate(collectScrollFrames, SCROLL_MS))
        const pass = metrics.fps >= minFps && metrics.p95 <= p95MaxMs
        console.log(
          `${pass ? 'PASS' : 'FAIL'} ${name} ${route} — fps=${metrics.fps} ` +
            `avg=${metrics.avg}ms p95=${metrics.p95}ms frames=${metrics.count}`
        )

        if (!pass)
          failures.push(`${name} ${route} (${metrics.fps}fps < ${minFps}, p95 ${metrics.p95}ms)`)
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
  console.error(
    `scroll-fps gate failed — below its profile floor (mobile ${FRAME_BUDGET.MOBILE_HZ}fps, desktop ${FRAME_BUDGET.DESKTOP_HZ}fps):`
  )

  for (const failure of failures) {
    console.error(`  - ${failure}`)
  }

  process.exit(1)
}
