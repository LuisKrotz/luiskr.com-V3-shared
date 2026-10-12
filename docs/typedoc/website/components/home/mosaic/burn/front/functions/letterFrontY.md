[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/front](../README.md) / letterFrontY

```ts
function letterFrontY(s, L, x, progress, jagAmp): number
```

Defined in: website/components/home/mosaic/burn/front.ts:47

Per-column burn front inside one letter — the paper-space y of the
live edge at column x. The front climbs BOTTOM→TOP through the
letter's own ink extent (y1 → y0), so a descender's stem burns up from
the baseline, not from the paper's bottom edge.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session (its clock animates the edge noise).

### L

[`LetterBurn`](../../types/interfaces/LetterBurn.md)

The letter whose front is sampled.

### x

`number`

Paper-space column inside the letter (device px).

### progress

`number`

Global burn stage 0..1.

### jagAmp

`number`

Jagged-edge amplitude in device px.

## Returns

`number`
