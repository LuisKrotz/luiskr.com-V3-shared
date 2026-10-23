# `core\tests\coverage\canvas\widgets\carousel-controls-tails.test.js`

Coverage tail for utils/canvas/widgets/carousel-controls.ts

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\canvas\widgets\carousel-controls-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                |

## Members

### `makeCanvas`

Fresh canvas each test — getContext is monkey-patched per instance.

### `liveArrow`

Live (unsettled) widget: hovered, so animate() keeps re-arming.

### `pumpFrame`

Pumps one shared-scheduler frame so _frameTick re-enters animate().
