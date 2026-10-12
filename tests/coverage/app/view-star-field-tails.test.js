/**
 * @file view-star-field-tails.test.js — coverage tail for src/app/view.ts:
 * the `VIEW_TAGS.VIEW_STAR_FIELD` lazy-chunk arm — flipping to the
 * star-field experiment must resolve `@star/StarField.js` and swap the
 * outlet instantly when no outgoing view is mounted.
 */
import { VIEW_TAGS } from '@core/tokens/elements/views.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'

const { flipAppView } = await import('@/app/view.js')

describe('view star-field tail', () => {
  test('star-field view chunk imports and instant-swaps on an empty outlet', async () => {
    const outlet = document.createElement(HTML_TAGS.DIV)
    const c = { _sectionsMeasured: true, currentViewTag: VIEW_TAGS.VIEW_STAR_FIELD }

    await flipAppView(c, outlet)

    expect(outlet.firstElementChild?.tagName.toLowerCase()).toBe(VIEW_TAGS.VIEW_STAR_FIELD)
  })
})
