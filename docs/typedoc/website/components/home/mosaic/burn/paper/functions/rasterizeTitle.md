[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/paper](../README.md) / rasterizeTitle

```ts
function rasterizeTitle(title, paper, cssW, cssH, ink): void
```

Defined in: website/components/home/mosaic/burn/paper.ts:132

Rasterizes the h2 text into the paper canvas. Words are drawn at their
DOM Range fragment positions (see titleWordBoxes), so the raster
is pixel-faithful to the rendered title — same wraps, same spacing.
Engines without Range fall back to a measured word-pack matching the
DOM box, drawn bottom-anchored like the overlay's `align-items:
flex-end`.

`cssW`/`cssH` are the title box in CSS px while the paper's backing
store is device px (cssW × dpr): canvas font and measureText units are
CSS px, so the context is scaled cssW→paper.width first — without the
transform the glyphs land at 1/dpr size on hidpi/fractional displays
(the "burn text renders smaller than the title" bug).

## Parameters

### title

`HTMLElement`

The h2 element whose glyphs are re-rendered.

### paper

`HTMLCanvasElement`

Offscreen canvas sized in device px.

### cssW

`number`

Title box width in CSS px.

### cssH

`number`

Title box height in CSS px.

### ink

`string`

Pre-capture resolved ink color.

## Returns

`void`
