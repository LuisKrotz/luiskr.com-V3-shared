# `website\tests\components\canvas\slider\slider-internals-theme-slider-tails.test.js`

Split from slider-internals.test.js — covers the "theme-slider tails" describe.

|                |                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\components\canvas\slider\slider-internals-theme-slider-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                  |

## Members

### `makeCanvas`

Canvas with a stubbed getBoundingClientRect — widget sizing reads real boxes.

### `_flushFrames`

Frame-tick flush — widget rAF steps need real timers past microtasks.
