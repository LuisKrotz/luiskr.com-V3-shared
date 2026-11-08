/**
 * @file app/boot.ts
 * @description App shell bootstrap — preference init, data load, lazy dialog/HUD chunk imports, router subscription with progress bar, scroll/resize/theme listeners, and the intro loader.
 */

import { APP_CLASSES } from '@core/tokens/classes/app.js'
import { STATE_CLASSES } from '@core/tokens/classes/state.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { APP_EVENTS } from '@core/tokens/events/app.js'
import { FORM_EVENTS, WINDOW_EVENTS } from '@core/tokens/events/dom.js'
import { PREF_MUTATIONS } from '@core/tokens/events/mutations.js'
import { ROUTE_NAMES } from '@core/tokens/routes/names.js'
import { QUERY_STRINGS } from '@core/tokens/strings/queries.js'
import { TYPE_STRINGS } from '@core/tokens/strings/types.js'
import { THEME } from '@core/tokens/theme/theme.js'
import store from '@core/store.js'
import router from '@core/router/router.js'
import type { LangDialogEl, PrefModalEl, SearchModalEl } from './types.js'
import type { AppRoot } from '../App.js'
import { ANIMATION_DURATIONS } from '@core/tokens/motion/animation.js'
import { webglPool } from '@core/utils/canvas/webgl-pool.js'
import { onUserIntent } from '@core/utils/motion/intent.js'
import { syncCyrillicFont } from '@core/locale/cyrillic-font.js'
import { updateReaderContent } from '@core/locale/reader-content.js'
import { initMediaManifest } from '@core/utils/media/manifest.js'
import { applyAnimationDesc } from '@core/utils/a11y/animation-desc.js'
import { ANIMATION_IDS } from '@core/tokens/data/animation-ids.js'
import { IntroLoader } from '@core/utils/canvas/loaders/intro-loader.js'

/**
 * Schedules non-urgent work during idle time; falls back to a short
 * setTimeout on engines without requestIdleCallback. Evaluated per call
 * so the probe always reflects the live environment.
 */
export function deferIdle(cb: () => void): void {
  // requestIdleCallback exists only on the window (and only in some
  // engines); both conditions probe per call so hot-swapped test
  // environments resolve the right arm.
  if (typeof window !== TYPE_STRINGS.UNDEFINED && window.requestIdleCallback) {
    window.requestIdleCallback(cb)
  } else {
    // Fallback — 100 ms approximates an idle slice without starving
    // the work indefinitely on engines that lack the API.
    setTimeout(cb, 100)
  }
}

/**
 * Mounts app shell.
 * @param c — the component
 */
