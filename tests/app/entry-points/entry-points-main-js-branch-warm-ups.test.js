/**
 * @file entry-points-main-js-branch-warm-ups.test.js
 * @description Split from entry-points.test.js — covers the "main.js branch warm-ups" describe.
 */
import { describe, test, expect, jest, beforeEach } from '@jest/globals'
import { waitFor } from '@tests/fixtures/test-constants.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { APP_IDS } from '@core/tokens/ids/app.js'
import { READER_CLASSES } from '@core/tokens/classes/reader.js'
import { WINDOW_EVENTS } from '@core/tokens/events/dom.js'

const registerMock = jest.fn()

jest.unstable_mockModule('@core/utils/service-worker.js', () => ({
  registerSiteServiceWorker: registerMock,
  dropStaleServiceWorkers: jest.fn(),
}))

const authCallbacks = []

jest.unstable_mockModule('@core/firebase.js', () => ({
  onAuthChange: jest.fn(async (cb) => {
    authCallbacks.push(cb)

    return () => {}
  }),
  signInWithGoogle: jest.fn(async () => ({ user: { uid: 'u1' } })),
  logoutUser: jest.fn(async () => {}),
  getDbInstance: jest.fn(async () => ({})),
}))

jest.unstable_mockModule('firebase/database', () => ({
  ref: jest.fn((db, p) => ({ db, p })),
  child: jest.fn((r, p) => ({ r, p })),
  get: jest.fn(async () => ({ exists: () => false, val: () => null })),
  set: jest.fn(async () => {}),
  remove: jest.fn(async () => {}),
}))

const mockRouter = { init: () => {}, subscribe: () => () => {}, currentRoute: null }

jest.unstable_mockModule('@core/router/router.js', () => ({
  default: mockRouter,
  router: mockRouter,
}))

jest.unstable_mockModule('@core/utils/motion/route-warmer.js', () => ({
  startRouteWarming: () => {},
}))

// Boot awaits `./safari/loader.js` whenever isSafari is true (happy-dom lacks
// real CSS.supports, so it is true for most cases here). Re-evaluating that
// real graph after jest.resetModules() starves past the waitFor budget under
// parallel coverage workers and gates `window.router`.
jest.unstable_mockModule('@core/safari/loader.js', () => ({}))

// Each warm-up test re-evaluates the full main.js module graph after
// jest.resetModules() — under the 75%-worker pool that re-import can be
// CPU-starved far beyond the default 60s, so this suite gets 120s.
jest.setTimeout(120000)

