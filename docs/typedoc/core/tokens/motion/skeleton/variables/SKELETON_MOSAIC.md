[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/motion/skeleton](../README.md) / SKELETON\_MOSAIC

```ts
const SKELETON_MOSAIC: Readonly<{
  MOSAIC_TILES: 12;
  MOSAIC_FEATURED: 6;
  MOSAIC_LCP_TILES: 2;
}>;
```

Defined in: core/tokens/motion/skeleton.ts:66

Frozen skeleton map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.
