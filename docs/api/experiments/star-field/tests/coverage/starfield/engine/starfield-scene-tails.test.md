# `experiments/star-field/tests/coverage/starfield/engine/starfield-scene-tails.test.js`

Coverage tails for the engine internals that need a

|                |                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Source**     | `src/experiments/star-field/tests/coverage/starfield/engine/starfield-scene-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                    |

## Members

### `NODE_DEPS`

TSL namespace + node-material ctor bundle injected into body makers.

### `packCloud`

Encodes a fake deep-field binary: uint32 count + stride-6 float records.

### `dirVec`

Plain {x,y,z,set} stand-in — the auto-mock's Vector3 swallows sets.
