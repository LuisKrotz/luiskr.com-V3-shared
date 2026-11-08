/**
 * @file app-shell-coverage-appnav-module-tails.test.js
 * @description Split from app-shell-coverage.test.js — covers the "AppNav module tails" describe.
 */
import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals'
import router from '@core/router/router.js'
import { mount } from '@tests/fixtures/test-constants.js'
import { VIEW_TAGS } from '@core/tokens/elements/views.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { KEYBOARD_EVENTS } from '@core/tokens/events/dom.js'

import { ROUTE_NAMES } from '@core/constants.js'

/** Timer flush — yields one macrotask so mounted element callbacks run. */
const _flush = (ms = 0) => new Promise((r) => setTimeout(r, ms))

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

/**
 * Replaces global fetch with a resolved-null stub so route/data calls
 * inside component mounts never hit the network; returns the original
 * for restoration.
 */
const _stableFetch = () => {
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

describe('AppNav module tails', () => {
  test('re-eval skips custom-element redefinition', async () => {
    jest.resetModules()

    await expect(import('@website/components/nav/AppNav.js')).resolves.toBeDefined()
  })
})
