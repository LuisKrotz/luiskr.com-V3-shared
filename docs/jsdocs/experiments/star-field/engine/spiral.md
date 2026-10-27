# `experiments\star-field\engine\spiral.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\spiral.ts`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Spiral-galaxy surface barrel.

The deterministic
point-cloud fills (spiral/elliptical/dust, mirrored byte-for-byte in
the WASM worker) live in `spiral/fill.ts`, and the scene assembly
(`makeSpiralGalaxy` — photo disc, sparkle layer, worker-dispatched
fill with identical local fallback, dust lanes, core sprite, pick
sphere) lives in `spiral/galaxy.ts`.

The distribution is deterministic (seeded LCG) so every boot draws the
same galaxy — no flicker between visits, no per-frame allocation.
