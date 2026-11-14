# `website\tests\coverage\components\carousel\sizing-tails-custom-carousel-sizing-measurefit-guard-tails.test.js`

Split from sizing-tails.test.js — covers the "custom-carousel sizing measureFit guard tails" describe.

|                |                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\carousel\sizing-tails-custom-carousel-sizing-measurefit-guard-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                                             |

## Members

### `SLIDE`

Slide fixtures spanning the aspect-ratio arms measureFit guards on.

### `stubEl`

Fresh element stub — measureFit only reads the fields below. The
_edgeClones* presets match what the SLIDE fixtures project (one ~840px
slide already covers half of the 800px host) so the clone recount
doesn't mask the layout-mode arm under test.

### `savedWidth`

Original innerWidth/innerHeight descriptors — restored after each test.

### `setViewport`

Viewport stub — redefines innerWidth/Height so fit math sees a real size.
