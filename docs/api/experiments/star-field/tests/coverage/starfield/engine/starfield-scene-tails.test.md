# `experiments\star-field\tests\coverage\starfield\engine\starfield-scene-tails.test.js`

Coverage tails for the engine internals that need a

|                |                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\engine\starfield-scene-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                    |

## Members

### `NODE_DEPS`

TSL namespace + node-material ctor bundle injected into body makers.

### `packCloud`

Encodes a fake deep-field binary: uint32 count + stride-6 float records.

### `dirVec`

Plain {x,y,z,set} stand-in — the auto-mock's Vector3 swallows sets.

### `mkPts`

Particle-layer fixture — a Points-shaped object whose
`userData.gasPts` carries real typed arrays so the sim loop
writes positions/colors for real. `ud` is exposed on the fixture
so assertions can read the buffers back.

### `mkInstanced`

Instanced-tail surface — a live billboard path needs the tail's
`setMatrixAt`/`getWorldQuaternion` plus a camera quaternion and a
`s.THREE` scratch allocator. `sz` seeds the per-grain size array
on ion only, so ionGas still takes the `ud.sz?.[i] ?? 1` arm.

### `FXQuat`

Minimal THREE scratch — fx.ts lazily builds _mat/_vec/_scl/_qN/_qC
once `s.THREE` exists; the billboard compose path only needs
compose/set/setScalar and a chainable invert/multiply.
