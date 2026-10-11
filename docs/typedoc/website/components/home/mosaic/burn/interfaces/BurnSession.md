[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/home/mosaic/burn](../README.md) / BurnSession

Defined in: website/components/home/mosaic/burn.ts:129

A live combustion session, keyed by card element in `_sessions`.

## Properties

### canvas

```ts
canvas: HTMLCanvasElement;
```

Defined in: website/components/home/mosaic/burn.ts:131

Overlay canvas absolutely positioned over the title box.

***

### ctx

```ts
ctx: CanvasRenderingContext2D;
```

Defined in: website/components/home/mosaic/burn.ts:132

***

### paper

```ts
paper: HTMLCanvasElement;
```

Defined in: website/components/home/mosaic/burn.ts:134

Pre-rasterized "paper" — the title text as a drawable image.

***

### w

```ts
w: number;
```

Defined in: website/components/home/mosaic/burn.ts:136

Canvas box in device px.

***

### h

```ts
h: number;
```

Defined in: website/components/home/mosaic/burn.ts:137

***

### paperX

```ts
paperX: number;
```

Defined in: website/components/home/mosaic/burn.ts:139

Paper (title box) offset inside the canvas — the pad bleeds embers.

***

### paperY

```ts
paperY: number;
```

Defined in: website/components/home/mosaic/burn.ts:140

***

### paperW

```ts
paperW: number;
```

Defined in: website/components/home/mosaic/burn.ts:141

***

### paperH

```ts
paperH: number;
```

Defined in: website/components/home/mosaic/burn.ts:142

***

### t

```ts
t: number;
```

Defined in: website/components/home/mosaic/burn.ts:144

Seconds elapsed / total burn duration.

***

### dur

```ts
dur: number;
```

Defined in: website/components/home/mosaic/burn.ts:145

***

### lastT

```ts
lastT: number;
```

Defined in: website/components/home/mosaic/burn.ts:146

***

### raf

```ts
raf: number;
```

Defined in: website/components/home/mosaic/burn.ts:147

***

### active

```ts
active: boolean;
```

Defined in: website/components/home/mosaic/burn.ts:148

***

### particles

```ts
particles: BurnParticle[];
```

Defined in: website/components/home/mosaic/burn.ts:150

Live particles (embers + char flecks).

***

### letters

```ts
letters: LetterBurn[];
```

Defined in: website/components/home/mosaic/burn.ts:158

Per-glyph burn units — detected as ink column-runs in the rasterized
paper (a space's gap splits runs, so each bucket IS a letter, not a
fixed grid slice). Each letter owns an ignition delay + burn speed:
fast letters fully char and dissolve while slow neighbours still
stand untouched — the effect consumes the text letter by letter.

***

### colLetter

```ts
colLetter: Int16Array;
```

Defined in: website/components/home/mosaic/burn.ts:160

Paper-x → owning letter index (nearest letter for gap columns).

***

### colInk

```ts
colInk: Uint8Array;
```

Defined in: website/components/home/mosaic/burn.ts:162

Paper-x → ink coverage flag (0/1) — embers only spawn on glyph ink.

***

### work

```ts
work: HTMLCanvasElement;
```

Defined in: website/components/home/mosaic/burn.ts:168

Working raster — every frame rebuilds the burned text here (paper →
char-darken → erode), then blits into the display canvas so the
compositing never collides with particles.

***

### workCtx

```ts
workCtx: CanvasRenderingContext2D;
```

Defined in: website/components/home/mosaic/burn.ts:169

***

### titleEl

```ts
titleEl: HTMLElement;
```

Defined in: website/components/home/mosaic/burn.ts:178

Live DOM nodes — re-measured every frame. The card's expand ease
animates the h2's `cqw` font-size and flex-end position for ~0.42s;
rasterizing once at arm time froze a mid-transition font into the
paper, which rendered as "the effect changed the font size". The
paper re-rasterizes whenever the DOM box moves so the burning copy
is always pixel-identical to what the DOM would show.

***

### overlayEl

```ts
overlayEl: HTMLElement;
```

Defined in: website/components/home/mosaic/burn.ts:179

***

### ink

```ts
ink: BurnInk;
```

Defined in: website/components/home/mosaic/burn.ts:181

Theme-resolved inks — read once from the CSS burn palette.

***

### inkColor

```ts
inkColor: string;
```

Defined in: website/components/home/mosaic/burn.ts:188

The title's resolved ink color captured BEFORE the DOM glyphs hide —
the `burning` class sets `color: transparent`, so any re-raster after
the handoff would otherwise paint invisible text (the "whole word
vanishes" bug).

***

### lastBox

```ts
lastBox: string;
```

Defined in: website/components/home/mosaic/burn.ts:190

Arm-time title-box signature — set once; a truthy value freezes the raster.

***

### lastPos

```ts
lastPos: string;
```

Defined in: website/components/home/mosaic/burn.ts:192

Last tracked canvas-space position — position-only drift detector.
