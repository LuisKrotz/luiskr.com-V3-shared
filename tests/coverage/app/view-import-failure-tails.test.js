/**
 * @file view-import-failure-tails.test.js — coverage tails for src/app/view.ts:
 * the lazy view-chunk import rejection arm — a failed dynamic import (offline,
 * stale deploy/SW precache) must keep the current view mounted and surface the
 * load-failure notification instead of swapping in an undefined element.
 */
import { jest } from '@jest/globals'
import { getDevLog } from '@core/devlog.js'
import { LOG_LEVELS } from '@core/tokens/data/log.js'
import { VIEW_TAGS } from '@core/tokens/elements/views.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'
import { TEST_TEXT } from '@tests/fixtures/test-constants.js'

// The earth-playground chunk rejects as if the fetch failed — the throw
// inside the factory turns `await import()` into a rejection.
jest.unstable_mockModule('@earth/SpacePlayground.js', () => {
  throw new Error(TEST_TEXT.UNKNOWN)
})

const { flipAppView } = await import('@/app/view.js')

describe('view import failure tails', () => {
  test('failed view chunk import keeps the current view and logs the error', async () => {
    const outlet = document.createElement(HTML_TAGS.DIV)
    const current = document.createElement(VIEW_TAGS.VIEW_HOME)

    outlet.appendChild(current)

    const c = { _sectionsMeasured: true, currentViewTag: VIEW_TAGS.VIEW_SPACE_PLAYGROUND }

    await flipAppView(c, outlet)

    // Early return arm — the outlet still holds the previous view element.
    expect(outlet.firstElementChild).toBe(current)
    expect(getDevLog().filter((e) => e.level === LOG_LEVELS.ERROR).length).toBeGreaterThan(0)
  })
})
