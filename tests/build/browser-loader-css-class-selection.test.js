/**
 * @file browser-loader-css-class-selection.test.js
 * @description Covers the viewport-aware stylesheet path added to the
 * inlined loader: the manifest's tier.css map is cumulative width-class
 * files (index-mobile/tablet/desktop/wide) — pickCssName serves the single
 * sheet the current viewport needs, matchMedia-less engines get the wide
 * (full-content) file, and watchCssGrowth appends the wider cumulative
 * sheet on upward breakpoint crosses before removing the narrower link.
 */
import fs from 'node:fs'
import path from 'node:path'
import { ROOT_DIR, TEST_UA } from '@tests/fixtures/test-constants.js'
import { BROWSERS } from '@core/browser/detect.js'

const LOADER = fs.readFileSync(
  path.join(ROOT_DIR, 'shared', 'scripts', 'build', 'browser-loader.js'),
  'utf-8'
)

/** Cumulative css map shape mirroring the emitted __LK manifest. */
const CSS_MAP = {
  mobile: '/v/es2026/assets/css/index-mobile-a1.css',
  tablet: '/v/es2026/assets/css/index-tablet-b2.css',
  desktop: '/v/es2026/assets/css/index-desktop-c3.css',
  wide: '/v/es2026/assets/css/index-wide-d4.css',
}

/** A manifest whose single target selects immediately. */
const mkManifest = () => ({
  targets: [
    {
      name: 'es2026',
      js: '/v/es2026/app.js',
      css: CSS_MAP,
      module: true,
      default: true,
      tests: ['true'],
    },
  ],
  polys: [],
  order: [],
  browsers: BROWSERS,
})

/**
 * Runs the loader inside a Function sandbox with a matchMedia stub whose
 * per-query match state is externally flippable. `fire(query)` flips the
 * recorded flag and dispatches every registered `change` listener —
 * mirroring a real breakpoint cross.
 */
const runLoader = ({ matches = {}, appId = 'app' } = {}) => {
  const head = []
  const appEl = { appended: [], appendChild: (c) => appEl.appended.push(c) }
  const docEl = {
    attrs: {},
    setAttribute(k, v) {
      this.attrs[k] = v
    },
  }

  const headNode = {
    appendChild: (c) => {
      c.parentNode = headNode
      head.push(c)
      // Injected links/scripts resolve onload synchronously in the stub —
      // the loader chains polyfill→bundle and css grow-swaps through them.
      if (c.onload) c.onload()
    },
    removeChild: (c) => {
      const i = head.indexOf(c)

      if (i >= 0) head.splice(i, 1)

      c.parentNode = null
    },
  }

  const document = {
    documentElement: docEl,
    head: headNode,
    body: { appendChild: () => {} },
    getElementById: (id) => (id === appId ? appEl : null),
    createElement: (tag) => {
      const el = {
        attrs: {},
        setAttribute(k, v) {
          this.attrs[k] = v
        },
        appendChild() {},
      }

      if (tag === 'script') el.noModule = true

      return el
    },
  }

  const mqls = {}
  const window = {
    __LK: mkManifest(),
    matchMedia: (query) => {
      if (!mqls[query]) {
        mqls[query] = {
          media: query,
          matches: Boolean(matches[query]),
          listeners: [],
          addEventListener(_t, fn) {
            this.listeners.push(fn)
          },
          removeEventListener(_t, fn) {
            this.listeners = this.listeners.filter((l) => l !== fn)
          },
        }
      }

      return mqls[query]
    },
  }

  const navigator = { userAgent: TEST_UA.CHROME }

  new Function('window', 'document', 'navigator', LOADER)(window, document, navigator)

  /** Flips a media query's match state and fires every live change listener. */
  const fire = (query, matchesNow) => {
    const mql = window.matchMedia(query)

    mql.matches = matchesNow
    mql.listeners.slice().forEach((fn) => fn())
  }

  return { head, docEl, fire }
}

describe('browser-loader — viewport css class selection', () => {
  test('no matchMedia → the wide (full-content) sheet is served', () => {
    const head = []
    const docEl = {
      attrs: {},
      setAttribute(k, v) {
        this.attrs[k] = v
      },
    }
    const document = {
      documentElement: docEl,
      head: { appendChild: (c) => head.push(c) },
      body: null,
      getElementById: () => null,
      createElement: (tag) => {
        const el = {
          attrs: {},
          setAttribute(k, v) {
            this.attrs[k] = v
          },
          appendChild() {},
        }

        if (tag === 'script') el.noModule = true

        return el
      },
    }

    new Function('window', 'document', 'navigator', LOADER)({ __LK: mkManifest() }, document, {
      userAgent: TEST_UA.CHROME,
    })

    expect(head.find((n) => n.href === CSS_MAP.wide)).toBeTruthy()
    expect(head.filter((n) => n.rel === 'stylesheet')).toHaveLength(1)
  })

  test('a tablet viewport gets the cumulative tablet sheet — never desktop/wide', () => {
    const { head } = runLoader({ matches: { '(min-width:767px)': true } })

    expect(head.find((n) => n.href === CSS_MAP.tablet)).toBeTruthy()
    expect(head.find((n) => n.href === CSS_MAP.desktop)).toBeFalsy()
    expect(head.find((n) => n.href === CSS_MAP.wide)).toBeFalsy()
    expect(head.filter((n) => n.rel === 'stylesheet')).toHaveLength(1)
  })

  test('a phone viewport gets the mobile sheet (base + mobile blocks only)', () => {
    const { head } = runLoader()

    expect(head.find((n) => n.href === CSS_MAP.mobile)).toBeTruthy()
    expect(head.filter((n) => n.rel === 'stylesheet')).toHaveLength(1)
  })

  test('upward cross appends the wider cumulative sheet, then drops the narrower link', () => {
    const { head, fire } = runLoader({ matches: { '(min-width:767px)': true } })

    expect(head.find((n) => n.href === CSS_MAP.tablet)).toBeTruthy()

    // 767→1500: the desktop gate crosses — its superset sheet lands first…
    fire('(min-width:1279px)', true)

    const sheets = head.filter((n) => n.rel === 'stylesheet')

    // …and its onload (synchronous in the stub) retires the narrower link —
    // exactly one live stylesheet, the desktop cumulative file.
    expect(sheets).toHaveLength(1)
    expect(sheets[0].href).toBe(CSS_MAP.desktop)
  })

  test('a downward cross leaves the served cumulative sheet untouched', () => {
    const { head, fire } = runLoader({ matches: { '(min-width:767px)': true } })

    // Shrinking below a gate the listener still watches is ignored —
    // the tablet sheet's higher blocks simply stop matching.
    fire('(min-width:1279px)', false)

    const sheets = head.filter((n) => n.rel === 'stylesheet')

    expect(sheets).toHaveLength(1)
    expect(sheets[0].href).toBe(CSS_MAP.tablet)
  })
})
