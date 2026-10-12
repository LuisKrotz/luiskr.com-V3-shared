# `experiments/star-field/engine/frame/shared.ts`

Lazily-armed frame state — bootstrap injects the real

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/frame/shared.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Vector3-like constructor armed by bootstrap.

### (module scope)

Color-like constructor armed by bootstrap (glaciation ramp).

### `armed`

Mutable per-module state shared across the frame/ submodules:
vec3 — armed Vector3 ctor (null until `armFrame` runs).
scratch — reused world-position vector (zero per-frame alloc).
ice/warm — pre-built glaciation tint ramp for `cycle` bodies.

### `armFrame`

Stores the real Vector3 (+ optional Color) constructors — bootstrap
calls this after the lazy three import so the frame modules never
import three itself. The Color pair pre-builds the glaciation tint
ramp so the per-frame cycle lerps without allocating.

- `@param` V The three.js Vector3 class.
- `@param` C The three.js Color class (optional — tests may omit it).
