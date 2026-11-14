/**
 * @file app-shell-coverage-approot-tails.test.js
 * @description Split from app-shell-coverage.test.js — first half of the
 * "AppRoot tails" describe. The describe is split across this file and
 * app-shell-coverage-approot-tails-2.test.js because every mounted
 * <app-root> boots the full shell+view (~250MB of retained test-env
 * heap per mount under happy-dom) — one file's mounts would exceed the
 * default 4GB worker heap in the pooled module run.
 */
import { describe, test, expect, jest, beforeEach, afterEach, afterAll } from '@jest/globals'
import { AppRoot } from '@/App.js'
import store from '@core/store.js'
import router from '@core/router/router.js'
import { mount, TEST_TEXT } from '@tests/fixtures/test-constants.js'
import { VIEW_TAGS } from '@core/tokens/elements/views.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { MODAL_MUTATIONS, PREF_MUTATIONS, UI_MUTATIONS } from '@core/tokens/events/mutations.js'
import { MODAL_CLASSES } from '@core/tokens/classes/modal.js'
import { APP_IDS } from '@core/tokens/ids/app.js'
import {
  DRAG_EVENTS,
  FORM_EVENTS,
  KEYBOARD_EVENTS,
  MOUSE_EVENTS,
  POINTER_EVENTS,
  TOUCH_EVENTS,
  WINDOW_EVENTS,
} from '@core/tokens/events/dom.js'
import { INPUT_STRINGS } from '@core/tokens/strings/input.js'
import { QUERY_STRINGS } from '@core/tokens/strings/queries.js'
import { ANIMATION_DURATIONS } from '@core/tokens/motion/animation.js'
import { ATTR_VALUES } from '@core/tokens/attrs/values.js'
import { APP_CLASSES } from '@core/tokens/classes/app.js'
import { STATE_CLASSES } from '@core/tokens/classes/state.js'
import { APP_EVENTS } from '@core/tokens/events/app.js'
import { DATA_ATTRS } from '@core/tokens/attrs/data.js'

import { ROUTE_NAMES } from '@core/constants.js'
import { THEME } from '@core/tokens/theme/theme.js'

/** Timer flush — yields one macrotask so mounted element callbacks run. */
const flush = (ms = 0) => new Promise((r) => setTimeout(r, ms))

/** Mount cleanups registered per test — each returns the DOM to empty. */
let cleanups = []

beforeEach(() => {
  // Mounts read router.currentRoute.view — keep a complete descriptor.
  router.currentRoute = { name: ROUTE_NAMES.HOME, view: VIEW_TAGS.VIEW_HOME, meta: {} }
})

afterEach(() => {
  cleanups.forEach((c) => c())
  cleanups = []
})

afterAll(async () => {
  // Drain armed onUserIntent registrations — every booted shell holds a
  // 20s fallback timer whose lazy import()s must resolve while the jest
  // environment is still alive.
  window.dispatchEvent(new Event(KEYBOARD_EVENTS.KEYDOWN))
  await flush(300)
})

/**
 * Replaces global fetch with a resolved-null stub so route/data calls
 * inside component mounts never hit the network; returns the original
 * for restoration.
 */
const stableFetch = () => {
  const orig = globalThis.fetch

  globalThis.fetch = jest.fn(async () => ({ ok: true, json: async () => null }))

  return orig
}

/** Locale slug guaranteed absent from LANG_SLUGS — exercises miss paths. */
const _BAD_LOCALE = 'xx'

/** Mounts a fresh <app-nav> element and registers its cleanup. */
const _mountNav = () => {
  const el = document.createElement(COMPONENT_TAGS.APP_NAV)

  cleanups.push(mount(el))

  return el
}

/** Dispatches a real window-level keydown for a key name. */
const _keydown = (key) =>
  window.dispatchEvent(new window.KeyboardEvent(KEYBOARD_EVENTS.KEYDOWN, { key }))

