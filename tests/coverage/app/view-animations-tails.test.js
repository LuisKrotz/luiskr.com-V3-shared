/**
 * @file view-animations-tails.test.js — coverage tail for src/app/view.ts:
 * the `VIEW_TAGS.VIEW_ANIMATIONS` lazy-chunk arm — flipping to the
 * animations-reference view must resolve
 * `@website/views/animations/Animations.js` and swap the outlet instantly
 * when no outgoing view is mounted.
 */
import { VIEW_TAGS } from '@core/tokens/elements/views.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'

const { flipAppView } = await import('@/app/view.js')

describe('view animations tail', () => {
  test('animations view chunk imports and instant-swaps on an empty outlet', async () => {
    const outlet = document.createElement(HTML_TAGS.DIV)
    const c = { _sectionsMeasured: true, currentViewTag: VIEW_TAGS.VIEW_ANIMATIONS }

    await flipAppView(c, outlet)

    expect(outlet.firstElementChild?.tagName.toLowerCase()).toBe(VIEW_TAGS.VIEW_ANIMATIONS)
  })
})
