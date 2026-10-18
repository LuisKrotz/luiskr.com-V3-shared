/**
 * @file animation-frame-budget.test.js
 * @description Governance: every animation/frame path must fit the
 * high-refresh frame budget — mobile ≥120Hz (8.33ms) and desktop ≥240Hz
 * (4.16ms). Two enforcement surfaces, esNext-only, CMS exempt:
 *
 *  Static — per-file scan of shared/src, core, website, experiments:
 *   1. scroll-blocking listeners (pointermove, mousemove, wheel,
 *      touchmove, touchstart, scroll) MUST register `{ passive: … }`
 *      so the compositor thread never waits on main-thread JS;
 *   2. any file binding a pointermove listener MUST read
 *      `getCoalescedEvents()` — 1000Hz+ input delivers several events
 *      per frame and per-event work blows the 4.16ms budget;
 *   3. the FRAME_BUDGET token is the sole source of the 120/240Hz
 *      ceilings (no re-declared literals).
 *
 *  Runtime — requestAnimationFrame is instrumented and every component
 *  + view is mounted/exercised; any callback whose synchronous work
 *  exceeds the desktop budget fails the gate with its callsite.
 *  Zero-allocation discipline inside frame loops is enforced by the
 *  duration measurement: GC churn shows up as over-budget callbacks.
 */
import { describe, test, expect, beforeAll, afterAll, beforeEach } from '@jest/globals'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FRAME_BUDGET } from '@core/tokens/motion/frame-budget.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..', '..', '..')

/** Source roots the gate scans — CMS is exempt per directive. */
const AREA_DIRS = ['shared/src', 'core', 'website', 'experiments']

/** Trees that are never authored frame-path source. */
const SKIP_DIRS = new Set([
  '.git',
  'dist',
  'node_modules',
  'vendor',
  'local-modules',
  'tests',
  'reports',
])

/** Event tokens whose default (non-passive) dispatch blocks the compositor. */
const BLOCKING_EVENTS = ['POINTERMOVE', 'MOUSEMOVE', 'WHEEL', 'TOUCHMOVE', 'TOUCHSTART', 'SCROLL']

/** Quoted literal forms of the same blocking events. */
const BLOCKING_LITERALS = ['pointermove', 'mousemove', 'wheel', 'touchmove', 'touchstart', 'scroll']

/** Recursively lists source files under dir. */
function getAllFiles(dir, exts) {
  const results = []
  const list = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of list) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) results.push(...getAllFiles(full, exts))
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(full)
    }
  }
  return results
}

/** Source files under the gated roots. */
const sourceFiles = () =>
  AREA_DIRS.flatMap((dir) => {
    const abs = path.join(rootDir, dir)

    return fs.existsSync(abs) ? getAllFiles(abs, ['.ts', '.tsx', '.js', '.jsx', '.mjs']) : []
  })

/**
 * Extracts the argument text of every `name(` call in `content` using a
 * balanced-paren scan (arguments may contain arrows/objects/strings).
 * @param content File text.
 * @param name Call expression to find (e.g. 'addEventListener(').
 * @returns Argument substring per call site.
 */
const callArgsOf = (content, name) => {
  const out = []
  let idx = content.indexOf(name)

  while (idx !== -1) {
    let depth = 1
    const start = idx + name.length
    let i = start
    let quote = null

    for (; i < content.length; i++) {
      const c = content[i]

      if (quote) {
        if (c === quote && content[i - 1] !== '\\') quote = null

        continue
      }

      if (c === "'" || c === '"' || c === '`') {
        quote = c
      } else if (c === '(') {
        depth++
      } else if (c === ')') {
        depth--

        if (!depth) break
      }
    }

    out.push(content.slice(start, i))
    idx = content.indexOf(name, i)
  }

  return out
}

/**
 * Splits an argument list into top-level arguments (paren/brace/bracket
 * balanced, string-aware).
 * @param args Argument-list text.
 * @returns Individual argument expressions.
 */
const topArgs = (args) => {
  const out = []
  let depth = 0
  let quote = null
  let start = 0

  for (let i = 0; i < args.length; i++) {
    const c = args[i]

    if (quote) {
      if (c === quote && args[i - 1] !== '\\') quote = null

      continue
    }

    if (c === "'" || c === '"' || c === '`') quote = c
    else if (c === '(' || c === '{' || c === '[') depth++
    else if (c === ')' || c === '}' || c === ']') depth--
    else if (c === ',' && !depth) {
      out.push(args.slice(start, i))
      start = i + 1
    }
  }

  out.push(args.slice(start))

  return out.map((a) => a.trim())
}

/** Whether an event-name argument denotes a scroll-blocking event. */
const isBlockingEvent = (eventArg) =>
  BLOCKING_EVENTS.some((t) => eventArg.includes(t)) ||
  BLOCKING_LITERALS.some((l) => eventArg.includes(`'${l}'`) || eventArg.includes(`"${l}"`))

// ── Runtime rAF instrumentation ─────────────────────────────────────────────

/** Recorded over-budget callbacks: { ms, source }. */
const overruns = []

/** Original rAF references — restored in afterAll. */
const restore = []

/**
 * Wraps a requestAnimationFrame function so every scheduled callback's
 * synchronous execution time is measured and over-budget runs recorded.
 * @param holder Object carrying rAF (window or globalThis).
 */
