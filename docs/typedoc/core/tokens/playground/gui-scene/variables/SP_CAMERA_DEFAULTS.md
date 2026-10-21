[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/playground/gui-scene](../README.md) / SP\_CAMERA\_DEFAULTS

```ts
const SP_CAMERA_DEFAULTS: Readonly<{
  FOV: 45
  POSITION: Readonly<{
    x: 21.856154240766372
    y: -3.6712368727086657
    z: 20.125738437375286
  }>
  TARGET: Readonly<{
    x: 0
    y: 0
    z: 0
  }>
  AUTO_ROTATE: false
  AUTO_ROTATE_SPEED: 0.05
  MIN_RADIUS_FACTOR: 1.016
  MAX_RADIUS_FACTOR: 10
}>
```

Defined in: core/tokens/playground/gui-scene.ts:85

Frozen sp camera map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.
