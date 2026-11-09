# `website\tests\components\carousel\custom-carousel-internals-customcarousel-internals.test.js`

Split from custom-carousel-internals.test.js — covers the "CustomCarousel internals" describe.

|                |                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\components\carousel\custom-carousel-internals-customcarousel-internals.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                            |

## Members

### `SLIDES`

Slide fixture — minimal src/size/label rows the carousel renders.

### `rect`

DOMRect factory — the scroll/sizing math only reads the box fields.

### `makeCarousel`

Mounts a <custom-carousel> with stubbed track rects so scroll math runs.

### `cleanup`

Detaches a mounted element — afterEach cleanup for stray mounts.
