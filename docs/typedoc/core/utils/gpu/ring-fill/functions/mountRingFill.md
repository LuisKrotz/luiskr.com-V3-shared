[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/ring-fill](../README.md) / mountRingFill

```ts
function mountRingFill(container, tilesSelector, canvasClass): RingFillSession | null
```

Defined in: core/utils/gpu/ring-fill.ts:89

`mountRingFill` — overlays one instanced ring canvas on the results
list. Returns null when the surface can't mount (no GPU, no
IntersectionObserver, reduced motion) — the SVG rings stay.

## Parameters

### container

`HTMLElement`

The positioned ancestor the canvas fills
(`.route-search` results wrapper).

### tilesSelector

`string`

Class selector for the ringed go buttons.

### canvasClass

`string`

Overlay canvas class (the `:has()` gate keys on it).

## Returns

[`RingFillSession`](../interfaces/RingFillSession.md) \| `null`

A session handle, or null when nothing was mounted.
