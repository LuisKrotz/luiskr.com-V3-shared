[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/scene3d](../README.md) / SCENE3D\_NONE

```ts
const SCENE3D_NONE: 4294967295 = 4294967295
```

Defined in: core/utils/gpu/scene3d.ts:30

`u32::MAX` — the wasm registry's sentinel for "none": attach a node
to the scene root (`parent`), or bind no texture to a material
(`tex`). One constant serves both slots since the Rust registry
types share the id space.