export function mountAppShell(c: AppRoot): void {
  // Restore persisted preferences before first paint of the chrome —
  // theme/reduced-motion/contrast must land before any child renders
  // or the shell flashes the default palette.
  store.commit(PREF_MUTATIONS.INIT_THEME)
  store.commit(PREF_MUTATIONS.INIT_REDUCED_MOTION)
  store.commit(PREF_MUTATIONS.INIT_HIGH_CONTRAST)

  // Pointer/touch detection + media context-menu guards (see input.ts).
  c.initInputListeners()

  // Warm the media-variant manifest at idle — it's ~430KB of bucket keys,
  // and pulling it during boot steals the simulated-4G pipe from the
  // LCP-critical requests on every route (including text pages that never
  // consult it). Until it lands, renders omit webp <source>s and serve
  // originals, which is always safe.
  deferIdle(() => void initMediaManifest())

  // Kick the locale fetch — the shell renders its fallback text until
  // the snapshot lands (SWR — stale-while-revalidate).
  c.loadData()

  // The ambient body::before glow (body-glow-drift) animates the
  // document itself — bound once at boot; the desc node lands in the
  // document root where every crawler reads it.
  applyAnimationDesc(document.body, ANIMATION_IDS.BODY_GLOW)

  // Dev grid overlay — restored from the stored flag before the
  // stylesheet's gate class is applied.
  if (store.getters.getShowGrid()) {
    document.documentElement.classList.add(STATE_CLASSES.SHOW_GRID)
  }

  // Wire the store subscription — language/modal/preference commits
  // now reach onStoreUpdate (see App.tsx).
  c.subscribe(store)

  // Cyrillic font surface — toggle Fira Sans on/off with the locale and
  // keep <html lang> truthful; subscribed so locale commits re-sync.
  syncCyrillicFont(store.getters.getLang())
  store.subscribe(() => syncCyrillicFont(store.getters.getLang()))

  // Lazy-load heavy global components on the first interaction signal —
  // they only render in answer to user actions, so warming at idle pays
  // their fetch+eval inside the interactive window for sessions that
  // never open a dialog at all.
  onUserIntent(() => {
    import('@website/components/dialogs/PreferencesModal.js')
    import('@website/components/dialogs/LangDialog.js')
    import('@website/components/feedback/StatsHud.js')
  })

  // Listen to open-preferences-modal from app-nav — the element's
  // chunk is lazy: import() ensures the custom element is DEFINED
  // before open lands on it (the upgrade must exist or `open` sets a
  // plain property on an unupgraded node).
  const openPref = () => {
    import('@website/components/dialogs/PreferencesModal.js').then(() => {
      const pref = c.$<PrefModalEl>(COMPONENT_TAGS.PREFERENCES_MODAL)

      if (pref) pref.open = true
    })
  }

  // Both targets: nav fires on itself (inside this shadow tree) and
  // window (events that escape the shadow boundary) — either arm can
  // be the one that carries the gesture.
  c.addScopedListener(c, APP_EVENTS.OPEN_PREFERENCES_MODAL, openPref)
  c.addScopedListener(window, APP_EVENTS.OPEN_PREFERENCES_MODAL, openPref)

  // Listen to open-lang-dialog from app-nav — same lazy-import-then-open
  // pattern as preferences.
  const openLang = () => {
    import('@website/components/dialogs/LangDialog.js').then(() => {
      const dialog = c.$<LangDialogEl>(COMPONENT_TAGS.LANG_DIALOG)

      if (dialog) dialog.open = true
    })
  }

  c.addScopedListener(c, APP_EVENTS.OPEN_LANG_DIALOG, openLang)
  c.addScopedListener(window, APP_EVENTS.OPEN_LANG_DIALOG, openLang)

  // Listen to open-search-modal from app-nav — same lazy pattern.
  const openSearch = () => {
    import('@website/components/dialogs/SearchModal.js').then(() => {
      const modal = c.$<SearchModalEl>(COMPONENT_TAGS.SEARCH_MODAL)

      if (modal) modal.open = true
    })
  }

  c.addScopedListener(c, APP_EVENTS.OPEN_SEARCH_MODAL, openSearch)
  c.addScopedListener(window, APP_EVENTS.OPEN_SEARCH_MODAL, openSearch)

  // `?q=` deep link — opens the search modal on routes that don't already
  // host a search surface. The /search view and the 404 both carry their
  // own <route-search> — there the query seeds those inputs instead of
  // doubling the surface with the modal.
  const bootRoute = router.currentRoute?.name

  // Deep link present + not a route hosting its own search surface →
  // open the modal so the query has somewhere to land.
  if (
    typeof window !== TYPE_STRINGS.UNDEFINED &&
    new URLSearchParams(window.location.search).get(QUERY_STRINGS.SEARCH_QUERY) &&
    bootRoute !== ROUTE_NAMES.SEARCH &&
    bootRoute !== ROUTE_NAMES.NOT_FOUND
  ) {
    openSearch()
  }

  // Subscribe to router — every navigation runs the progress-bar
  // choreography, swaps the outlet view, and re-fetches route data.
  router.subscribe((to, from) => {
    c.routeLoading = true

    const pBar = c.$(`.${APP_CLASSES.PROGRESS_BAR}`)

    if (pBar) {
      // A stale --done from the previous navigation would pin the bar at
      // scaleX(1)/opacity:0 — clear it so the crawl restarts visibly.
      pBar.classList.remove(APP_CLASSES.PROGRESS_BAR_DONE)
      pBar.classList.add(APP_CLASSES.PROGRESS_BAR_ACTIVE)
    }

    // Completion is scheduled BEFORE the view swap + data fan-out so a throw
    // downstream can never strand the bar mid-crawl (notify swallows listener
    // errors). The timeout re-queries the node because a re-render between
    // now and then may have replaced the captured element.
    setTimeout(() => {
      c.routeLoading = false
      const liveBar = c.$(`.${APP_CLASSES.PROGRESS_BAR}`)

      if (liveBar) {
        // Swap crawl for done: the bar completes to 100% and fades in
        // place instead of retracting to 0. The reset timeout removes
        // --done once the fade finished so the next navigation starts
        // clean (transform reset lands while opacity is still 0).
        liveBar.classList.remove(APP_CLASSES.PROGRESS_BAR_ACTIVE)
        liveBar.classList.add(APP_CLASSES.PROGRESS_BAR_DONE)

        setTimeout(() => {
          liveBar.classList.remove(APP_CLASSES.PROGRESS_BAR_DONE)
        }, ANIMATION_DURATIONS.PROGRESS_BAR_RESET)
      }
    }, ANIMATION_DURATIONS.ROUTE_DURATION)

    // Commit the new view tag + swap the outlet — re-render replaces
    // the <CurrentView> element with the incoming route's tag.
    c.currentViewTag = to.view

    c._updateViewContent(to, from)

    c.loadData()

    // Reader-mode content mirrors the route's prerendered page — keeps
    // the parked <article> truthful for reader mode + AI agents.
    updateReaderContent(window.location.pathname)

    // Programmatic/history navigation may not originate from a click. Retry
    // visible fallback widgets after the new view has mounted.
    webglPool.scheduleFallbackRetry()
  })

  // Initial view — no router event fires for the landing route (the
  // subscription starts after init), so the first view resolves here.
  if (router.currentRoute) {
    c.currentViewTag = router.currentRoute.view

    c._updateViewContent()
  }

  // Scroll listeners
  // Deferred via rIC so first paint isn't blocked by scroll bookkeeping;
  // setTimeout fallback for engines without the API.
  deferIdle(() => {
    c.updateSectionTops()
    c.checkScroll()
  })

  // Scroll events can fire many times per frame on high-refresh displays —
  // coalesce them through rAF so scrollHeight/layout reads run once per
  // rendered frame instead of once per event.
  c.addScopedListener(
    window,
    WINDOW_EVENTS.SCROLL,
    () => {
      // Burst coalescing: the first scroll event arms the rAF;
      // subsequent events in the same frame see _scrollRaf nonzero
      // and drop out — one layout read per painted frame, not per event.
      if (!c._scrollRaf) {
        c._scrollRaf = requestAnimationFrame(() => {
          // Clear first so a scroll inside the rAF can re-arm.
          c._scrollRaf = 0

          c.checkScroll()
        })
      }
    },
    { passive: true }
  )

  // Async content (images, locale data, late view mounts) grows the
  // document after first paint — without a re-measure the nav's
  // onBottom/activeSection stay stale and the --on-dark ink goes wrong
  // on first load. Observe the body box so any growth re-runs the check.
  if (typeof ResizeObserver !== TYPE_STRINGS.UNDEFINED) {
    // Document growth re-measures — image loads and locale fan-outs
    // push #contact further down after the initial measure.
    c._docObserver = new ResizeObserver(() => {
      c.updateSectionTops()

      c.checkScroll()
    })

    c._docObserver.observe(document.body)
  }

  // Window resize is debounced — resize storms fire per drag pixel;
  // 150 ms waits for the gesture to settle before paying for the
  // section re-measure + scroll check.
  let resizeTimer: ReturnType<typeof setTimeout> | undefined

  c.addScopedListener(
    window,
    WINDOW_EVENTS.RESIZE,
    () => {
      clearTimeout(resizeTimer)

      resizeTimer = setTimeout(() => {
        c.updateSectionTops()
        c.checkScroll()
      }, 150)
    },
    { passive: true }
  )

  if (window.matchMedia) {
    // OS dark-scheme flips re-apply only under THEME.SYSTEM — an
    // explicit user choice (light/dark) must not be overridden by
    // the OS changing underneath it.
    c.addScopedListener(
      window.matchMedia(QUERY_STRINGS.DARK_SCHEME_QUERY),
      FORM_EVENTS.CHANGE,
      () => {
        if (store.getters.getTheme() === THEME.SYSTEM) {
          store.commit(PREF_MUTATIONS.APPLY_THEME)
        }
      }
    )
  }

  // Static import: the intro-loader chunk's dynamic fetch used to sit
  // between mount and veil removal — the veil could only lift once that
  // extra hop landed, stretching Speed Index under throttle. The ~1.4KB
  // module rides the entry graph instead, so adoption is synchronous.
  c._introLoader = new IntroLoader(document.body)
}
