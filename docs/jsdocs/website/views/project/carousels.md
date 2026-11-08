# `website\views\project\carousels.ts`

Carousel binding for ViewProject — configures each &lt;custom-carousel&gt; from the section data, eagerly for the first few and in idle batches for the rest.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\project\carousels.ts`                |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `scaleCarouselItem`

Desktop downscale for one carousel item — the division calc is for
WIDTH, not height: each ladder step (÷2 → ÷1.5 → ÷1.75) compounds on
the running width while the result still clears DESKTOP_SCALE_MIN_W;
once the media falls under the width check (the next step would drop
it below the floor), the accumulated divisor is applied to height —
aspect preserved. A 1980px item lands ~377px wide, a 997px item
~332px; small items below the first step stay natural.
`naturalSize` keeps the untouched CMS dims — the expand modal stamps
those (the modal never reduces) while `size` stays the display
contract for the carousel's dense-pixel render.

- `@param` item The media item (mutates a shallow copy's `size` only).
- `@returns` A copy with the scaled `size` + recorded `naturalSize`, or the item unchanged.

### `bindProjectCarousels`

Binds project carousels.

- `@param` view — the view
