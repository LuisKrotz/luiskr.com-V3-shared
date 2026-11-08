[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/data/footer-links](../README.md) / feedGlyph

```ts
function feedGlyph(iconClass, waveClass): SVGElement
```

Defined in: core/utils/data/footer-links.ts:70

Inline RSS glyph — decorative (`aria-hidden`, the anchor's visible text
carries the accessible name). Paints in currentColor so it inherits the
link ink in every theme; the arcs carry the wave class that pulses them
outward on hover/focus (reduced-motion aware in each consumer's SCSS).

## Parameters

### iconClass

`string`

class token for the <svg> element

### waveClass

`string`

class token applied to each broadcast-arc <path>

## Returns

`SVGElement`

the SVG element
