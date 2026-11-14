/**
 * @file app-shell-coverage-approot-tails-2.test.js
 * @description Second half of the "AppRoot tails" describe — see
 * app-shell-coverage-approot-tails.test.js for why the describe is
 * split (per-mount retained heap under happy-dom vs the 4GB worker
 * ceiling in the pooled module run).
 */
import { describe, test, expect, jest, beforeEach, afterEach, afterAll } from '@jest/globals'
import { AppRoot } from '@/App.js'
import store from '@core/store.js'
import router from '@core/router/router.js'
import { mount, TEST_TEXT } from '@tests/fixtures/test-constants.js'
import { VIEW_TAGS } from '@core/tokens/elements/views.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { LANG_MUTATIONS } from '@core/tokens/events/mutations.js'
import { APP_IDS } from '@core/tokens/ids/app.js'
import { A11Y_CLASSES } from '@core/tokens/classes/a11y.js'
import { ARIA_ATTRS } from '@core/tokens/attrs/aria.js'
import { LINK_ATTRS } from '@core/tokens/attrs/link.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { APP_CLASSES } from '@core/tokens/classes/app.js'
import { KEYBOARD_EVENTS } from '@core/tokens/events/dom.js'

import { ROUTE_NAMES } from '@core/constants.js'

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

// ─── AppRoot tails ──────────────────────────────────────────────────────────
describe('AppRoot tails', () => {
  const mountApp = async () => {
    const origFetch = stableFetch()
    const el = new AppRoot()
    cleanups.push(mount(el))

    await flush(80)

    return { el, origFetch }
  }

  test('loadData covers snapshot hit and miss arms on a bare element', async () => {
    const orig = globalThis.fetch
    const origLang = store.getters.getLang()

    globalThis.fetch = jest.fn(async () => ({ ok: true, json: async () => null }))

    const bare = new AppRoot()

    store.commit(LANG_MUTATIONS.SET_LANG, 'xx')
    bare.loadData()
    await flush(80)

    globalThis.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({
        actions: { click: 'c', tap: 't' },
        pref: {},
        carousel: {},
        statsHud: {},
      }),
    }))

    store.commit(LANG_MUTATIONS.SET_LANG, 'yy')
    bare.loadData()
    await flush(80)

    store.commit(LANG_MUTATIONS.SET_LANG, origLang)
    globalThis.fetch = orig
  })

  test('mount with a null currentRoute falls back to the home view', async () => {
    const origFetch = stableFetch()
    const origRoute = router.currentRoute

    router.currentRoute = null

    const el = new AppRoot()
    cleanups.push(mount(el))
    await flush(60)

    expect(el.currentViewTag).toBe(VIEW_TAGS.VIEW_HOME)

    router.currentRoute = origRoute
    globalThis.fetch = origFetch
  })

  test('same-tag view without onRouteParamChange takes the guard else', async () => {
    const { el, origFetch } = await mountApp()
    const outlet = el.shadowRoot.querySelector(`#${APP_IDS.VIEW_OUTLET}`)
    const current = outlet.firstElementChild

    el.currentViewTag = VIEW_TAGS.VIEW_HOME
    current.onRouteParamChange = undefined

    el._updateViewContent(router.currentRoute)

    expect(outlet.firstElementChild).toBe(current)

    globalThis.fetch = origFetch
  })

  test('project-route flip and unknown-tag flip cover the remaining else-ifs', async () => {
    const { el, origFetch } = await mountApp()
    const outlet = el.shadowRoot.querySelector(`#${APP_IDS.VIEW_OUTLET}`)

    el.currentViewTag = VIEW_TAGS.VIEW_PROJECT
    el._updateViewContent(router.currentRoute)

    await flush(480)

    el.currentViewTag = 'view-bogus'
    outlet.replaceChildren()
    el._updateViewContent(router.currentRoute)

    await flush(480)

    el.currentViewTag = VIEW_TAGS.VIEW_HOME
    outlet.replaceChildren(document.createElement(VIEW_TAGS.VIEW_HOME))

    globalThis.fetch = origFetch
  })

  test('checkScroll covers throttle, nullish tops and nav-missing arms', async () => {
    const { el, origFetch } = await mountApp()

    router.currentRoute = { name: ROUTE_NAMES.HOME, view: VIEW_TAGS.VIEW_HOME, meta: {} }
    el._sectionsMeasured = false
    el._lastMeasureAttempt = Date.now()
    el.checkScroll()

    el._aboutTop = null
    el._contactTop = null
    el.activeSection = TEST_TEXT.STALE
    el.checkScroll()

    el.shadowRoot.querySelector(COMPONENT_TAGS.APP_NAV).remove()
    el.activeSection = TEST_TEXT.STALE
    el.checkScroll()

    router.currentRoute = { name: ROUTE_NAMES.PROJECT, view: VIEW_TAGS.VIEW_PROJECT, meta: {} }
    el.checkScroll()

    router.currentRoute = { name: ROUTE_NAMES.HOME, view: VIEW_TAGS.VIEW_HOME, meta: {} }

    globalThis.fetch = origFetch
  })

  test('playground route import and onUpdated missing-child arms', async () => {
    const { el, origFetch } = await mountApp()

    el.currentViewTag = VIEW_TAGS.VIEW_SPACE_PLAYGROUND
    el._updateViewContent(router.currentRoute)

    await flush(480)

    el.translations = null
    el.onUpdated()

    el.shadowRoot.querySelector(COMPONENT_TAGS.APP_NAV)?.remove()
    el.shadowRoot.querySelector(COMPONENT_TAGS.COOKIE_BANNER)?.remove()
    el.shadowRoot.querySelector(COMPONENT_TAGS.PREFERENCES_MODAL)?.remove()
    el.shadowRoot.querySelector(`.${APP_CLASSES.PROGRESS_BAR}`)?.remove()
    el.onUpdated()

    globalThis.fetch = origFetch
  })

  test('the skip link lives inside a labelled nav landmark', async () => {
    const { el } = await mountApp()

    // aria_content_in_landmark — every page-level node must sit in a
    // landmark; the labelled <nav> wrapper contains the link (a second
    // <header> would create a duplicate banner against the light-DOM
    // shell's header).
    const link = el.shadowRoot.querySelector(`.${A11Y_CLASSES.SKIP_LINK}`)
    const wrapper = link?.parentElement

    expect(link).toBeTruthy()
    expect(wrapper.tagName).toBe(HTML_TAGS.NAV.toUpperCase())
    expect(wrapper.getAttribute(ARIA_ATTRS.ARIA_LABEL)).toBeTruthy()
    expect(link.getAttribute(LINK_ATTRS.HREF)).toBe(`#${APP_IDS.MAIN_CONTENT}`)
  })
})
