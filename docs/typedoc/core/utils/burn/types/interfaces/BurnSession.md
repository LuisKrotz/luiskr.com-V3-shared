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

### paperX

```ts
paperX: number
```

Defined in: core/utils/burn/types.ts:88

Paper (title box) offset inside the canvas — the pad bleeds embers.

---

### paperY

```ts
paperY: number
```

Defined in: core/utils/burn/types.ts:89

---

### paperW

```ts
paperW: number
```

Defined in: core/utils/burn/types.ts:90

---

### paperH

```ts
paperH: number
```

Defined in: core/utils/burn/types.ts:91

---

### t

```ts
t: number
```

Defined in: core/utils/burn/types.ts:93

Seconds elapsed — noise/particle clock (forward progress derives from it).

---

### dur

```ts
dur: number
```

Defined in: core/utils/burn/types.ts:94

---

### prog

```ts
prog: number
```

Defined in: core/utils/burn/types.ts:101

Burn progress 0..1 while rebuilding — captured from the forward clock
at disarm, then counted down; burnPaper re-derives the raster from
the pristine paper every frame, so shrinking progress un-erases the
glyphs (a true time-reverse of the consume front).

---

### dir

```ts
dir: number
```

Defined in: core/utils/burn/types.ts:103

Direction: 1 combusts forward, −1 un-burns back to whole text.

---

### onBurned

```ts
onBurned: (() => void) | null;
```

Defined in: core/utils/burn/types.ts:112

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

Defined in: core/utils/burn/types.ts:113

---

### raf

```ts
raf: number
```

Defined in: core/utils/burn/types.ts:114

---

### active

```ts
active: boolean
```

Defined in: core/utils/burn/types.ts:115

---

### cardEl

```ts
cardEl: Element
```

Defined in: core/utils/burn/types.ts:117

Owning card — teardown restores its classes and removes the slot.

---

### particles

```ts
particles: BurnParticle[];
```

Defined in: core/utils/burn/types.ts:119

Live particles (embers + char flecks).

---

### letters

```ts
letters: LetterBurn[];
```

Defined in: core/utils/burn/types.ts:127

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

Defined in: core/utils/burn/types.ts:129

Paper-x → owning letter index (nearest letter for gap columns).

---

### colInk

```ts
colInk: Uint8Array
```

Defined in: core/utils/burn/types.ts:131

Paper-x → ink coverage flag (0/1) — embers only spawn on glyph ink.

---

### work

```ts
work: HTMLCanvasElement
```

Defined in: core/utils/burn/types.ts:137

Working raster — every frame rebuilds the burned text here (paper →
char-darken → erode), then blits into the display canvas so the
compositing never collides with particles.

---

### workCtx

```ts
workCtx: CanvasRenderingContext2D
```

Defined in: core/utils/burn/types.ts:138

---

### titleEl

```ts
titleEl: HTMLElement
```

Defined in: core/utils/burn/types.ts:147

Live DOM nodes — re-measured every frame. The card's expand ease
animates the h2's `cqw` font-size and flex-end position for ~0.42s;
rasterizing once at arm time froze a mid-transition font into the
paper, which rendered as "the effect changed the font size". The
paper re-rasterizes whenever the DOM box moves so the burning copy
is always pixel-identical to what the DOM would show.

---

### overlayEl

```ts
overlayEl: HTMLElement
```

Defined in: core/utils/burn/types.ts:148

---

### ink

```ts
ink: BurnInk
```

Defined in: core/utils/burn/types.ts:150

Theme-resolved inks — read once from the CSS burn palette.

---

### inkColor

```ts
inkColor: string
```

Defined in: core/utils/burn/types.ts:157

The title's resolved ink color captured BEFORE the DOM glyphs hide —
the `burning` class sets `color: transparent`, so any re-raster after
the handoff would otherwise paint invisible text (the "whole word
vanishes" bug).

---

### lastBox

```ts
lastBox: string
```

Defined in: core/utils/burn/types.ts:159

Arm-time title-box signature — set once; a truthy value freezes the raster.

---

### lastPos

```ts
lastPos: string
```

Defined in: core/utils/burn/types.ts:161

Last tracked canvas-space position — position-only drift detector.

---

### lastFont

```ts
lastFont: string
```

Defined in: core/utils/burn/types.ts:170

Computed-font signature of the current raster — knit sessions
(dir −1) compare it every frame: the card's expand/`--fw-lift` font
eases still run for ~0.42s after the arm, so a frozen arm-time
raster would knit stale letterforms that pop back to the live DOM
ink at teardown (the "chunks when font style changes" bug). Burn-out
sessions never re-check — their frozen raster is intentional.
