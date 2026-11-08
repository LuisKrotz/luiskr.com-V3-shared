/**
 * @file search-era-tails.test.js
 * @description Coverage tails for the search-era app-shell arms:
 * flipAppView's `VIEW_TAGS.VIEW_SEARCH` lazy-chunk import, and the
 * open-preferences-modal listener's pref-null/pref-present branches in
 * boot.ts.
 */
import { jest } from '@jest/globals'
import { VIEW_TAGS } from '@core/tokens/elements/views.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { APP_EVENTS } from '@core/tokens/events/app.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'

const { flipAppView } = await import('@/app/view.js')
const { mountAppShell } = await import('@/app/boot.js')

describe('view search tail', () => {
  test('search view chunk imports and instant-swaps on an empty outlet', async () => {
    const outlet = document.createElement(HTML_TAGS.DIV)
    const c = { _sectionsMeasured: true, currentViewTag: VIEW_TAGS.VIEW_SEARCH }

    await flipAppView(c, outlet)

    expect(outlet.firstElementChild?.tagName.toLowerCase()).toBe(VIEW_TAGS.VIEW_SEARCH)
  })
})

describe('boot open-preferences-modal arms', () => {
  const fakeShell = (prefEl) => ({
    initInputListeners: jest.fn(),
    loadData: jest.fn(),
    subscribe: jest.fn(),
    $: jest.fn(() => prefEl),
    addScopedListener: jest.fn(),
    _updateViewContent: jest.fn(),
    updateSectionTops: jest.fn(),
    checkScroll: jest.fn(),
    routeLoading: false,
    currentViewTag: null,
  })

  const openPrefHandler = (c) =>
    c.addScopedListener.mock.calls.find((call) => call[1] === APP_EVENTS.OPEN_PREFERENCES_MODAL)[2]

  test('listener skips the open when no preferences-modal is mounted', async () => {
    const c = fakeShell(null)

    mountAppShell(c)
    openPrefHandler(c)()

    await new Promise((r) => setTimeout(r, 120))
    expect(c.$).toHaveBeenCalledWith(COMPONENT_TAGS.PREFERENCES_MODAL)
  })

  test('listener flips the modal open when it is mounted', async () => {
    const pref = { open: false }
    const c = fakeShell(pref)

    mountAppShell(c)
    openPrefHandler(c)()

    await new Promise((r) => setTimeout(r, 120))
    expect(pref.open).toBe(true)
  })

  test('lang-dialog + search-modal listeners flip their elements open', async () => {
    const dialog = { open: false }
    const modal = { open: false }
    const c = {
      initInputListeners: jest.fn(),
      loadData: jest.fn(),
      subscribe: jest.fn(),
      $: jest.fn((sel) =>
        sel === COMPONENT_TAGS.LANG_DIALOG
          ? dialog
          : sel === COMPONENT_TAGS.SEARCH_MODAL
            ? modal
            : null
      ),
      addScopedListener: jest.fn(),
      _updateViewContent: jest.fn(),
      updateSectionTops: jest.fn(),
      checkScroll: jest.fn(),
      routeLoading: false,
      currentViewTag: null,
    }

    mountAppShell(c)

    const handler = (ev) => c.addScopedListener.mock.calls.find((call) => call[1] === ev)[2]

    handler(APP_EVENTS.OPEN_LANG_DIALOG)()
    handler(APP_EVENTS.OPEN_SEARCH_MODAL)()

    await new Promise((r) => setTimeout(r, 120))
    expect(dialog.open).toBe(true)
    expect(modal.open).toBe(true)

    // Falsy arms — handlers no-op when the dialogs aren't mounted.
    c.$.mockReturnValue(null)
    handler(APP_EVENTS.OPEN_LANG_DIALOG)()
    handler(APP_EVENTS.OPEN_SEARCH_MODAL)()

    await new Promise((r) => setTimeout(r, 120))
  })
})
