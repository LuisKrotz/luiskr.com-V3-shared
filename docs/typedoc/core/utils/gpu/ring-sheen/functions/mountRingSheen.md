[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/ring-sheen](../README.md) / mountRingSheen

```ts
function mountRingSheen(container, tilesSelector, canvasClass): RingSheenSession | null
```

Defined in: core/utils/gpu/ring-sheen.ts:84

`mountRingSheen` — overlays one instanced ring canvas on a tile
container. Returns null when the surface can't mount (no GPU, no
IntersectionObserver, reduced motion) — the CSS rings stay.

## Parameters

### container

`HTMLElement`

The positioned ancestor the canvas fills
(`.home-mosaic` / `.related-mosaic`).

### tilesSelector

`string`

Class selector for the ringed tiles.

### canvasClass

`string`

Overlay canvas class (the `:has()` gate keys on it).

## Returns

[`RingSheenSession`](../interfaces/RingSheenSession.md) \| `null`

A session handle, or null when nothing was mounted.
