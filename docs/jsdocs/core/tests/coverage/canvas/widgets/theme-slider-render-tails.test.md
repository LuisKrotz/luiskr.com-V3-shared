# `core\tests\coverage\canvas\widgets\theme-slider-render-tails.test.js`

Coverage tail for theme-slider/render.ts — the spring

|                |                                                                            |
| -------------- | -------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\widgets\theme-slider-render-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                  |

## Members

### `reducedMotion`

Mutable render-mock state — the painter/binding mocks read these per-call
so tests steer reduced-motion and record every GL-facing call.

### `makeGl`

Fake WebGL context — every call lands in `calls` as [name, ...args].

### `makeHost`

Host surface the renderer reads — canvas + dims, overridable per test.
