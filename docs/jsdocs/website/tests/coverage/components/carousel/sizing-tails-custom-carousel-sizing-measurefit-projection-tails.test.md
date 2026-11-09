# `website\tests\coverage\components\carousel\sizing-tails-custom-carousel-sizing-measurefit-projection-tails.test.js`

Split from sizing-tails.test.js — covers the "custom-carousel sizing measureFit projection tails" describe.

|                |                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\carousel\sizing-tails-custom-carousel-sizing-measurefit-projection-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                                                  |

## Members

### `SLIDE`

Slide fixtures spanning the aspect-ratio arms measureFit projects —
normal, landscape, portrait, extreme-sliver, and size-missing.

### `stubEl`

Fresh element stub — measureFit only reads the fields below.

### `savedWidth`

Original innerWidth/innerHeight descriptors — restored after each test.

### `setViewport`

Viewport stub — redefines innerWidth/Height so fit math sees a real size.

### `OVERHEAD_DESKTOP`

Per-item overhead ≥1024: item padding + side margins + gap token.

### `OVERHEAD_TABLET`

Per-item overhead below 1024: side margins have not kicked in yet.
