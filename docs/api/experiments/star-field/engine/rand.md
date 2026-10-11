# `experiments/star-field/engine/rand.ts`

Deterministic seeded RNG for the star-field engine — the

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/rand.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `seedFrom`

Seeds the LCG from a string — FNV-1a hash so every body id scatters
differently but reproducibly.
- `@param` id Body id string.
