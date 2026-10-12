# `experiments/star-field/tests/coverage/starfield/engine/starfield-bodies-tails.test.js`

Coverage tails for the photographic bodies layer —

|                |                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/tests/coverage/starfield/engine/starfield-bodies-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                     |

## Members

### `NODE_DEPS`

TSL namespace + node-material ctor bundle injected into body makers.

### `fake2d`

Fake 2d context surface covering every call maskPhotoTexture makes.

### `fakePhoto`

Minimal loaded-texture stand-in — the mask only needs `image` +
`colorSpace`; using a plain object keeps the auto-mock's Texture gap
out of the test.

### `fake2dFull`

2d ctx extended with the transform/gradient calls spikeRay and
rockTexture make on top of the shared fake2d surface.

### `fakeGeo`

Geometry stand-in with a real position attribute — the chain
mock's `count` proxy coerces NaN so the crumple/UV-bake vertex
loop would never iterate; four real verts let it run.

### `recNodes`

Recording Mesh/Points stand-in — the chain proxy swallows the
`obj.raycast = () => undefined` assignment into its set trap, so the
stub arrow never becomes invocable. A real class stores it as a
plain property; `list` recovers instances `group.add` hides.

### `fakeCyl`

CylinderGeometry stand-in exposing a finite `position` attribute —
the chain-mock's `count` proxy coerces to 0 so the jet vertex-fade
loop never iterates under the auto-mock.
