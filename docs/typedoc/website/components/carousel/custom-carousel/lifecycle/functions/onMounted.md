[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/lifecycle](../README.md) / onMounted

```ts
function onMounted(host): void;
```

Defined in: website/components/carousel/custom-carousel/lifecycle.ts:18

Mount: first render pass, resize binding, fit observer, store sub.
`_markAdjacentLoaded(0)` pre-flags the first neighborhood before the
observer's first callback so slide media starts loading immediately.

## Parameters

### host

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

## Returns

`void`
