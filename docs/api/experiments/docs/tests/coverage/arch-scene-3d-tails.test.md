# `experiments\docs\tests\coverage\arch-scene-3d-tails.test.js`

Coverage tail for docs/arch-scene-3d.ts and the

|                |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tests\coverage\arch-scene-3d-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.           |

## Members

### `mockSurface`

Mock slots the module factories read per-call — tests swap these to steer branches.

### `mountResult`

Value mountScene3d resolves to — null exercises the WebGPU-missing path.

### `mockCtl`

Orbit-controller stub bindOrbit returns — null exercises the no-orbit path.

### `mockGpu`

hasWebGpu() return — false routes every widget mount to the 2d fallback.

### `mockGpuEnabled`

webgpuWidgetsEnabled() return — the kill-switch branch.

### `ROOTS`

Docs-tree fixture — one root with nested dir/file children for scene walks.

### `flush`

Timer flush — mounted scene queues need real timers past microtasks.

### `makeSurface`

Fake Surface3d — records every call; ids increment per family.

### `makeCtl`

Orbit-controller stub — listener registry + mutable pose/distance so
tests can trigger orbit events and verify the scene re-fits.
