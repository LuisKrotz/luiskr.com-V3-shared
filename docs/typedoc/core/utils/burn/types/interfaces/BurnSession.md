[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/types](../README.md) / BurnSession

Defined in: core/utils/burn/types.ts:59

A live combustion session, keyed by card element in `_sessions`.

## Properties

### cls

```ts
cls: BurnClasses
```

Defined in: core/utils/burn/types.ts:61

The host component's class map — teardown + child mounts read it.

---

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: core/utils/burn/types.ts:63

Overlay canvas absolutely positioned over the title box.

---

### ctx

```ts
ctx: CanvasRenderingContext2D
```

Defined in: core/utils/burn/types.ts:64

---

### gpuCanvas?

```ts
optional gpuCanvas?: HTMLCanvasElement;
```

Defined in: core/utils/burn/types.ts:71

Optional WebGPU particle canvas — mounted over `canvas` when the
per-widget wasm burn artifact loads; the paper raster stays 2D
(canvas contexts are mutually exclusive per element), particles
move to the GPU canvas.

---

### wasm?

```ts
optional wasm?:
  | WidgetHandle
  | null;
```

Defined in: core/utils/burn/types.ts:77

Live WebGPU wasm handle — the particle sim+renderer runs in the
artifact (begin/set_letters/set_ink/set_colors/set_dir/set_stage/
frame); unset on failure or before the mount resolves.

---

### wasmPending?

```ts
optional wasmPending?: boolean;
```

Defined in: core/utils/burn/types.ts:79

In-flight mount — teardown must not double-resolve.

---

### wasmFailed?

```ts
optional wasmFailed?: boolean;
```

Defined in: core/utils/burn/types.ts:81

Latch — a failed wasm mount never retries this session.

---

### paper

```ts
paper: HTMLCanvasElement
```

Defined in: core/utils/burn/types.ts:83

Pre-rasterized "paper" — the title text as a drawable image.

---

### w

```ts
w: number
```

Defined in: core/utils/burn/types.ts:85

Canvas box in device px.

---

### h

```ts
h: number
```

Defined in: core/utils/burn/types.ts:86

---

### dpr

```ts
dpr: number
```

Defined in: core/utils/burn/types.ts:94

Device-pixel ratio the raster was laid out at (capped by _DPR_CAP).
Particle sizes are authored in device px but must read as a fixed
CSS-px size on screen — drawParticles multiplies by this so an
ember is ~2 CSS px on a dpr-1 desktop AND a dpr-3 phone instead of
shrinking to an invisible sub-pixel speck on high-density screens.

---

### paperX

```ts
paperX: number
```

Defined in: core/utils/burn/types.ts:96

Paper (title box) offset inside the canvas — the pad bleeds embers.

---

### paperY

```ts
paperY: number
```

Defined in: core/utils/burn/types.ts:97

---

### paperW

```ts
paperW: number
```

Defined in: core/utils/burn/types.ts:98

---

### paperH

```ts
paperH: number
```

Defined in: core/utils/burn/types.ts:99

---

### t

```ts
t: number
```

Defined in: core/utils/burn/types.ts:101

Seconds elapsed — noise/particle clock (forward progress derives from it).

---

### dur

```ts
dur: number
```

Defined in: core/utils/burn/types.ts:102

---

### prog

```ts
prog: number
```

Defined in: core/utils/burn/types.ts:109

Burn progress 0..1 while rebuilding — captured from the forward clock
at disarm, then counted down; burnPaper re-derives the raster from
the pristine paper every frame, so shrinking progress un-erases the
glyphs (a true time-reverse of the consume front).

---

### dir

```ts
dir: number
```

Defined in: core/utils/burn/types.ts:111

Direction: 1 combusts forward, −1 un-burns back to whole text.

---

### onBurned

```ts
onBurned: (() => void) | null;
```

Defined in: core/utils/burn/types.ts:120

