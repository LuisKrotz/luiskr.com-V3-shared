# `experiments/star-field/engine/bodies/belt.ts`

Small-body annulus renderer — asteroid belt and Kuiper

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/bodies/belt.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `makeBelt`

Builds the seeded particle annulus for a `kind: belt` catalog entry —
the asteroid belt between Mars and Jupiter, the Kuiper belt beyond
Neptune. Returns the Points object that becomes the node's mesh; its
`raycast` is a no-op by contract (non-pickable detail).
- `@param` THREE The three.js module.
- `@param` def Catalog entry — `def.belt` carries inner/outer/count/puff,
- `@param` glowTex Shared soft-disc sprite texture (may be undefined).
