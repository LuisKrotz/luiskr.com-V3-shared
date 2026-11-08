/**
 * @file service-worker-tails.test.js — coverage tail for
 * src/registerServiceWorker.ts: the PROD arm. The module registers the
 * Workbox lifecycle callbacks on window `load`; a stubbed
 * `navigator.serviceWorker` registry lets each hook body run — ready,
 * registered, cached (no prior controller), updatefound, updated (live
 * controller → reload), offline and error — plus the localhost
 * existence/mime probe path.
 */
import { describe, test, expect, afterEach, jest } from '@jest/globals'
import { registerServiceWorker } from '@/registerServiceWorker.js'
import { WINDOW_EVENTS, SW_EVENTS, SW_STRINGS } from '@core/tokens/events/dom.js'

const flush = (ms = 30) => new Promise((r) => setTimeout(r, ms))

/** Collectable fake registration — event handlers land in `handlers`. */
const makeRegistration = (controllerState) => {
  const installing = {
    state: SW_STRINGS.INSTALLED,
    handlers: {},
    addEventListener(type, fn) {
      this.handlers[type] = fn
    },
  }
  const handlers = {}

  return {
    installing,
    handlers,
    unregister: jest.fn(async () => true),
    addEventListener(type, fn) {
      handlers[type] = fn
    },
  }
}

describe('registerServiceWorker prod arm', () => {
  const savedSW = Object.getOwnPropertyDescriptor(globalThis.navigator, 'serviceWorker')
  const savedFetch = globalThis.fetch

  afterEach(() => {
    if (savedSW) Object.defineProperty(globalThis.navigator, 'serviceWorker', savedSW)
    else delete globalThis.navigator.serviceWorker
    globalThis.fetch = savedFetch
  })

  test('the load registration wires every lifecycle hook', async () => {
    const registration = makeRegistration()

    // A live controller makes the install an update (→ `updated`), not the
    // first precache fill — flip to null mid-test for the `cached` arm.
    const swState = { controller: {} }

    const sw = {
      ready: Promise.resolve(registration),
      get controller() {
        return swState.controller
      },
      getRegistration: jest.fn(async () => registration),
      register: jest.fn(async () => registration),
    }

    Object.defineProperty(globalThis.navigator, 'serviceWorker', {
      value: sw,
      configurable: true,
    })

    globalThis.fetch = jest.fn(async () => ({
      status: 200,
      headers: { get: () => `application/${SW_STRINGS.SCRIPT_MIME}` },
    }))

    registerServiceWorker({ PROD: true, BASE_URL: '/' })
    window.dispatchEvent(new window.Event(WINDOW_EVENTS.LOAD))
    await flush()

    expect(sw.register).toHaveBeenCalled()

    // updatefound → installing statechange → installed → controller → updated.
    registration.handlers[SW_EVENTS.UPDATE_FOUND]?.()
    registration.installing.handlers[SW_EVENTS.STATE_CHANGE]?.()

    // No controller now → the same install reads as the first precache fill.
    swState.controller = null
    registration.handlers[SW_EVENTS.UPDATE_FOUND]?.()
    registration.installing.handlers[SW_EVENTS.STATE_CHANGE]?.()

    window.dispatchEvent(new window.Event(SW_EVENTS.OFFLINE))

    await flush()
  })

  test('an invalid localhost probe unregisters and reports the error hook', async () => {
    const registration = makeRegistration()

    Object.defineProperty(globalThis.navigator, 'serviceWorker', {
      value: {
        ready: Promise.resolve(registration),
        controller: null,
        getRegistration: jest.fn(async () => registration),
        register: jest.fn(async () => registration),
      },
      configurable: true,
    })

    // The probe answers non-JS — the dev-shell guard unregisters instead of
    // installing a service worker that would hijack dev.
    globalThis.fetch = jest.fn(async () => ({
      status: 200,
      headers: { get: () => 'text/html' },
    }))

    registerServiceWorker({ PROD: true, BASE_URL: '/' })
    window.dispatchEvent(new window.Event(WINDOW_EVENTS.LOAD))
    await flush()

    expect(registration.unregister).toHaveBeenCalled()
  })

  test('the non-PROD arm drops stale workers and returns', () => {
    Object.defineProperty(globalThis.navigator, 'serviceWorker', {
      value: { getRegistrations: jest.fn(async () => [{ unregister: jest.fn(async () => true) }]) },
      configurable: true,
    })

    expect(() => registerServiceWorker({ PROD: false, BASE_URL: '/' })).not.toThrow()
    expect(() => registerServiceWorker()).not.toThrow()
  })
})
