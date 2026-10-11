[**luiskr.com**](../../../../../../../README.md)

***

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/loaders/skeleton/renderer](../README.md) / skeletonRenderer

```ts
const skeletonRenderer: SkeletonRenderer;
```

Defined in: core/utils/canvas/loaders/skeleton/renderer.ts:302

Shared renderer singleton — every skeleton layer borrows this one
context via acquire()/release() so the page never holds more than one
shimmer pipeline regardless of how many skeletons mount.
