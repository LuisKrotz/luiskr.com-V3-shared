[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/shared](../README.md) / armed

```ts
const armed: object
```

Defined in: experiments/star-field/engine/frame/shared.ts:31

Mutable per-module state shared across the frame/ submodules:
vec3 — armed Vector3 ctor (null until `armFrame` runs).
scratch — reused world-position vector (zero per-frame alloc).
ice/warm — pre-built glaciation tint ramp for `cycle` bodies.

## Type Declaration

### vec3

```ts
vec3: Vec3Ctor | null
```

### scratch

```ts
scratch:
  | {
  x: number;
  y: number;
  z: number;
}
  | null;
```

### ice

```ts
ice: unknown
```

### warm

```ts
warm: unknown
```
