[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/home/mosaic/pack](../README.md) / packMosaicSkeleton

```ts
function packMosaicSkeleton(vw): object;
```

Defined in: website/components/home/mosaic/pack.ts:214

Skeleton variant: packs placeholder tiles (no items needed — featured
count + aspect cycle come from SKELETON/LAYOUT tokens) so the loading
wall matches the real geometry.

## Parameters

### vw

`number`

Viewport width.

## Returns

`object`

— empty boxes on degenerate grids.

### boxes

```ts
boxes: SkeletonBox[];
```

### height

```ts
height: number;
```
