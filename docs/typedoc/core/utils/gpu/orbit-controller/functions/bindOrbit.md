[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/orbit-controller](../README.md) / bindOrbit

```ts
function bindOrbit(canvas, spec?): OrbitController
```

Defined in: core/utils/gpu/orbit-controller.ts:108

Binds pointer/wheel input on `canvas` to a damped orbit rig. The rig
never touches the camera itself — consumers read the pose fields
after `update(dt)` and push them into the engine (`set_orbit`) or a
three camera (the math is backend-agnostic by design).

## Parameters

### canvas

`HTMLCanvasElement`

The scene's input surface.

### spec?

[`OrbitSpec`](../interfaces/OrbitSpec.md) = `{}`

Gesture + clamp options.

## Returns

[`OrbitController`](../interfaces/OrbitController.md)
