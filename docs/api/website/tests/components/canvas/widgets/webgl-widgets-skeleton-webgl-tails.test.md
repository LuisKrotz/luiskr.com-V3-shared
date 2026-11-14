# `website\tests\components\canvas\widgets\webgl-widgets-skeleton-webgl-tails.test.js`

Split from webgl-widgets.test.js — covers the "skeleton-webgl tails" describe.

|                |                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\components\canvas\widgets\webgl-widgets-skeleton-webgl-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                  |

## Members

### `_makeCanvas`

Bare canvas — the widget only needs the element handle in these tests.

### `flushFrames`

Frame-tick flush — widget rAF steps need real timers past microtasks.
