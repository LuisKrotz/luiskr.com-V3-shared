[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/paper](../README.md) / analyzePaper

```ts
function analyzePaper(s): void
```

Defined in: website/components/home/mosaic/burn/paper.ts:228

Reads the rasterized paper's alpha channel to locate each glyph:
columns that carry ink form runs — a space leaves a transparent gap,
so each contiguous run IS one letter (kerned pairs may fuse, which
just makes them burn as a unit). Builds:

- `colInk`: 1 where a paper-x column has any glyph pixel — ember
  spawning and the char band use it so nothing glows in the spaces.
- `letters`: per-run ink bounds (x0..x1, y0..y1) plus a random burn
  speed and ignition delay. Speeds spread 0.55..1.45×, delays up to
  22% of total progress — letters catch at different moments and
  burn at different paces.
- `colLetter`: paper-x → owning letter index; gap columns bind to
  the nearest run so the erase polygon stays coherent across spaces.

Finally every letter's speed is normalized so the SLOWEST ignitor
finishes at ~98% progress — the burn ends with the description's
typing, never after.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session — fills letters/colInk/colLetter + work size.

## Returns

`void`
