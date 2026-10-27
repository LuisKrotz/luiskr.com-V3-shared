[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / clipEdge

```ts
function clipEdge(a, b, rA, rB): Float32Array<ArrayBufferLike> | null
```

Defined in: experiments/docs/arch-scene.ts:805

Trims an edge so it stops clear of BOTH glyph faces it connects —
the reference's links aim at node surfaces, not centers. Each end
pulls back by that node's glyph bound plus SCENE_EDGE_GAP along the
edge direction; when nothing is left between the trimmed points the
edge would draw inside a glyph, so null is returned and the caller
drops the segment (degenerate over-close pairs only — relaxed
layouts keep every edge longer than the two radii).

## Parameters

### a

readonly \[`number`, `number`, `number`\]

Child endpoint xyz.

### b

readonly \[`number`, `number`, `number`\]

Parent endpoint xyz.

### rA

`number`

Child glyph radius (glyphBound·scale).

### rB

`number`

Parent glyph radius.

## Returns

`Float32Array`\<`ArrayBufferLike`\> \| `null`

Six clipped coords, or null when fully covered.