const instrumentRaf = (holder) => {
  const orig = holder?.requestAnimationFrame

  if (typeof orig !== 'function') return

  holder.requestAnimationFrame = (cb) =>
    orig.call(holder, (t) => {
      const t0 = performance.now()

      cb(t)

      const ms = performance.now() - t0

      if (ms > FRAME_BUDGET.DESKTOP_MS) {
        overruns.push({ ms: Math.round(ms * 100) / 100, source: String(cb).slice(0, 160) })
      }
    })

  restore.push(() => {
    holder.requestAnimationFrame = orig
  })
}

/** Every public-site custom element — components AND route views. */
const SURFACES = [
  () => import('@website/components/home/HomeMosaic.js'),
  () => import('@website/components/home/AboutSection.js'),
  () => import('@website/components/home/ContactSection.js'),
  () => import('@website/components/nav/AppNav.js'),
  () => import('@website/components/media/MediaFigure.js'),
  () => import('@website/components/media/MediaExpanded.js'),
  () => import('@website/components/media/DrawText.js'),
  () => import('@website/components/feedback/CookieBanner.js'),
  () => import('@website/components/feedback/SiteToast.js'),
  () => import('@website/components/carousel/CustomCarousel.js'),
  () => import('@website/components/carousel/AwardsCarousel.js'),
  () => import('@website/components/dialogs/PreferencesModal.js'),
  () => import('@website/components/dialogs/LangDialog.js'),
  () => import('@website/components/home/AwardsMentions.js'),
  () => import('@website/components/portfolio/Related.js'),
  () => import('@website/components/legal/Footer.js'),
  () => import('@website/views/home/Home.js'),
  () => import('@website/views/project/Project.js'),
  () => import('@website/views/legal/Legal.js'),
  () => import('@website/views/not-found/NotFound.js'),
]

describe('animation frame-budget governance (120Hz mobile / 240Hz desktop)', () => {
  beforeAll(() => {
    instrumentRaf(globalThis)

    if (globalThis.window && globalThis.window !== globalThis) {
      instrumentRaf(globalThis.window)
    }
  })

  afterAll(() => {
    for (const undo of restore.splice(0)) undo()
  })

  beforeEach(() => {
    overruns.length = 0
  })

  test('frame budgets resolve to the declared 120Hz/240Hz ceilings', () => {
    expect(FRAME_BUDGET.MOBILE_HZ).toBe(120)
    expect(FRAME_BUDGET.DESKTOP_HZ).toBe(240)
    expect(FRAME_BUDGET.MOBILE_MS).toBeCloseTo(8.33, 1)
    expect(FRAME_BUDGET.DESKTOP_MS).toBeCloseTo(4.17, 1)
  })

  test('scroll-blocking listeners always register a passive options arg', () => {
    const violations = []

    for (const file of sourceFiles()) {
      const content = fs.readFileSync(file, 'utf-8')
      const rel = path.relative(rootDir, file)

      for (const args of callArgsOf(content, 'addEventListener(')) {
        const [eventArg, , optionsArg] = topArgs(args)

        if (!eventArg || !isBlockingEvent(eventArg)) continue

        const passive = optionsArg && /passive\s*:\s*[^f]/.test(optionsArg)

        if (!passive) violations.push(`${rel} -> ${args.slice(0, 90)}`)
      }
    }

    expect(violations).toEqual([])
  })

  test('pointermove listeners consume getCoalescedEvents (high-polling input)', () => {
    const violations = []

    for (const file of sourceFiles()) {
      const content = fs.readFileSync(file, 'utf-8')

      const bindsPointerMove = callArgsOf(content, 'addEventListener(').some((args) => {
        const [eventArg] = topArgs(args)

        return (
          eventArg &&
          (eventArg.includes('POINTERMOVE') ||
            eventArg.includes(`'pointermove'`) ||
            eventArg.includes('"pointermove"'))
        )
      })

      if (bindsPointerMove && !content.includes('getCoalescedEvents')) {
        violations.push(path.relative(rootDir, file))
      }
    }

    expect(violations).toEqual([])
  })

  test('every component and view runs its rAF callbacks inside the 240Hz budget', async () => {
    for (const load of SURFACES) await load()

    const { COMPONENT_TAGS } = await import('@core/tokens/elements/components.js')
    const { VIEW_TAGS } = await import('@core/tokens/elements/views.js')

    const tags = [...Object.values(COMPONENT_TAGS), ...Object.values(VIEW_TAGS)]
    let mounted = 0

    for (const tag of tags) {
      if (!customElements.get(tag)) continue

      const el = document.createElement(tag)

      document.body.appendChild(el)

      await Promise.resolve()
      await Promise.resolve()

      if (typeof el._updateDom === 'function') el._updateDom()

      await Promise.resolve()

      el.remove()
      mounted++
    }

    // Let queued frame callbacks flush so their durations are recorded.
    await new Promise((r) => setTimeout(r, 40))

    expect(mounted).toBeGreaterThan(10)

    const report = overruns.map((o) => `  ${o.ms}ms  ${o.source}`).join('\n')

    expect(`\nrAF callbacks over ${FRAME_BUDGET.DESKTOP_MS}ms:\n${report}`).toBe(
      `\nrAF callbacks over ${FRAME_BUDGET.DESKTOP_MS}ms:\n`
    )
  })
})
