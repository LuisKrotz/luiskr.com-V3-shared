# `core\tokens\starfield\kinds.ts`

Star-field taxonomy + action tokens: the region groups the

| | |
|---|---|
| **Source** | `src/core\tokens\starfield\kinds.ts` |
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

### `SATELLITE`

Artificial companion (ISS-class orbiters) — registered only inside
a host body's `satellites` list; gives the dossier badge a real
label instead of falling through to the raw kind string.

### `COMET`

Icy small body on an eccentric orbit (Halley-class) — renders a
dark irregular nucleus wrapped in a sublimated coma with ion and
dust tails that stream anti-sunward and grow toward periapsis.

### `ASTEROID`

Airless small body — main-belt asteroids, NEOs and Kuiper-belt
objects (Vesta, Bennu, Ryugu, Arrokoth). Renders a crumpled
irregular rock with the cratered procedural surface; distinct from
DWARF (hydrostatic-ish bodies like Ceres/Pluto/Eris).

### `SF_SURFACES`

Surface-recipe hints — catalog defs may pin the procedural painter's
style so a body matches its dossier description (a tidally-locked
lava planet must never draw ocean bands). Absent → the seed picks
within the kind's bias as before.

### `ROCK`

Cratered regolith — moons, asteroids, scorched inner worlds.

### `ICE`

Bright fractured ice — Europa/Enceladus/KBO streaked surfaces.

### `GAS`

Banded atmosphere — gas/ice giants and mini-Neptunes.

### `LAVA`

Dark crust split by glowing fault veins — lava worlds.

### `OCEAN`

Deep water with island mottle + polar caps — ocean worlds.

### `SF_ACTIONS`

Toolbar/panel action names dispatched through `data-action` clicks.
