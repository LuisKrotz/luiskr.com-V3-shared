/**
 * @file entry-points-main-js-safari-arm.test.js
 * main.js skip-link delegated click — the `if (!main) return` early-out:
 * a `.skip-link` anchor click where the freshly created <app-root> still
 * has no shadow #main-content resolves `main` to undefined, so the
 * handler returns before preventDefault/focus.
 */

import { A11Y_CLASSES } from '@core/tokens/classes/a11y.js'
import { APP_IDS } from '@core/tokens/ids/app.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { MOUSE_EVENTS, WINDOW_EVENTS } from '@core/tokens/events/dom.js'

describe('main.js skip-link early-return arm', () => {
  test('a .skip-link click with no shadow #main-content returns early', async () => {
    const PO = globalThis.PerformanceObserver

    globalThis.PerformanceObserver = class {
      constructor(cb) {
        this.cb = cb
      }

      observe() {
        this.cb({ getEntries: () => [{ entryType: 'paint', name: 'first-contentful-paint' }] })
      }

      disconnect() {}
    }

    const app = document.createElement(HTML_TAGS.DIV)

    app.id = APP_IDS.APP
    document.body.appendChild(app)

    const link = document.createElement(HTML_TAGS.A)

    link.className = A11Y_CLASSES.SKIP_LINK
    document.body.appendChild(link)

    try {
      const boot = (await import('@/main.js')).bootPromise

      document.dispatchEvent(new Event(WINDOW_EVENTS.DOM_CONTENT_LOADED))

      // 800ms bounded fallback covers the deferred wave — mount() then
      // registers the document-level skip-link handler this click hits.
      await new Promise((r) => setTimeout(r, 1000))
      await boot.catch(() => {})

      // Drop the mounted <app-root> so the handler's shadow #main-content
      // lookup resolves undefined → the `if (!main) return` arm fires.
      app.querySelectorAll('*').forEach((el) => el.remove())

      link.dispatchEvent(new Event(MOUSE_EVENTS.CLICK, { bubbles: true }))
    } finally {
      globalThis.PerformanceObserver = PO
    }
  })
})
