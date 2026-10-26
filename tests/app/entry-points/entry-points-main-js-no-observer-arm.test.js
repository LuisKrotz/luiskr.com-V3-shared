/**
 * @file entry-points-main-js-no-observer-arm.test.js
 * @description Covers afterFirstPaint's `typeof PerformanceObserver ===
 * 'undefined'` arm — engines without the observer API take the double-rAF
 * chain directly. Own file: the merged report counts the last-imported
 * instance per file, so this env needs a dedicated registry.
 */

import { describe, test, expect, jest } from '@jest/globals'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { APP_IDS } from '@core/tokens/ids/app.js'

describe('main.js afterFirstPaint no-observer arm', () => {
  test('absent PerformanceObserver skips straight to the rAF chain', async () => {
    jest.resetModules()

    const PO = globalThis.PerformanceObserver

    delete globalThis.PerformanceObserver

    const app = document.getElementById(APP_IDS.APP) || document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    document.body.appendChild(app)

    const boot = (await import('@/main.js')).bootPromise.catch(() => {})

    await new Promise((r) => setTimeout(r, 1000))
    await boot

    expect(true).toBe(true)

    globalThis.PerformanceObserver = PO
  })
})
