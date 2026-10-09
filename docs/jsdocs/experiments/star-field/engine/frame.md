# `experiments/star-field/engine/frame.ts`

Per-frame + per-resize behavior for the star-field engine:

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/frame.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Vec3`

Lazily-armed Vector3 ctor — set by bootstrap after the three import.

### `_scratch`

Scratch vector reused by every proximity measurement (no per-frame alloc).

### `armFrame`

Stores the real Vector3 constructor — bootstrap calls this after the
lazy three import so frame.ts never imports three itself.
- `@param` V The three.js Vector3 class.

### `anchorWorldPos`

World position of an anchor — single getWorldPosition call-site so the
armed Vector3 stays private to this module; returns {x,y,z} so callers
never handle three types.
- `@param` anchor Any Object3D in the scene graph.

### `handleStarResize`

Resize step: measures the shadow host first, then the canvas parent,
then the window. Pixel ratio caps at 2 to prevent 3x-phone fill-rate
blowout.
- `@param` s Engine state.

### `checkApproach`

Proximity check — when the camera comes within a body's approach
distance its dossier JSON prefetches via `onApproach`, once per body
per session (the `approached` set). Selection prefetches too, so a
slow drift-through and a direct nav click share one cache.
- `@param` s Engine state.

### `tickStar`

Per-frame update, self-rescheduling via RAF:
  orbits — pivot.rotation.y = phase + t·ORBIT_SPEED·speed
  spins  — spinner.rotation.y advances by SPIN_SPEED·spin·dt
  satellites — same orbit formula on child pivots
  fly    — eased camera tween overrides manual control until done
  render — plain renderer.render (no post pipeline in this engine)
- `@param` s Engine state.
- `@param` now RAF timestamp in ms — falls back to performance.now.