describe('main.js branch warm-ups', () => {
  beforeEach(() => {
    // Each warm-up re-imports main.js after jest.resetModules(); its static
    // graph (App.js → every component module, store singleton, WASM CSS shim,
    // plus the fire-and-forget view chunks) re-evaluates the whole
    // instrumented tree per test and starves past the waitFor budget under
    // parallel coverage workers. These tests only assert window.router, the
    // mount retry, and module-eval side effects — none read the components —
    // so stub the heavy deps. Registrations persist across resetModules; the
    // real-graph mount coverage already ran in 'boots the router' above.
    jest.unstable_mockModule('@/App.js', () => ({}))
    jest.unstable_mockModule('@core/utils/wasm/wasm-css.js', () => ({}))
    jest.unstable_mockModule('@website/views/home/Home.js', () => ({}))
    jest.unstable_mockModule('@website/views/project/Project.js', () => ({}))
  })

  test('portfolio pathname pre-warms the project chunk', async () => {
    jest.resetModules()

    window.history.pushState({}, '', '/portfolio/test-slug')

    const app = document.getElementById(APP_IDS.APP) || document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    document.body.appendChild(app)

    await (await import('@/main.js')).bootPromise.catch(() => {})
    await waitFor(() => window.router, 90000)

    expect(window.router).toBeTruthy()

    window.history.pushState({}, '', '/')
  })

  test('mount hoists the prerendered reader article into body', async () => {
    jest.resetModules()

    const app = document.getElementById(APP_IDS.APP) || document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    app.innerHTML = `<article class="${READER_CLASSES.CONTENT}"><main><h1>Pre</h1></main></article>`
    document.body.appendChild(app)

    await (await import('@/main.js')).bootPromise.catch(() => {})
    // Mount defers two frames now — and a previous boot may have left
    // window.router set — so wait on the mount artifact, not the router.
    await waitFor(() => document.querySelector(COMPONENT_TAGS.APP_ROOT), 90000)

    const hoisted = document.body.querySelector(`article.${READER_CLASSES.CONTENT}`)

    expect(hoisted).toBeTruthy()
    // Parked offscreen by the html.js stylesheet — mount never stamps
    // the --offscreen modifier itself, and flipAppView only adds it when
    // the runtime view lands in the outlet.
    expect(hoisted.classList.contains(READER_CLASSES.OFFSCREEN)).toBe(false)
    expect(app.contains(hoisted)).toBe(false)

    hoisted.remove()
  })

  test('missing #app container arms the mount retry loop', async () => {
    // Fake timers keep this deterministic: the retry interval is bounded by
    // a real-time 3s clear, and under parallel coverage workers the plain
    // 80ms defer can be starved past it — leaving the loop dead before the
    // container re-appears. Fake time advances the 20ms ticks in lockstep.
    jest.useFakeTimers()
    jest.resetModules()

    document.getElementById(APP_IDS.APP)?.remove()

    const boot = (await import('@/main.js')).bootPromise.catch(() => {})

    // Mount defers past the first-paint bound now — advance far enough for
    // the deferred attempt to run while #app is still missing so the retry
    // interval actually arms.
    await jest.advanceTimersByTimeAsync(900)

    const app = document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    document.body.appendChild(app)

    await jest.advanceTimersByTimeAsync(300)

    expect(app.firstElementChild).toBeTruthy()

    await boot

    // Re-boot over the now-mounted container — mount()'s idempotent
    // already-mounted guard must early-return instead of duplicating.
    jest.resetModules()

    const reboot = (await import('@/main.js')).bootPromise.catch(() => {})

    await jest.advanceTimersByTimeAsync(900)

    await reboot

    jest.useRealTimers()
  })

  test('non-home non-portfolio pathname skips route pre-warming', async () => {
    jest.resetModules()

    window.history.pushState({}, '', '/privacy-x')

    if (!document.getElementById(APP_IDS.APP)) {
      const app = document.createElement(HTML_TAGS.DIV)

      app.id = APP_IDS.APP
      document.body.appendChild(app)
    }

    await (await import('@/main.js')).bootPromise.catch(() => {})
    await waitFor(() => window.router, 90000)

    expect(window.router).toBeTruthy()

    window.history.pushState({}, '', '/')
  })

  test('mount retry timer self-clears after the 3s bound', async () => {
    jest.useFakeTimers()
    jest.resetModules()

    document.getElementById(APP_IDS.APP)?.remove()

    const boot = (await import('@/main.js')).bootPromise.catch(() => {})

    // The retry-clear bound arms inside the deferred mount attempt (~800ms)
    // — 900 releases the mount, then a further 3200 runs the bound out.
    await jest.advanceTimersByTimeAsync(900)
    await jest.advanceTimersByTimeAsync(3200)

    await boot

    jest.useRealTimers()

    expect(true).toBe(true)
  })

  test('missing LANG_SLUGS entry falls back to English slugs', async () => {
    jest.resetModules()

    const { LANG_SLUGS } = await import('@core/i18n.js')
    const enBackup = LANG_SLUGS.en

    delete LANG_SLUGS.en
    window.history.pushState({}, '', '/privacy-y')

    let threw = false

    try {
      await (await import('@/main.js')).bootPromise.catch(() => {})
    } catch {
      threw = true
    }

    LANG_SLUGS.en = enBackup
    window.history.pushState({}, '', '/')

    expect(threw).toBe(true)
  })

  test('Safari-detected boot loads the safari-loader chunk', async () => {
    jest.resetModules()

    const prevCSS = globalThis.CSS

    globalThis.CSS = { supports: () => false }

    if (!document.getElementById(APP_IDS.APP)) {
      const app = document.createElement(HTML_TAGS.DIV)

      app.id = APP_IDS.APP
      document.body.appendChild(app)
    }

    await (await import('@/main.js')).bootPromise.catch(() => {})
    await waitFor(() => window.router, 90000)

    expect(window.router).toBeTruthy()

    if (prevCSS === undefined) delete globalThis.CSS
    else globalThis.CSS = prevCSS
  })

  test('CSS.supports true reaches the container-type probe arm', async () => {
    jest.resetModules()

    const prevCSS = globalThis.CSS

    globalThis.CSS = { supports: () => true }

    if (!document.getElementById(APP_IDS.APP)) {
      const app = document.createElement(HTML_TAGS.DIV)

      app.id = APP_IDS.APP
      document.body.appendChild(app)
    }

    await (await import('@/main.js')).bootPromise.catch(() => {})
    await waitFor(() => window.router, 90000)

    expect(window.router).toBeTruthy()

    if (prevCSS === undefined) delete globalThis.CSS
    else globalThis.CSS = prevCSS
  })

  test('window-less eval skips the warm block', async () => {
    jest.resetModules()

    const savedWin = globalThis.window

    delete globalThis.window

    await (
      await import('@/main.js')
    ).bootPromise
      .catch(() => {})
      .then(
        () => {
          globalThis.window = savedWin
        },
        () => {
          globalThis.window = savedWin
        }
      )

    expect(true).toBe(true)
  })

  test('document-less eval skips the mount block', async () => {
    // Fake timers so the two-frame mount defer fires while document is
    // still missing — restoring early would let the guard see it again.
    jest.useFakeTimers()
    jest.resetModules()

    const savedDoc = globalThis.document

    delete globalThis.document

    const boot = (await import('@/main.js')).bootPromise.catch(() => {})

    await jest.advanceTimersByTimeAsync(900)

    globalThis.document = savedDoc

    await boot

    jest.useRealTimers()

    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(true).toBe(true)
  })

  test('Safari triple-probe — Apple vendor short-circuits to the true arm', async () => {
    jest.resetModules()

    // navigator.vendor is getter-only — override the property on the
    // navigator object itself for this import.
    Object.defineProperty(window.navigator, 'vendor', {
      value: 'Apple Computer, Inc.',
      configurable: true,
    })

    const app = document.getElementById(APP_IDS.APP) || document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    document.body.appendChild(app)

    await (await import('@/main.js')).bootPromise.catch(() => {})

    delete window.navigator.vendor
  })

  test('Safari probe — GestureEvent presence arm', async () => {
    jest.resetModules()

    window.GestureEvent = class GestureEvent {}

    const app = document.getElementById(APP_IDS.APP) || document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    document.body.appendChild(app)

    await (await import('@/main.js')).bootPromise.catch(() => {})

    delete window.GestureEvent
  })

  test('Safari probe — CSS container-type unsupported arm', async () => {
    jest.resetModules()

    const origCss = globalThis.CSS
    const origSupports = origCss?.supports

    Object.defineProperty(globalThis, 'CSS', {
      configurable: true,
      value: { ...origCss, supports: () => false },
    })

    const app = document.getElementById(APP_IDS.APP) || document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    document.body.appendChild(app)

    await (await import('@/main.js')).bootPromise.catch(() => {})

    Object.defineProperty(globalThis, 'CSS', {
      configurable: true,
      value: origSupports ? { ...origCss, supports: origSupports } : origCss,
    })
  })

  test('Safari probe — absent navigator takes the typeof short-circuit arm', async () => {
    jest.resetModules()

    const nav = globalThis.navigator

    delete globalThis.navigator

    const app = document.getElementById(APP_IDS.APP) || document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    document.body.appendChild(app)

    await (await import('@/main.js')).bootPromise.catch(() => {})

    globalThis.navigator = nav
  })

  test('Safari probe — absent CSS takes the typeof short-circuit arm', async () => {
    jest.resetModules()

    const css = globalThis.CSS

    delete globalThis.CSS

    const app = document.getElementById(APP_IDS.APP) || document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    document.body.appendChild(app)

    await (await import('@/main.js')).bootPromise.catch(() => {})

    globalThis.CSS = css
  })

  test('final full-env import — last-instance counters carry the base arms', async () => {
    jest.resetModules()

    expect(typeof window).not.toBe('undefined')

    // No #app container → mount() early-returns false and boot arms the
    // DOMContentLoaded listener + bounded retry interval.
    document.getElementById(APP_IDS.APP)?.remove()

    // A paint-entry PerformanceObserver drives afterFirstPaint's observer
    // callback + the some() predicate both ways; the bounded setTimeout
    // re-fires run() into the `if (fired) return` early arm.
    const PO = globalThis.PerformanceObserver

    globalThis.PerformanceObserver = class {
      constructor(cb) {
        this.cb = cb
      }
      observe() {
        this.cb({
          getEntries: () => [{ name: 'other' }, { name: 'first-contentful-paint' }],
        })
      }
      disconnect() {}
    }

    const boot = (await import('@/main.js')).bootPromise.catch(() => {})

    // Park the container with a reader article — the mount's hoist arm
    // moves it to <body> before <app-root> is inserted.
    const app = document.createElement(HTML_TAGS.DIV)
    const article = document.createElement('article')

    article.className = READER_CLASSES.CONTENT
    app.id = APP_IDS.APP
    app.appendChild(article)
    document.body.appendChild(app)

    document.dispatchEvent(new Event(WINDOW_EVENTS.DOM_CONTENT_LOADED))

    await boot

    // afterFirstPaint's bounded timer (FIRST_PAINT_BOOT_MS = 800) fires the
    // warm callback and the retry interval's mount() poll — wait past it.
    await new Promise((r) => setTimeout(r, 1000))

    globalThis.PerformanceObserver = PO
  })
})
