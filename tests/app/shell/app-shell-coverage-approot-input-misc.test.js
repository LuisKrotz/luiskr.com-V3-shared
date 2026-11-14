/**
 * @file app-shell-coverage-approot-input-misc.test.js
 * @description Split from app-shell-coverage.test.js — covers the "AppRoot — input + misc" describe.
 */
import { describe, test, expect, jest, beforeEach, afterEach, afterAll } from '@jest/globals'
import { AppRoot } from '@/App.js'
import store from '@core/store.js'
import router from '@core/router/router.js'
import { mount } from '@tests/fixtures/test-constants.js'
import { VIEW_TAGS } from '@core/tokens/elements/views.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { PREF_MUTATIONS } from '@core/tokens/events/mutations.js'
import {
  DRAG_EVENTS,
  KEYBOARD_EVENTS,
  MOUSE_EVENTS,
  POINTER_EVENTS,
} from '@core/tokens/events/dom.js'
import { INPUT_STRINGS } from '@core/tokens/strings/input.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'

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

// ─── input listeners + misc ──────────────────────────────────────────────────
describe('AppRoot — input + misc', () => {
  test('pointerdown with touch pointerType commits touch input', async () => {
    const origFetch = stableFetch()

    const el = new AppRoot()
    cleanups.push(mount(el))

    await flush(60)

    const evt = new window.Event(POINTER_EVENTS.POINTERDOWN, { bubbles: true })

    evt.pointerType = INPUT_STRINGS.TOUCH
    window.dispatchEvent(evt)

    expect(store.getters.getInputMethod()).toBe(INPUT_STRINGS.TOUCH)

    evt.pointerType = INPUT_STRINGS.MOUSE
    window.dispatchEvent(evt)

    expect(store.getters.getInputMethod()).toBe(INPUT_STRINGS.POINTER)

    globalThis.fetch = origFetch
  })

  test('contextmenu/dragstart on media elements are prevented', async () => {
    const origFetch = stableFetch()

    const el = new AppRoot()
    cleanups.push(mount(el))

    await flush(60)

    const img = document.createElement(HTML_TAGS.IMG)

    document.body.appendChild(img)

    const cm = new window.Event(MOUSE_EVENTS.CONTEXTMENU, { bubbles: true, cancelable: true })

    img.dispatchEvent(cm)

    expect(cm.defaultPrevented).toBe(true)

    const ds = new window.Event(DRAG_EVENTS.DRAGSTART, { bubbles: true, cancelable: true })

    img.dispatchEvent(ds)

    expect(ds.defaultPrevented).toBe(true)

    img.remove()
    globalThis.fetch = origFetch
  })

  test('onDestroy tolerates a missing intro loader', async () => {
    const origFetch = stableFetch()

    const el = new AppRoot()
    cleanups.push(mount(el))

    await flush(60)

    expect(() => el.onDestroy()).not.toThrow()

    el._introLoader = { destroy: jest.fn() }
    el.onDestroy()

    expect(el._introLoader.destroy).toHaveBeenCalled()

    globalThis.fetch = origFetch
  })

  test('theme listener reapplies system theme on scheme change', async () => {
    const origFetch = stableFetch()

    store.commit(PREF_MUTATIONS.SET_THEME, THEME.SYSTEM)

    const el = new AppRoot()
    cleanups.push(mount(el))

    await flush(60)

    // The matchMedia listener was registered; simulate by committing
    // APPLY_THEME the same way the handler does under THEME.SYSTEM.
    store.commit(PREF_MUTATIONS.APPLY_THEME)

    expect([THEME.DARK, THEME.LIGHT]).toContain(store.getters.getEffectiveTheme())

    globalThis.fetch = origFetch
  })
})
