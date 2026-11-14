# `experiments\star-field\tests\coverage\starfield\engine\star-engine-tails.test.js`

Coverage tails for the star-field engine internals — the

|                |                                                                                        |
| -------------- | -------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\engine\star-engine-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                |

## Members

### (module scope)

TSL namespace + node-material ctor bundle injected into body makers.

### `setSearch`

Rewrites the URL without navigation — sets debug/query params per test.

### `flush`

Timer flush — drains the engine's queued promises between actions.

### `makeCanvas`

Bare canvas — createStarState only needs the element handle in these tests.

### `makeState`

Star-state factory with per-test field overrides merged on top.

### `makeFailOnceRenderer`

WebGPURenderer stand-in that fails its first init() then succeeds.

### `fakeCamera`

Minimal PerspectiveCamera stub — frame code only touches position/aspect/updateProjectionMatrix.
