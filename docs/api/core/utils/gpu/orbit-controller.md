# `core\utils\gpu\orbit-controller.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\gpu\orbit-controller.ts`                  |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `PITCH_LIMIT`

Default pitch clamp — π/2 minus a sliver so the poles never flip.

### `SETTLE_EPS`

Settle epsilon — damped channels snap below this so idle frames stop writing.

### (module scope)

Gesture spec for `bindOrbit` — OrbitControls-faithful where feasible.

### (module scope)

World point the camera circles (default origin).

### (module scope)

Eye→target distance (default 10).

### (module scope)

Initial yaw about +Y, radians (default 0).

### (module scope)

Initial pitch/elevation, radians (default 0).

### (module scope)

Distance clamps (defaults 0.1 / 1e5).

### (module scope)

Pitch clamps (defaults ±(π/2 − ε)).

### (module scope)

Idle auto-rotation, radians per second (default 0 = off).

### (module scope)

Damped-lerp factor per 60Hz slice (OrbitControls' dampingFactor
≈0.05–0.1). Internally converted to a frame-rate-independent
rate so 120/240Hz surfaces damp identically.

### (module scope)

Radians per CSS px of drag (default ≈ full turn per 800px).

### (module scope)

Distance multiplier per wheel deltaY unit (default 0.0015).

### (module scope)

Wheel/pinch zoom toggle (default true).

### (module scope)

Listener signature for the START/END/CHANGE contract.

### (module scope)

Live orbit rig returned by `bindOrbit`.

### `autoRotate`

Gesture latch — false stops the idle drift (OrbitControls.autoRotate).

### (module scope)

Damped current pose — feed `surface.set_orbit` after update().

### `update`

One frame of integration — auto-rotate advances the target while
no pointer is captured, then every channel damps toward its
target. Allocation-free. Returns true when the pose changed (the
caller pushes `set_orbit` + fires CHANGE consumers).

- `@param` dt Frame delta in seconds.

### `getDistance`

Current damped distance — the label-fade/zoom-reveal input.

### `setTarget`

Moves the orbit target (world point).

### `setPose`

Jumps the pose (save/restore arms — targets AND currents snap).

### `addEventListener`

Registers a START/END/CHANGE listener.

### `removeEventListener`

Removes a registered listener.

### `dispose`

Unbinds every listener + clears pointer state.

### `bindOrbit`

Binds pointer/wheel input on `canvas` to a damped orbit rig. The rig
never touches the camera itself — consumers read the pose fields
after `update(dt)` and push them into the engine (`set_orbit`) or a
three camera (the math is backend-agnostic by design).

- `@param` canvas The scene's input surface.
- `@param` spec Gesture + clamp options.

### `dirty`

Pose-dirty latch — setTarget/setPose change the pushed pose even
when the damped channels are already settled.

### `pointers`

Pointers currently captured on the canvas (1 = drag, 2 = pinch).

### `pinchSpan`

Span between the first two captured pointers — the pinch baseline.

### `pinchDistance`

The distance at pinch start — multiplied by the live ratio.
