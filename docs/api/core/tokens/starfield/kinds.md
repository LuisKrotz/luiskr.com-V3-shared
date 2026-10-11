# `core/tokens/starfield/kinds.ts`

Star-field taxonomy + action tokens: the region groups the

| | |
|---|---|
| **Source** | `src/core/tokens/starfield/kinds.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `LOCAL_GROUP`

Local Group dwarf + satellite galaxies — the ~30 small companions
orbiting the Milky Way and Andromeda (SagDEG, LMC/SMC, the faint
spheroidals, and the M31 subgroup).

### `HIERARCHY`

Cosmic-hierarchy boundary structures — Interstellar Neighborhood,
Local Group volume, superclusters, and the observable-universe rim.

### `SF_KINDS`

Body kinds — drive the dossier badge label and the material recipe in
the scene builder (textured sphere vs emissive star vs sprite nebula).

### `CLUSTER`

Star clusters (open/globular) — sprite recipe shared with nebulae.

### `DWARF_GALAXY`

Dwarf spheroidal/irregular galaxies — seeded elliptical point clouds
(unresolved smudges, no photographic disc to fake).

### `STRUCTURE`

Cosmic-hierarchy boundary shells + speckle volumes.

### `BELT`

Small-body annulus (asteroid belt, Kuiper belt) — a seeded Points
disc between `belt.inner`/`belt.outer`; not raycast-pickable, the
navigator still flies to it for the dossier.

### `SF_ACTIONS`

Toolbar/panel action names dispatched through `data-action` clicks.
