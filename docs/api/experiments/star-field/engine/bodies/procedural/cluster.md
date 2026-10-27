# `experiments\star-field\engine\bodies\procedural\cluster.ts`

Seeded globular-cluster starfield texture — the no-photo

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\bodies\procedural\cluster.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.          |

## Members

### `_STAR_COUNT`

Resolved-star count inside the King profile — dense enough that the
core reads as blended light, sparse enough that edge members stay
individually resolvable. Canvas px budget only; the real clusters
carry ~10⁵ members.

### `_CORE_FRAC`

Core radius as a fraction of the half-canvas (r_c ≈ 0.14 r_t).

### `clusterRadius`

Rejection-sampled radius for one cluster star — draws u∈[0,1) as a
candidate along the radial axis and keeps it with probability
Σ(r)/Σ(0), concentrating draws inside the flat core.

- `@param` rand Seeded RNG.
- `@returns` Radius in half-canvas units (0 center → 1 edge).

### `clusterFor`

Paints the seeded globular-cluster texture — unresolved core glow +
King-sampled star speckles, used by `makeNebulaSprite` when a cluster
catalog entry carries no photo map.

- `@param` THREE The three.js module.
- `@param` def Cluster def (`id` seeds the swarm, `color` tints the core).
- `@returns` A CanvasTexture for the sprite map, or undefined.
