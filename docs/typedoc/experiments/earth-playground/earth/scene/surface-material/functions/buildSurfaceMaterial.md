[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/scene/surface-material](../README.md) / buildSurfaceMaterial

```ts
function buildSurfaceMaterial(__namedParameters): SurfaceMaterialResult;
```

Defined in: experiments/earth-playground/earth/scene/surface-material.ts:68

Builds the Earth's surface material — all TSL so the same node graph
compiles to WGSL (WebGPU) or GLSL (WebGL fallback):
  albedo × cloud-shadow × twilight-tint × terrain-self-shadow ×
  eclipse-dim, specular-masked PBR, sun-faded bump, night-lights +
  dark-side ambient emissive.

## Parameters

### \_\_namedParameters

[`SurfaceMaterialArgs`](../interfaces/SurfaceMaterialArgs.md)

## Returns

[`SurfaceMaterialResult`](../interfaces/SurfaceMaterialResult.md)
