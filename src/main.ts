/**
 * @file main.js
 * @description Public-site entry point (modern ESM bundle).
 *
 * Boot order:
 *   1. Side-effect imports — service worker registration, global stylesheet,
 *      router, store, the <app-root> custom element definition, WASM CSS.
 *   2. Parallel warm-up — the locale's data snapshot and the likely route
 *      chunk start fetching before mount, so first paint isn't data-blocked.
 *   3. `start()` — Safari quirk loader (only on Safari/iOS), router init,
 *      idle-time route-chunk warming, then <app-root> insertion into #app.
 *
 * Every emitted tier is this same module source transpiled per-target; the
 * inlined browser loader picks the newest tier its feature probes pass
 * (ES2022 floor — engines below it get the fallback notice).
 */

import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { MOUSE_EVENTS, WINDOW_EVENTS } from '@core/tokens/events/dom.js'
import { APP_IDS } from '@core/tokens/ids/app.js'
import { ROUTE_PATHS } from '@core/tokens/routes/paths.js'
import { CHAR_STRINGS } from '@core/tokens/strings/chars.js'
import { QUERY_STRINGS } from '@core/tokens/strings/queries.js'
import { TYPE_STRINGS } from '@core/tokens/strings/types.js'
import { VENDOR_STRINGS } from '@core/tokens/strings/vendor.js'
import './registerServiceWorker.js'
import '@core/sass/components/shell/app.scss'
import router from '@core/router/router.js'
import '@core/store.js'
import './App.js'
import '@core/utils/wasm/wasm-css.js'
import { detectLangFromPath, LANG_SLUGS } from '@core/i18n.js'
import { warmBootstrap } from '@core/utils/data/db.js'
import { startRouteWarming } from '@core/utils/motion/route-warmer.js'
import { initGlobalErrorHandlers } from '@core/utils/notify.js'
import { runDebugActions } from '@core/debug/params.js'
import { READER_CLASSES } from '@core/tokens/classes/reader.js'
import { A11Y_CLASSES } from '@core/tokens/classes/a11y.js'

/**
 * Absolute bound for waiting on the first-paint signal — a suppressed
 * paint (hidden tab, paint-less engine) must never stall the boot.
 */
const FIRST_PAINT_BOOT_MS = 800

/**
 * Runs `cb` once the first contentful paint has committed — the veil's
 * inline LQIP is the LCP candidate, so work started after that paint
 * falls outside its pessimistic request graph. The veil covers the boot
 * either way, so the wait costs no perceived latency. Paint entries are
 * the exact signal; paint-less engines keep the former double-frame
 * timing, and the bounded timer covers suppressed paints.
 * @param cb work to start once the first paint has committed
 * @returns Promise settling once the deferred callback has run.
 */
const afterFirstPaint = (cb: () => unknown): Promise<unknown> =>
  new Promise((resolve, reject) => {
    let fired = false
    let observer: PerformanceObserver | undefined

    const run = () => {
      if (fired) return

      fired = true

      // Boot released — the paint observation's job is done whichever arm
      // fired first; disconnect so nothing lingers past the deferral.
      observer?.disconnect()

      try {
        resolve(cb())
      } catch (err) {
        reject(err)
      }
    }

    let observing = false

    if (typeof PerformanceObserver !== TYPE_STRINGS.UNDEFINED) {
      observer = new PerformanceObserver((list) => {
        if (list.getEntries().some((entry) => entry.name === 'first-contentful-paint')) {
          run()
        }
      })

      try {
        observer.observe({ type: 'paint', buffered: true })

        observing = true
      } catch {
        // 'paint' entry type unsupported — the frame/timer arms carry the boot.
      }
    }

    if (!observing) requestAnimationFrame(() => requestAnimationFrame(run))

    setTimeout(run, FIRST_PAINT_BOOT_MS)
  })

/**
 * Warms the critical path — the locale's data snapshot and the likely
 * route chunk — once the first frame has painted. Pathname parsing runs
 * at eval (a missing slug map must still reject the boot promise); only
 * the fetches defer — they are not needed until mount (~600ms+), so
 * firing them during parse just floods the LCP-critical request queue.
 * Two rAFs puts the work after frame one instead of racing it.
 * @param {string} locale - resolved locale slug for warmBootstrap
 * @param {string[]} segments - pathname segments minus the locale prefix
 * @param {string} aboutSlug - localized "about" route segment
 * @param {string} contactSlug - localized "contact" route segment
 */
const warmCriticalPath = (
  locale: string,
  segments: string[],
  aboutSlug: string,
  contactSlug: string
): Promise<unknown> | undefined => {
  warmBootstrap(locale)

  if (!segments.length || segments[0] === aboutSlug || segments[0] === contactSlug) {
    return import('@website/views/home/Home.js')
  }

  if (segments[0] === ROUTE_PATHS.PORTFOLIO_SEGMENT) {
    return import('@website/views/project/Project.js')
  }

  return undefined
}

/** Deferred warm chain — bootPromise awaits it so tests can't tear down mid-import. */
let warmReady: Promise<unknown> = Promise.resolve()

if (typeof window !== TYPE_STRINGS.UNDEFINED) {
  const locale = detectLangFromPath(window.location.pathname)

  const segments = window.location.pathname
    .split(CHAR_STRINGS.SLASH)
    .filter(Boolean)
    .filter((seg) => seg !== locale)

  const slugs = LANG_SLUGS[locale] || LANG_SLUGS.en
  const aboutSlug = slugs.about
  const contactSlug = slugs.contact

  warmReady = afterFirstPaint(() => warmCriticalPath(locale, segments, aboutSlug, contactSlug))
}

