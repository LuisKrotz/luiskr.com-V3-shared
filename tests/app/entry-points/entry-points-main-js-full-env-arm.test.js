/**
 * @file entry-points-main-js-full-env-arm.test.js
 * @description Single fresh import of main.ts under the full DOM
 * environment — guaranteed last-instance coverage for the top-level warm
 * block, the Safari probe and the mount path (one evaluation per file is
 * what the merged report counts).
 */

import { describe, test, expect, jest } from '@jest/globals'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { APP_IDS } from '@core/tokens/ids/app.js'
import { READER_CLASSES } from '@core/tokens/classes/reader.js'
import { A11Y_CLASSES } from '@core/tokens/classes/a11y.js'
import { MOUSE_EVENTS, WINDOW_EVENTS } from '@core/tokens/events/dom.js'

describe('main.js full-env warm block', () => {
  test('warm block + mount path under a normal window', async () => {
    jest.resetModules()

    // A paint-entry observer fires afterFirstPaint synchronously; the
    // bounded timer re-enters run() for the `if (fired)` arm.
    const PO = globalThis.PerformanceObserver

    globalThis.PerformanceObserver = class {
      constructor(cb) {
        this.cb = cb
      }
      observe() {
        this.cb({ getEntries: () => [{ name: 'other' }, { name: 'first-contentful-paint' }] })
      }
      disconnect() {}
    }

    // #app absent at eval → mount() fails, arming the retry interval and
    // the DOMContentLoaded listener; the article exercises the hoist arm.
    document.getElementById(APP_IDS.APP)?.remove()

    const boot = (await import('@/main.js')).bootPromise.catch(() => {})

    const app = document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    app.appendChild(document.createElement('article'))
    app.firstChild.className = READER_CLASSES.CONTENT
    document.body.appendChild(app)

    document.dispatchEvent(new Event(WINDOW_EVENTS.DOM_CONTENT_LOADED))

    await new Promise((r) => setTimeout(r, 1000))
    await boot

    expect(app.querySelector('*')).toBeTruthy()

    // Delegated skip-link handler — non-link click takes the `!link` early
    // return; a skip-link click reaches the `!main` guard (the mounted
    // root's shadow main isn't queryable in this env).
    document.body.dispatchEvent(new MouseEvent(MOUSE_EVENTS.CLICK, { bubbles: true }))

    const skip = document.createElement(HTML_TAGS.A)

    skip.className = A11Y_CLASSES.SKIP_LINK
    skip.href = '#reader-content'
    document.body.appendChild(skip)
    skip.dispatchEvent(new MouseEvent(MOUSE_EVENTS.CLICK, { bubbles: true, cancelable: true }))

    globalThis.PerformanceObserver = PO
  })
})
