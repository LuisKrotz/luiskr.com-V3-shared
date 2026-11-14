[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/loaders/page-backdrop/loop](../README.md) / start

```ts
function start(host): void
```

Defined in: core/utils/canvas/loaders/page-backdrop/loop.ts:24

Begins rendering: samples the palette (an unparseable surface colour
falls back to CSS), sizes the buffer, stamps the document marker that
pins the CSS glow layers to `none`, and either starts the pooled loop
or — under reduced motion — draws one static dithered frame.
High contrast keeps the flat surface: nothing starts while it is on.

## Parameters

### host

[`PageBackdropWebGL`](../../../page-backdrop-webgl/classes/PageBackdropWebGL.md)

the backdrop instance to start

## Returns

`void`
