[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/motion/gpu](../README.md) / WEBGL\_POOL\_OBSERVER

```ts
const WEBGL_POOL_OBSERVER: Readonly<{
  THRESHOLD: 0.01;
}>;
```

Defined in: core/tokens/motion/gpu.ts:50

WebGL-pool visibility observer tuning — a 1% intersection suffices to
count a canvas as visible (any pixel restores it; the rootMargin
pre-warms slightly before it scrolls in).
