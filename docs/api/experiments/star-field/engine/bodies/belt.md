# `experiments/star-field/engine/bodies/belt.ts`

Small-body annulus renderer — asteroid belt and Kuiper

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/belt.ts`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `fillBeltRange`

Fills one index range of the belt annulus — each candidate index owns
a Fibonacci-hashed LCG stream so the fill partitions across the worker
pool; Kirkwood-lane rejects compact out of the range's live count.
Returns the number of points actually placed (≤ range length).

- `@param` pos xyz buffer — compacted output from index 0.
- `@param` col rgb buffer (same).
- `@param` seed Body seed.
- `@param` count Candidate count for this range.
- `@param` inner Annulus inner edge (chart units).
- `@param` width Annulus width.
- `@param` puff Vertical gaussian half-thickness.
- `@param` lanes Kirkwood gap frequency (0 = smooth classical disc).
- `@param` tint RGB particle tint.
- `@param` i0 First candidate index (0 for the local fill).
- `@param` i1 One past the last candidate index.
- `@returns` Live point count written.

### `makeBelt`

Builds the seeded particle annulus for a `kind: belt` catalog entry —
the asteroid belt between Mars and Jupiter, the Kuiper belt beyond
Neptune. Returns the Points object that becomes the node's mesh; its
`raycast` is a no-op by contract (non-pickable detail).

- `@param` THREE The three.js module.
- `@param` def Catalog entry — `def.belt` carries inner/outer/count/puff,
- `@param` glowTex Shared soft-disc sprite texture (may be undefined).
