/**
 * @file entry-points-polyfills.test.js
 * @description Split from entry-points.test.js — covers the "polyfills" describe.
 */
import { describe, test, expect, jest } from '@jest/globals'

// Records service-worker registration calls — the mock module injects it.
const registerMock = jest.fn()

jest.unstable_mockModule('@core/utils/service-worker.js', () => ({
  registerSiteServiceWorker: registerMock,
  dropStaleServiceWorkers: jest.fn(),
}))

// Captured firebase-auth state callbacks — tests fire them to simulate sign-in.
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

// No-op router stand-in — lets the entry module boot without a route table.
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

describe('polyfills', () => {
  test('importing polyfills installs globals without throwing', async () => {
    await expect(import('@core/legacy-polyfills/polyfills.js')).resolves.toBeTruthy()
  })
})
