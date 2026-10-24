/**
 * @file main-afterfirstpaint-tails.test.js — coverage tails for main.js's
 * afterFirstPaint deferral: the PerformanceObserver arms (paint entry →
 * run + disconnect, non-paint entry → stay armed, unsupported 'paint'
 * type → frame fallback, missing API → frame fallback), the once-guard,
 * and the reject path when the deferred work throws.
 */

import { describe, test, expect, jest } from '@jest/globals'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { APP_IDS } from '@core/tokens/ids/app.js'

jest.unstable_mockModule('@core/utils/service-worker.js', () => ({
  registerSiteServiceWorker: jest.fn(),
  dropStaleServiceWorkers: jest.fn(),
}))

jest.unstable_mockModule('@core/firebase.js', () => ({
  onAuthChange: jest.fn(async () => () => {}),
  signInWithGoogle: jest.fn(async () => ({})),
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

jest.unstable_mockModule('@core/safari/loader.js', () => ({}))
jest.unstable_mockModule('@/App.js', () => ({}))
jest.unstable_mockModule('@core/utils/wasm/wasm-css.js', () => ({}))
jest.unstable_mockModule('@website/views/home/Home.js', () => ({}))
jest.unstable_mockModule('@website/views/project/Project.js', () => ({}))

const PAINT_ENTRY = 'first-contentful-paint'

const ensureApp = () => {
  // window.router survives resetModules across tests — clear it so
  // deferred-mount assertions see only this test's boot.
  delete window.router

  if (document.getElementById(APP_IDS.APP)) return

  const app = document.createElement(HTML_TAGS.DIV)

  app.id = APP_IDS.APP
  document.body.appendChild(app)
}

/**
 * Installs a fake PerformanceObserver whose instances are captured for
 * manual entry delivery. happy-dom ships a PerformanceObserver stub that
 * never produces paint entries — swapping it lets the observer arms run.
 * @param observeImpl optional observe override (throw → unsupported arm)
 * @returns captured observer instances
 */
const installFakePO = (observeImpl) => {
  const instances = []
  const saved = globalThis.PerformanceObserver

  globalThis.PerformanceObserver = class {
    constructor(cb) {
      this.cb = cb
      this.disconnected = false
      instances.push(this)
    }

    observe(spec) {
      if (observeImpl) observeImpl(spec)
    }

    disconnect() {
      this.disconnected = true
    }
  }

  return { instances, restore: () => (globalThis.PerformanceObserver = saved) }
}

const entries = (...names) => ({ getEntries: () => names.map((name) => ({ name })) })

describe('main.js afterFirstPaint tails', () => {
  test('a first-contentful-paint entry runs the deferred work and disconnects', async () => {
    jest.resetModules()
    ensureApp()

    const { instances, restore } = installFakePO()

    try {
      const { bootPromise } = await import('@/main.js')

      expect(instances.length).toBeGreaterThan(0)

      // Feed every observer the paint signal — both deferrals settle.
      for (const ob of instances) ob.cb(entries(PAINT_ENTRY))

      await bootPromise

      expect(instances.every((ob) => ob.disconnected)).toBe(true)
      expect(window.router).toBeTruthy()

      // A second delivery hits the once-guard — run() must early-return
      // instead of executing the deferred body twice.
      for (const ob of instances) ob.cb(entries(PAINT_ENTRY))

      await bootPromise
    } finally {
      restore()
    }
  })

  test('non-paint entries leave the deferral armed until the bounded timer', async () => {
    jest.useFakeTimers()
    jest.resetModules()
    ensureApp()

    const { instances, restore } = installFakePO()

    try {
      const { bootPromise } = await import('@/main.js')

      for (const ob of instances) ob.cb(entries('first-paint'))

      await jest.advanceTimersByTimeAsync(100)

      expect(window.router).toBeUndefined()

      await jest.advanceTimersByTimeAsync(800)

      await bootPromise

      expect(window.router).toBeTruthy()
      expect(instances.every((ob) => ob.disconnected)).toBe(true)
    } finally {
      restore()
      jest.useRealTimers()
    }
  })

  test('unsupported paint observation falls back to the frame arm', async () => {
    jest.resetModules()
    ensureApp()

    const { instances, restore } = installFakePO(() => {
      throw new Error('paint unsupported')
    })

    try {
      const { bootPromise } = await import('@/main.js')

      // The double-rAF arm resolves on real timers — the bounded timer is
      // the ceiling but frames land first under happy-dom.
      await bootPromise

      expect(window.router).toBeTruthy()
      expect(instances.length).toBeGreaterThan(0)
    } finally {
      restore()
    }
  })

  test('missing PerformanceObserver falls back to the frame arm', async () => {
    jest.resetModules()
    ensureApp()

    const saved = globalThis.PerformanceObserver

    delete globalThis.PerformanceObserver

    try {
      const { bootPromise } = await import('@/main.js')

      await bootPromise

      expect(window.router).toBeTruthy()
    } finally {
      globalThis.PerformanceObserver = saved
    }
  })

  test('throwing deferred work rejects the deferred promise', async () => {
    jest.resetModules()
    ensureApp()

    const warmError = new Error('warm failed')

    jest.unstable_mockModule('@core/utils/data/db.js', () => ({
      warmBootstrap: () => {
        throw warmError
      },
    }))

    const { instances, restore } = installFakePO()

    try {
      const { bootPromise } = await import('@/main.js')

      for (const ob of instances) ob.cb(entries(PAINT_ENTRY))

      const settled = await bootPromise.then(
        () => 'resolved',
        () => 'rejected'
      )

      expect(settled).toBe('rejected')
    } finally {
      restore()
      jest.unstable_mockModule('@core/utils/data/db.js', () => ({
        warmBootstrap: () => {},
      }))
    }
  })
})
