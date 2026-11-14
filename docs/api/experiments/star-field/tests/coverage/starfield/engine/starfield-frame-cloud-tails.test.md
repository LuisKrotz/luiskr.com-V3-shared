# `experiments\star-field\tests\coverage\starfield\engine\starfield-frame-cloud-tails.test.js`

Coverage tails for the per-frame update layer and the

|                |                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------ |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\engine\starfield-frame-cloud-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                          |

## Members

### `NODE_DEPS`

Dependency bundle the frame-cloud factory expects — TSL node fns + material class.

### `dispatch`

wasm-pool dispatch spy — aliased once so beforeEach can reset/re-impl it.

### `makeCanvas`

Bare canvas — createStarState only needs the element handle in these tests.

### `makeState`

Star-state factory with per-test field overrides merged on top.

### `fakeCamera`

Minimal PerspectiveCamera stub — frame code only touches position/aspect/updateProjectionMatrix.

### `flush`

Microtask+timer flush — drains the frame pipeline's queued promises.

### `makeBin`

Packs a valid deep-field binary: uint32 count + count×6 f32
(x,y,z,mag,ci,kind). One record per kind plus a 100-kpc sentinel
star so the drop arm runs, plus a far-edge star for the fade band.
