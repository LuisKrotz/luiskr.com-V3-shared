[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/shared](../README.md) / texCanvas

```ts
function texCanvas(
  w,
  h
): {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
} | null
```

Defined in: experiments/star-field/engine/bodies/procedural/shared.ts:78

Creates a canvas + 2d context for texture generation, or null when
the environment has no 2d (headless probes, blocked canvas) — every
caller keeps its previous fallback in that case.

## Parameters

### w

`number`

Canvas width px.

### h

`number`

Canvas height px.

## Returns

\| \{
`canvas`: `HTMLCanvasElement`;
`ctx`: `CanvasRenderingContext2D`;
\}
\| `null`
