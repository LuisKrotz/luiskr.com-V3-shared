[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/types](../README.md) / GlitchSession

Defined in: website/components/home/about/glitch/types.ts:85

Live glitch session parked on `host._glitch`.

## Properties

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: website/components/home/about/glitch/types.ts:87

Overlay canvas inside the picture wrapper.

---

### ctx

```ts
ctx: CanvasRenderingContext2D | null
```

Defined in: website/components/home/about/glitch/types.ts:90

2D backend context — null while the WebGPU arm mounts and forever
after it succeeds; the rust/glitch shader replaces every painter.

---

### w

```ts
w: number
```

Defined in: website/components/home/about/glitch/types.ts:92

Canvas size in device px.

---

### h

```ts
h: number
```

Defined in: website/components/home/about/glitch/types.ts:93

---

### dx

```ts
dx: number
```

Defined in: website/components/home/about/glitch/types.ts:95

Cover-fit destination rect of the portrait (device px).

---

### dy

```ts
dy: number
```

Defined in: website/components/home/about/glitch/types.ts:96

---

### dw

```ts
dw: number
```

Defined in: website/components/home/about/glitch/types.ts:97

---

### dh

```ts
dh: number
```

Defined in: website/components/home/about/glitch/types.ts:98

---

### img

```ts
img: HTMLImageElement
```

Defined in: website/components/home/about/glitch/types.ts:100

Live image element — re-resolved after shadow re-renders.

---

### srcW

```ts
srcW: number
```

Defined in: website/components/home/about/glitch/types.ts:105

Natural size the cover rect was computed against — a srcset
candidate swap changes naturalWidth while `complete` stays true,
silently invalidating dx/dy/dw/dh (the stale rect then scales a
wrong-aspect portrait = the "zoomed portrait" bug).

---

### srcH

```ts
srcH: number
```

Defined in: website/components/home/about/glitch/types.ts:106

---

### red

```ts
red: HTMLCanvasElement
```

Defined in: website/components/home/about/glitch/types.ts:108

Precomputed red / cyan channel canvases for the RGB split.

---

### cyan

```ts
cyan: HTMLCanvasElement
```

Defined in: website/components/home/about/glitch/types.ts:109

---

### scan

```ts
scan: HTMLCanvasElement
```

Defined in: website/components/home/about/glitch/types.ts:111

Scanline tile canvas (1×_SCAN_PERIOD) used as a repeat pattern.

---

### t

```ts
t: number
```

Defined in: website/components/home/about/glitch/types.ts:113

Elapsed seconds — drives the rolling bar.

---

### lastT

```ts
lastT: number
```

Defined in: website/components/home/about/glitch/types.ts:114

---

### raf

```ts
raf: number
```

Defined in: website/components/home/about/glitch/types.ts:116

Pending rAF handle.

---

### active

```ts
active: boolean
```

Defined in: website/components/home/about/glitch/types.ts:118

True while the loop should keep running.

---

### hover

```ts
hover: boolean
```

Defined in: website/components/home/about/glitch/types.ts:120

Intensity — idle ambient or full VHS under hover.

---

### tick

```ts
tick: number
```

Defined in: website/components/home/about/glitch/types.ts:122

Frame counter — paces un-armed retry polls.

---

### ro

```ts
ro: ResizeObserver | null
```

Defined in: website/components/home/about/glitch/types.ts:126

Wrapper ResizeObserver — the CSS canvas is width:100%, so any post-arm
layout change (resize, grid reflow, mosaic expand above) would stretch
the stale device-px raster into a zoomed/cropped portrait without it.

---

### wasm

```ts
wasm:
  | WidgetHandle
  | null;
```

Defined in: website/components/home/about/glitch/types.ts:129

Live rust/glitch widget — the WebGPU render backend. Null while the
mount is in flight or after it fails (the 2D painters run instead).
