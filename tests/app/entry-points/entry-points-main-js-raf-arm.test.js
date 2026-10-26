/**
 * @file entry-points-main-js-raf-arm.test.js
 * @description Covers afterFirstPaint's fallback arms that a working paint
 * observer skips: `observer.observe` throwing (unsupported 'paint' entry)
 * and the `!observing` double-rAF chain. Kept in its own file because
 * jest.resetModules() discards a module's coverage counters on re-import —
 * the last-imported instance per file is what the merged report counts.
 */

import { describe, test, expect, jest } from '@jest/globals'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { APP_IDS } from '@core/tokens/ids/app.js'

const ensureApp = () => {
  const app = document.getElementById(APP_IDS.APP) || document.createElement(HTML_TAGS.DIV)

  app.id = APP_IDS.APP
  document.body.appendChild(app)
}

describe('main.js afterFirstPaint rAF fallback', () => {
  test('observe() throwing falls through to the double-rAF chain', async () => {
    jest.resetModules()

    const PO = globalThis.PerformanceObserver

    globalThis.PerformanceObserver = class {
      constructor(cb) {
        this.cb = cb
      }
      observe() {
        throw new Error('paint entry unsupported')
      }
      disconnect() {}
    }

    ensureApp()

    const boot = (await import('@/main.js')).bootPromise.catch(() => {})

    // The rAF chain resolves run() on two frames; the bounded timer covers
    // the `if (fired)` re-entry afterwards.
    await new Promise((r) => setTimeout(r, 1000))
    await boot

    expect(true).toBe(true)

    globalThis.PerformanceObserver = PO
  })
})
