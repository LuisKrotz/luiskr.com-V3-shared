# `core\tests\coverage\canvas\widgets\close-button-render-tails.test.js`

Coverage tail for close-button/render.ts — the

|                |                                                                            |
| -------------- | -------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\widgets\close-button-render-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                  |

## Members

### `reducedMotion`

Mutable render-mock state — mocks read these per-call so tests steer
reduced-motion and record every quad-binding call.

### `makeGl`

Fake WebGL context — every call lands in `calls` as [name, ...args].

### `makeHost`

Host surface the renderer reads — canvas + dims, overridable per test.
