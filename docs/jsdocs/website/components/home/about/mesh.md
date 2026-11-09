# `website\components\home\about\mesh.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\about\mesh.ts`             |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Live mesh session parked on the host.

### `size`

Re-measures the canvas box and re-stamps the backing store.

### `_SEL`

Lattice tunables — picture-wrapper selector, dot rows, radial spoke
count, and the dotted guide-line angles (radians) the mesh draws over.

### `_ink`

Cached dot ink (`r,g,b` string) + the theme flag it resolved under.

### `meshInk`

Dot ink — the lattice paints in `--text-muted` so the mesh reads on
whatever theme field sits behind the portrait (the old fixed mid-grey
vanished on the light aurora wash: "animation is not visible"). The
palette re-samples on a theme flip only — per-frame paints read the
cached channel string, so the loop never pays a getComputedStyle.

- `@returns` `r,g,b` channel string for rgba() composition.

### `hash`

Deterministic hash → pseudo-random 0..1 per lattice site — the static
per-dot jitter that breaks the rings' regularity into an organic field.

- `@param` row lattice row index
- `@param` i dot index within the row

### `paint`

Paints one frame of the lattice: 9 dense dot rows around the photo edge,
each dot displaced by a two-harmonic traveling wave plus a fixed hash
jitter — the warped-fabric look of the reference band; guide lines are
dotted spokes drifting at a slow angular rate.

- `@param` s the live session
- `@param` now rAF timestamp (ms)

### `attachMesh`

Arms the mesh on the portrait wrapper: creates the canvas, sizes it to
the wrapper box (×1.9 bleed for the outer ring + lines), and starts the
rAF loop unless motion is reduced. Self-healing — a re-render detaches
the canvas, so callers re-arm from onUpdated. Idempotent.

- `@param` host The <about-section> component the session parks on.
- `@returns` true when a session is running.

### `disarmMesh`

Stops the loop and detaches the canvas when the element unmounts.