// Triple-probe Safari detection: vendor string is spoofable, so GestureEvent
// (WebKit-only) and missing container-type support (pre-16 iOS) are fallbacks.
const hasWindow = typeof window !== TYPE_STRINGS.UNDEFINED
const hasNavigator = typeof navigator !== TYPE_STRINGS.UNDEFINED
const vendorApple = hasNavigator && navigator.vendor === VENDOR_STRINGS.APPLE_VENDOR
const hasGesture = hasWindow && VENDOR_STRINGS.GESTURE_EVENT in window
const hasCss = typeof CSS !== TYPE_STRINGS.UNDEFINED
const noContainerType =
  hasCss && !CSS.supports(QUERY_STRINGS.CONTAINER_TYPE, QUERY_STRINGS.INLINE_SIZE)
const isSafari = hasWindow && (vendorApple || hasGesture || noContainerType)

/**
 * Inserts <app-root> into #app. Idempotent — safe to call on a timer while
 * the document finishes parsing. Prerendered pages ship a reader-content
 * <article> inside #app: it is hoisted to <body> (never deleted, parked
 * offscreen by the html.js stylesheet) before the swap so reader modes,
 * no-JS crawlers and AI agents keep the full document after the shell
 * mounts — Readability can't pierce the app's shadow DOM.
 * @returns {boolean} true when the root element exists in the DOM
 */
const mount = () => {
  const appContainer = document.getElementById(APP_IDS.APP)

  if (!appContainer) return false

  if (appContainer.querySelector(COMPONENT_TAGS.APP_ROOT)) return true

  const article = appContainer.querySelector(`article.${READER_CLASSES.CONTENT}`)

  // Hoist out of #app (never deleted): the parked-offscreen article
  // stays DOM-present for reader modes, no-JS crawlers and AI agents —
  // Readability can't pierce the app's shadow DOM.
  if (article) {
    document.body.appendChild(article)
  }

  appContainer.replaceChildren(document.createElement(COMPONENT_TAGS.APP_ROOT))

  // Light-DOM skip link — its static href targets the parked article
  // (#reader-content) so no-JS documents and crawlers get a real jump;
  // live, the anchor's own root can't see the shadow #main-content, so
  // activation is re-aimed here: preventDefault + focus() the routed
  // <main> through the app-root shadow boundary. Enter on a link
  // dispatches click, so keyboard + pointer share this path.
  document.addEventListener(MOUSE_EVENTS.CLICK, (e) => {
    const link = (e.target as Element | null)?.closest?.(`${HTML_TAGS.A}.${A11Y_CLASSES.SKIP_LINK}`)

    if (!link) return

    const main = appContainer
      .querySelector(COMPONENT_TAGS.APP_ROOT)
      ?.shadowRoot?.getElementById(APP_IDS.MAIN_CONTENT)

    if (!main) return

    e.preventDefault()

    main.focus()
  })

  return true
}

/**
 * Async boot sequence: loads Safari-specific workarounds only when needed,
 * starts the router, schedules idle route-chunk warming, and mounts the app
 * root (with a bounded retry loop for slow DOMContentLoaded edge cases).
 */
const start = async () => {
  if (typeof window === TYPE_STRINGS.UNDEFINED) return

  // Uncaught errors/rejections surface as toast (or native) notifications
  initGlobalErrorHandlers()

  // ?debug=… side-effect flags (toast test; webGLMode is read lazily by the
  // canvas choke point and needs no action here)
  runDebugActions()

  // Mount-path work waits for the first paint: router resolution pulls the
  // route's view chunk and the mounted app starts its own fetch/eval wave —
  // none of it is visible until the veil lifts anyway, and everything it
  // fetches after the veil's LQIP paints stays out of the LCP request graph.
  // Awaiting keeps bootPromise settled over the deferred wave, so a test's
  // teardown can never race a pending dynamic import inside it.
  await afterFirstPaint(async () => {
    if (isSafari) {
      await import('@core/safari/loader.js')
    }

    // Initialize client-side router
    window.router = router

    router.init()

    // After full load, warm the remaining route chunks during idle time so
    // subsequent navigations resolve from the module cache instantly.
    startRouteWarming()

    // Print hooks — pure listeners, but the module only matters on paper,
    // so it loads off the critical path with the rest of the deferrals.
    // Awaited: a floating dynamic import can outlive the test's registry.
    await import('@core/utils/print/print.js').then(({ initPrintSupport }) => initPrintSupport())

    // Mount custom element root
    if (typeof document !== TYPE_STRINGS.UNDEFINED) {
      if (!mount()) {
        document.addEventListener(WINDOW_EVENTS.DOM_CONTENT_LOADED, mount, { once: true })

        const retryTimer = setInterval(() => {
          if (mount()) {
            clearInterval(retryTimer)
          }
        }, 20)

        setTimeout(() => clearInterval(retryTimer), 3000)
      }
    }
  })
}

/**
 * Boot promise — resolves once the full start sequence (Safari lazy chunk,
 * router init, mount/retry arming) has run. Tests await this so async boot
 * work never continues past a test boundary into a torn-down registry.
 */
export const bootPromise = Promise.all([start(), warmReady]).then(() => {})
