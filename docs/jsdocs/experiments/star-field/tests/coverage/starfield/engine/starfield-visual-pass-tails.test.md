# `experiments\star-field\tests\coverage\starfield\engine\starfield-visual-pass-tails.test.js`

Coverage tails for the visual-quality pass added to the

|                |                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------ |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\engine\starfield-visual-pass-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                          |

## Members

### `makeCanvas`

Bare canvas — createStarState only needs the element handle in these tests.

### `makeState`

Star-state factory with per-test field overrides merged on top.

### `fakeCamera`

Minimal PerspectiveCamera stub — frame code only touches position/aspect/updateProjectionMatrix.

### `ctxProto`

Canvas prototype accessor — for installing getContext stubs per test.

### `fake2d`

Fake 2d context covering the mask calls.

### `fakePhoto`

Minimal loaded-texture stand-in.

### `makeNode`

Scene-node record — the fields the visual pass mutates (pivot/spinner
rotations, mesh, satellite pivots) with per-test extras merged in.
