/**
 * @file app-shell-coverage-approot-scroll-tracking.test.js
 * @description Split from app-shell-coverage.test.js — covers the "AppRoot — scroll tracking" describe.
 */
import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals'
import { AppRoot } from '@/App.js'
import router from '@core/router/router.js'
import { mount } from '@tests/fixtures/test-constants.js'
import { VIEW_TAGS } from '@core/tokens/elements/views.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { KEYBOARD_EVENTS } from '@core/tokens/events/dom.js'

import { ROUTE_NAMES, SECTIONS } from '@core/constants.js'
import { SECTION_IDS } from '@core/tokens/ids/sections.js'
import { deepQuerySelector } from '@core/utils/dom.js'

const flush = (ms = 0) => new Promise((r) => setTimeout(r, ms))

let cleanups = []

beforeEach(() => {
  // Mounts read router.currentRoute.view — keep a complete descriptor.
  router.currentRoute = { name: ROUTE_NAMES.HOME, view: VIEW_TAGS.VIEW_HOME, meta: {} }
})

afterEach(() => {
  cleanups.forEach((c) => c())
  cleanups = []
})

const stableFetch = () => {
  const orig = globalThis.fetch

  globalThis.fetch = jest.fn(async () => ({ ok: true, json: async () => null }))

  return orig
}

const _BAD_LOCALE = 'xx'

const _mountNav = () => {
  const el = document.createElement(COMPONENT_TAGS.APP_NAV)

  cleanups.push(mount(el))

  return el
}

const _keydown = (key) =>
  window.dispatchEvent(new window.KeyboardEvent(KEYBOARD_EVENTS.KEYDOWN, { key }))

// ─── scroll tracking ─────────────────────────────────────────────────────────
describe('AppRoot — scroll tracking', () => {
  test('checkScroll resolves sections on home and feeds nav elsewhere', async () => {
    const origFetch = stableFetch()

    const el = new AppRoot()
    cleanups.push(mount(el))

    await flush(60)

    // Non-home route → nav state push + early return.
    router.currentRoute = { name: 'Project', view: VIEW_TAGS.VIEW_PROJECT, meta: {} }
    el.checkScroll()

    expect(el.onBottom).toBeDefined()

    // onBottom transition — the nav write fires only when the computed
    // state actually changed (same-value frames skip it entirely).
    el.onBottom = false
    el.checkScroll()

    expect(el.onBottom).toBe(true)

    // Home route + measured markers → section resolution. scrollHeight
    // must exceed innerHeight + 200 or onBottom pins the section to contact.
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 5000,
      configurable: true,
    })

    router.currentRoute = { name: ROUTE_NAMES.HOME, view: VIEW_TAGS.VIEW_HOME, meta: {} }
    el._aboutTop = -100
    el._contactTop = -50
    el._sectionsMeasured = true
    el.checkScroll()

    expect(el.activeSection).toBe(SECTIONS.CONTACT)

    el._aboutTop = -100
    el._contactTop = 20000
    el.checkScroll()

    expect(el.activeSection).toBe(SECTIONS.ABOUT)

    el._aboutTop = 10000
    el._contactTop = 20000
    el.checkScroll()

    expect(el.activeSection).toBe(SECTIONS.HOME)

    // Unmeasured markers → lazy re-measure path.
    el._sectionsMeasured = false
    el._lastMeasureAttempt = 0
    el.checkScroll()

    expect(el._lastMeasureAttempt).toBeGreaterThan(0)

    // A second check inside the 400ms throttle window skips the re-measure —
    // _sectionsMeasured re-forced because updateSectionTops inside the first
    // call re-finds the live markers and flips it back to true.
    const lastAttempt = el._lastMeasureAttempt
    el._sectionsMeasured = false
    el.checkScroll()

    expect(el._lastMeasureAttempt).toBe(lastAttempt)

    // No #about/#contact markers in the document → updateSectionTops'
    // missing-marker else arms leave the tops at their fallbacks. The
    // markers live inside the view's shadow root — removal has to go
    // through the same deep query the measure uses.
    deepQuerySelector(`#${SECTION_IDS.ABOUT}`)?.remove()
    deepQuerySelector(`#${SECTION_IDS.CONTACT}`)?.remove()
    el.updateSectionTops()

    expect(el._sectionsMeasured).toBe(false)

    // Pre-measure _scrollH → the || fallback reads the live document.
    el._scrollH = 0
    el.checkScroll()

    // Nav absent at a real bottom transition → the if(nav) guard's null arm.
    // onBottom starts opposite the computed value (the 5000px scrollHeight
    // stub makes the current check resolve false) so bottomChanged fires
    // while no <app-nav> exists to update.
    router.currentRoute = { name: 'Project', view: VIEW_TAGS.VIEW_PROJECT, meta: {} }
    el.onBottom = true
    el.shadowRoot.querySelector(COMPONENT_TAGS.APP_NAV)?.remove()
    el.checkScroll()

    // Same-state check on a non-home route → bottomChanged's else arm.
    el.checkScroll()

    // Nullish section tops → the ?? 600/1500 fallbacks; a same-state
    // second check skips the nav write entirely (changed === false).
    router.currentRoute = { name: ROUTE_NAMES.HOME, view: VIEW_TAGS.VIEW_HOME, meta: {} }
    el._sectionsMeasured = true
    el._aboutTop = null
    el._contactTop = null
    el.checkScroll()
    el.checkScroll()

    globalThis.fetch = origFetch
  })
})
