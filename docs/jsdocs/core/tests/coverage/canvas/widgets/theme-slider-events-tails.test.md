# `core\tests\coverage\canvas\widgets\theme-slider-events-tails.test.js`

Coverage tail for theme-slider/events.ts — the bound

|                |                                                                            |
| -------------- | -------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\widgets\theme-slider-events-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                  |

## Members

### `mountResult`

Mutable GPU-mock state — the webgpu-widget mock below reads these per-call.

### `loadClass`

Fresh-imports the slider class — picks up the per-test mock state.

### `flush`

Microtask + timer flush — mount queues and event handlers settle.

### `makeCanvas`

Canvas stub with a sized rect — slider drag math reads real boxes.

### `mount`

Instantiates a ThemeSliderWebGL on a stub canvas for event tests.
