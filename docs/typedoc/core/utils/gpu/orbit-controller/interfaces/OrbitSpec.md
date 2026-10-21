[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/orbit-controller](../README.md) / OrbitSpec

Defined in: core/utils/gpu/orbit-controller.ts:33

Gesture spec for `bindOrbit` — OrbitControls-faithful where feasible.

## Properties

### target?

```ts
optional target?: readonly [number, number, number];
```

Defined in: core/utils/gpu/orbit-controller.ts:35

World point the camera circles (default origin).

---

### distance?

```ts
optional distance?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:37

Eye→target distance (default 10).

---

### yaw?

```ts
optional yaw?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:39

Initial yaw about +Y, radians (default 0).

---

### pitch?

```ts
optional pitch?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:41

Initial pitch/elevation, radians (default 0).

---

### minDistance?

```ts
optional minDistance?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:43

Distance clamps (defaults 0.1 / 1e5).

---

### maxDistance?

```ts
optional maxDistance?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:44

---

### minPitch?

```ts
optional minPitch?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:46

Pitch clamps (defaults ±(π/2 − ε)).

---

### maxPitch?

```ts
optional maxPitch?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:47

---

### autoRotateSpeed?

```ts
optional autoRotateSpeed?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:49

Idle auto-rotation, radians per second (default 0 = off).

---

### damping?

```ts
optional damping?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:55

Damped-lerp factor per 60Hz slice (OrbitControls' dampingFactor
≈0.05–0.1). Internally converted to a frame-rate-independent
rate so 120/240Hz surfaces damp identically.

---

### rotateSpeed?

```ts
optional rotateSpeed?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:57

Radians per CSS px of drag (default ≈ full turn per 800px).

---

### zoomStep?

```ts
optional zoomStep?: number;
```

Defined in: core/utils/gpu/orbit-controller.ts:59

Distance multiplier per wheel deltaY unit (default 0.0015).

---

### enableZoom?

```ts
optional enableZoom?: boolean;
```

Defined in: core/utils/gpu/orbit-controller.ts:61

Wheel/pinch zoom toggle (default true).