Fired once when the forward pass consumes the title (the ITEM_BURNED
publish) — hosts stage their next beat off it (card-stack starts the
description writer only then, so the rewrite follows the burn-out).
Also fires on hosts WITHOUT ITEM_BURNED at consume-complete — the
burn-out-only path still owes its host the beat; the callback
self-clears after firing so settle frames never re-fire it.

---

### lastT

```ts
lastT: number
```

Defined in: core/utils/burn/types.ts:121

---

### raf

```ts
raf: number
```

Defined in: core/utils/burn/types.ts:122

---

### active

```ts
active: boolean
```

Defined in: core/utils/burn/types.ts:123

---

### cardEl

```ts
cardEl: Element
```

Defined in: core/utils/burn/types.ts:125

Owning card — teardown restores its classes and removes the slot.

---

### particles

```ts
particles: BurnParticle[];
```

Defined in: core/utils/burn/types.ts:127

Live particles (embers + char flecks).

---

### letters

```ts
letters: LetterBurn[];
```

Defined in: core/utils/burn/types.ts:135

Per-glyph burn units — detected as ink column-runs in the rasterized
paper (a space's gap splits runs, so each bucket IS a letter, not a
fixed grid slice). Each letter owns an ignition delay + burn speed:
fast letters fully char and dissolve while slow neighbours still
stand untouched — the effect consumes the text letter by letter.

---

### colLetter

```ts
colLetter: Int16Array
```

Defined in: core/utils/burn/types.ts:137

Paper-x → owning letter index (nearest letter for gap columns).

---

### colInk

```ts
colInk: Uint8Array
```

Defined in: core/utils/burn/types.ts:139

Paper-x → ink coverage flag (0/1) — embers only spawn on glyph ink.

---

### work

```ts
work: HTMLCanvasElement
```

Defined in: core/utils/burn/types.ts:145

Working raster — every frame rebuilds the burned text here (paper →
char-darken → erode), then blits into the display canvas so the
compositing never collides with particles.

---

### workCtx

```ts
workCtx: CanvasRenderingContext2D
```

Defined in: core/utils/burn/types.ts:146

---

### titleEl

```ts
titleEl: HTMLElement
```

Defined in: core/utils/burn/types.ts:157

Live DOM nodes — measured in layout space at arm time, then only
for the knit font signature (dir −1 re-rasters while the expand
ease still settles letterforms). The canvas anchors once: hosts
reflow around the burn (dealt-pile heights, typing-grown fronts)
and a chasing anchor reads as the title sliding — the DOM ink is
hidden anyway, so the raster stays where the glyphs caught fire.
`ITEM_BURNED` hosts opt out of the freeze — their CSS relocates
the title box at the consume beat and the canvas follows.

---

### overlayEl

```ts
overlayEl: HTMLElement
```

Defined in: core/utils/burn/types.ts:158

---

### ink

```ts
ink: BurnInk
```

Defined in: core/utils/burn/types.ts:160

Theme-resolved inks — read once from the CSS burn palette.

---

### inkColor

```ts
inkColor: string
```

Defined in: core/utils/burn/types.ts:167

The title's resolved ink color captured BEFORE the DOM glyphs hide —
the `burning` class sets `color: transparent`, so any re-raster after
the handoff would otherwise paint invisible text (the "whole word
vanishes" bug).

---

### lastBox

```ts
lastBox: string
```

Defined in: core/utils/burn/types.ts:169

Arm-time title-box signature — set once; a truthy value freezes the raster.

---

### lastPos

```ts
lastPos: string
```

Defined in: core/utils/burn/types.ts:171

Last tracked canvas-space position — position-only drift detector.

---

### lastFont

```ts
lastFont: string
```

Defined in: core/utils/burn/types.ts:180

Computed-font signature of the current raster — knit sessions
(dir −1) compare it every frame: the card's expand/`--fw-lift` font
eases still run for ~0.42s after the arm, so a frozen arm-time
raster would knit stale letterforms that pop back to the live DOM
ink at teardown (the "chunks when font style changes" bug). Burn-out
sessions never re-check — their frozen raster is intentional.
