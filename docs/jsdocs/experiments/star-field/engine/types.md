# `experiments/star-field/engine/types.ts`

Shared types for the star-field engine — the static body

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/types.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Static catalog entry — everything the scene needs to place a body,
declared once per body in catalog.ts. Orbiting bodies set `orbit` +
`parent`; fixed deep-sky objects set `pos` directly.

### `id`

Body id — matches `public/data/<id>.json` and `data-body` attrs.

### `name`

Display fallback before the dossier JSON loads.

### `kind`

SF_KINDS value — drives badge label + material recipe.

### `group`

SF_GROUPS value — navigator drawer bucket.

### `radius`

Visual radius in scene units (compressed chart, not to scale).

### (module scope)

Orbit radius around `parent` — omit for fixed positions.

### (module scope)

Id of the body it orbits (default: scene origin).

### (module scope)

Orbit angular speed multiplier (0 for fixed bodies).

### (module scope)

Self-rotation speed multiplier.

### (module scope)

Starting angle on the orbit (radians).

### (module scope)

Axial tilt (radians).

### (module scope)

SF_TEXTURES key material map — omit for procedural bodies.

### (module scope)

SF_COLORS hex for procedural material/emissive tint.

### (module scope)

Secondary texture for translucent shells (Venus atmosphere, Saturn ring).

### (module scope)

Shell is a flat ring disc (Saturn) rather than an atmosphere sphere.

### (module scope)

Fixed scene position `[x,y,z]` for non-orbiting deep-sky objects.

### (module scope)

Whether to draw the orbit guide ring.

### (module scope)

Decorative non-pickable satellites (companion stars, exoplanets) —
orbit this body's mesh; purely visual, no dossier of their own.

### (module scope)

Lazy-loaded dossier JSON shape — `public/data/<id>.json`. Facts render
as a definition list; `history` is a prose paragraph; `source` credits
the data provenance (NASA, ESO, …).

### (module scope)

Progress callback — loader overlay message + 0–100 percent.

### (module scope)

Body-approach/select notification — the host fetches the dossier JSON.

### (module scope)

Mutable engine state — one bag threaded through bootstrap/frame/fly so
every stage shares renderer, scene graph, tweens and dispose flags
without a class field soup.

### `canvas`

Persistent canvas the host owns (replaced on renderer retry).

### `renderer`

three.js WebGPURenderer (WebGPU or forced-WebGL backend).

### `nodes`

id → runtime body node record.

### `anchors`

id → center Object3D the camera targets (equals mesh for most).

### `pickables`

Pickable meshes for raycasting.

### `rings`

Orbit rings so destroy can dispose their geometry.

### `approached`

ids whose dossier was already prefetched — approach fires once.

### `fly`

Active fly-to tween or null when controls are free.

### `animId`

Active RAF id.

### `disposed`

Set by destroy() — every async stage checks before continuing.

### `failed`

Bootstrap failed or bailed — host swaps in the CSS fallback.

### `reduced`

Reduced-motion flag — pauses the RAF loop.

### `onResize`

Resize listener to detach on destroy.

### `onPointerDown`

Pointer listeners to detach on destroy.

### `downXY`

last pointer-down position for click-vs-drag discrimination.

### `lastT`

Last tick timestamp for dt-based animation.

### `t`

Elapsed scene time (seconds) — drives orbits/spins.

### `hoverId`

Camera hover state — last picked body id for the HUD.

### `selectedId`

Selected body id (panel open).

### (module scope)

Lifecycle callbacks from the host.

### (module scope)

Per-body runtime node — pivot (orbit rotation), mesh, and its def.

### `pivot`

Object3D that orbits — rotates around the parent's center.

### `mesh`

The pickable mesh/sprite — carries `userData.bodyId`.

### `spinner`

Spin target (mesh or its inner group) for self-rotation.

### `satPivots`

Satellite pivots (decorative companions) — rotate per frame.

### (module scope)

Active camera fly-to tween — cubic ease-in-out over FLY_MS.

### `t0`

Start time (performance.now snapshot).

### `fromPos`

Camera position at tween start.

### `toPos`

Camera destination.

### `fromTgt`

Controls target at tween start.

### `toTgt`

Controls target destination (body center).

### (module scope)

Optional follow-up when the tween completes (fire onSelect).
