[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_LOD

```ts
const SF_LOD: Readonly<{
  PAD: 40;
  SCALE: 12;
  DEEP_REVEAL: 620;
}>;
```

Defined in: core/tokens/starfield/params.ts:301

Detail level-of-detail — secondary geometry (atmosphere shells, ring
discs, satellite companions) renders only while the
camera is within `PAD + size * SCALE` of the body's anchor, so distant
bodies draw as a single primitive like a streaming game world.