// ─── AppRoot tails ──────────────────────────────────────────────────────────
describe('AppRoot tails', () => {
  const mountApp = async () => {
    const origFetch = stableFetch()
    const el = new AppRoot()
    cleanups.push(mount(el))

    await flush(80)

    return { el, origFetch }
  }

  test('locale getter, showGrid boot, routeLoading render and outlet-less update', async () => {
    const { el, origFetch } = await mountApp()

    expect(el.locale).toBe(store.getters.getLang())

    el.routeLoading = true
    el._updateDom()

    const pBar = el.shadowRoot.querySelector(`.${APP_CLASSES.PROGRESS_BAR}`)
    expect(pBar.classList.contains(APP_CLASSES.PROGRESS_BAR_ACTIVE)).toBe(true)

    const bare = new AppRoot()
    bare.currentViewTag = VIEW_TAGS.VIEW_HOME
    expect(() => bare._updateViewContent(router.currentRoute)).not.toThrow()

    store.commit(PREF_MUTATIONS.TOGGLE_SHOW_GRID)

    const el2 = new AppRoot()
    cleanups.push(mount(el2))
    await flush(30)

    expect(document.documentElement.classList.contains(STATE_CLASSES.SHOW_GRID)).toBe(true)

    store.commit(PREF_MUTATIONS.TOGGLE_SHOW_GRID)

    globalThis.fetch = origFetch
  })

  test('open-pref and open-lang events resolve their dialogs', async () => {
    const { el, origFetch } = await mountApp()

    el.dispatchEvent(new Event(APP_EVENTS.OPEN_PREFERENCES_MODAL))
    el.dispatchEvent(new Event(APP_EVENTS.OPEN_LANG_DIALOG))

    await flush(60)

    const pref = el.shadowRoot.querySelector(COMPONENT_TAGS.PREFERENCES_MODAL)
    const dialog = el.shadowRoot.querySelector(COMPONENT_TAGS.LANG_DIALOG)

    expect(pref.open).toBe(true)
    expect(dialog.open).toBe(true)

    pref.remove()
    dialog.remove()

    el.dispatchEvent(new Event(APP_EVENTS.OPEN_PREFERENCES_MODAL))
    el.dispatchEvent(new Event(APP_EVENTS.OPEN_LANG_DIALOG))

    await flush(60)

    globalThis.fetch = origFetch
  })

  test('router notify drives the progress bar add/remove and missing-bar arms', async () => {
    const { el, origFetch } = await mountApp()

    router.notify(
      { name: ROUTE_NAMES.TERMS, view: VIEW_TAGS.VIEW_LEGAL, meta: {} },
      router.currentRoute
    )
    expect(el.routeLoading).toBe(true)

    const pBar = el.shadowRoot.querySelector(`.${APP_CLASSES.PROGRESS_BAR}`)
    expect(pBar.classList.contains(APP_CLASSES.PROGRESS_BAR_ACTIVE)).toBe(true)

    pBar.remove()
    router.notify(
      { name: ROUTE_NAMES.HOME, view: VIEW_TAGS.VIEW_HOME, meta: {} },
      router.currentRoute
    )

    await flush(ANIMATION_DURATIONS.ROUTE_DURATION + ANIMATION_DURATIONS.PROGRESS_BAR_RESET + 80)
    expect(el.routeLoading).toBe(false)

    globalThis.fetch = origFetch
  })

  test('idle callback, scroll, resize and matchMedia change arms', async () => {
    const origFetch = stableFetch()

    let changeHandler = null
    const origMM = window.matchMedia
    const origRIC = window.requestIdleCallback

    window.matchMedia = jest.fn((query) => ({
      matches: false,
      media: query,
      addEventListener: (ev, cb) => {
        // Other surfaces bind their own matchMedia('change') listeners during
        // mount (cardstack's print adapter is one) — only the OS dark-scheme
        // query's handler belongs to this test.
        if (ev === FORM_EVENTS.CHANGE && query === QUERY_STRINGS.DARK_SCHEME_QUERY)
          changeHandler = cb
      },
      removeEventListener: jest.fn(),
    }))
    window.requestIdleCallback = (cb) => setTimeout(cb, 0)

    const el = new AppRoot()
    cleanups.push(mount(el))
    await flush(40)

    store.commit(PREF_MUTATIONS.SET_THEME, THEME.SYSTEM)
    changeHandler()

    store.commit(PREF_MUTATIONS.SET_THEME, THEME.DARK)
    changeHandler()

    store.commit(PREF_MUTATIONS.SET_THEME, THEME.SYSTEM)

    window.dispatchEvent(new Event(WINDOW_EVENTS.SCROLL))
    window.dispatchEvent(new Event(WINDOW_EVENTS.SCROLL)) // coalesced: the pending rAF arm skips it
    window.dispatchEvent(new Event(WINDOW_EVENTS.RESIZE))

    await flush(200)

    window.matchMedia = origMM
    if (origRIC === undefined) delete window.requestIdleCallback
    else window.requestIdleCallback = origRIC

    globalThis.fetch = origFetch
  })

  test('matchMedia-less mount and document-less modal state take guarded arms', async () => {
    const origFetch = stableFetch()
    const origMM = window.matchMedia
    const origDoc = globalThis.document

    try {
      Object.defineProperty(window, 'matchMedia', {
        value: undefined,
        configurable: true,
        writable: true,
      })

      const el = new AppRoot()
      cleanups.push(mount(el))
      await flush(40)

      delete globalThis.document
      el._updateModalState()
    } finally {
      globalThis.document = origDoc
      window.matchMedia = origMM
    }

    globalThis.fetch = origFetch
  })

  test('disconnect cancels a pending coalesced scroll rAF', async () => {
    const { el, origFetch } = await mountApp()

    window.dispatchEvent(new Event(WINDOW_EVENTS.SCROLL))

    expect(el._scrollRaf).not.toBe(0)

    el.remove()

    expect(el._scrollRaf).toBe(0)

    globalThis.fetch = origFetch
  })

  test('modal open/close fallback arms: missing class, transform, main and auto top', async () => {
    const { el, origFetch } = await mountApp()
    const mainEl = el.shadowRoot.querySelector(`#${APP_IDS.MAIN_CONTENT}`)

    store.commit(MODAL_MUTATIONS.SET_MODAL, { open: true })
    el._updateModalState()
    expect(document.documentElement.classList.contains(MODAL_CLASSES.MODAL_OPEN)).toBe(true)

    mainEl.style.top = ATTR_VALUES.AUTO

    store.commit(MODAL_MUTATIONS.SET_MODAL, { open: false })
    el._updateModalState()

    mainEl.remove()

    store.commit(MODAL_MUTATIONS.SET_MODAL, { open: true, transform: 50 })
    el._updateModalState()

    store.commit(MODAL_MUTATIONS.SET_MODAL, { open: false })
    el._updateModalState()

    el.shadowRoot.querySelector(`[${DATA_ATTRS.DATA_APP_WRAPPER}]`).remove()
    el._updateModalState()

    globalThis.fetch = origFetch
  })

  test('input listeners cover pen, unknown, already-set and non-PointerEvent arms', async () => {
    const origFetch = stableFetch()
    const origPE = window.PointerEvent

    const el = new AppRoot()
    cleanups.push(mount(el))
    await flush(30)

    const pointer = (type) => {
      const e = new Event(POINTER_EVENTS.POINTERDOWN)
      Object.defineProperty(e, 'pointerType', { value: type })
      window.dispatchEvent(e)
    }

    pointer(INPUT_STRINGS.PEN)
    pointer(TEST_TEXT.UNKNOWN)

    store.commit(UI_MUTATIONS.SET_INPUT_METHOD, INPUT_STRINGS.TOUCH)
    pointer(INPUT_STRINGS.TOUCH)
    pointer(INPUT_STRINGS.MOUSE)
    pointer(INPUT_STRINGS.MOUSE)

    window.dispatchEvent(new Event(MOUSE_EVENTS.CONTEXTMENU))
    window.dispatchEvent(new Event(DRAG_EVENTS.DRAGSTART))

    delete window.PointerEvent

    const el2 = new AppRoot()
    cleanups.push(mount(el2))
    await flush(30)

    window.dispatchEvent(new Event(TOUCH_EVENTS.TOUCHSTART))
    window.dispatchEvent(new Event(MOUSE_EVENTS.MOUSEDOWN))

    window.PointerEvent = origPE

    globalThis.fetch = origFetch
  })
})
