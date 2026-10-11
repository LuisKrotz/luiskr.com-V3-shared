[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/home/about/glitch](../README.md) / GlitchSession

Defined in: website/components/home/about/glitch.ts:109

Live glitch session parked on `host._glitch`.

## Properties

### canvas

```ts
canvas: HTMLCanvasElement;
```

Defined in: website/components/home/about/glitch.ts:111

Overlay canvas inside the picture wrapper.

***

### ctx

```ts
ctx: CanvasRenderingContext2D;
```

Defined in: website/components/home/about/glitch.ts:112

***

### w

```ts
w: number;
```

Defined in: website/components/home/about/glitch.ts:114

Canvas size in device px.

***

### h

```ts
h: number;
```

Defined in: website/components/home/about/glitch.ts:115

***

### dx

```ts
dx: number;
```

Defined in: website/components/home/about/glitch.ts:117

Cover-fit destination rect of the portrait (device px).

***

### dy

```ts
dy: number;
```

Defined in: website/components/home/about/glitch.ts:118

***

### dw

```ts
dw: number;
```

Defined in: website/components/home/about/glitch.ts:119

***

### dh

```ts
dh: number;
```

Defined in: website/components/home/about/glitch.ts:120

***

### img

```ts
img: HTMLImageElement;
```

Defined in: website/components/home/about/glitch.ts:122

Live image element — re-resolved after shadow re-renders.

***

### srcW

```ts
srcW: number;
```

Defined in: website/components/home/about/glitch.ts:127

Natural size the cover rect was computed against — a srcset
 candidate swap changes naturalWidth while `complete` stays true,
 silently invalidating dx/dy/dw/dh (the stale rect then scales a
 wrong-aspect portrait = the "zoomed portrait" bug).

***

### srcH

```ts
srcH: number;
```

Defined in: website/components/home/about/glitch.ts:128

***

### red

```ts
red: HTMLCanvasElement;
```

Defined in: website/components/home/about/glitch.ts:130

Precomputed red / cyan channel canvases for the RGB split.

***

### cyan

```ts
cyan: HTMLCanvasElement;
```

Defined in: website/components/home/about/glitch.ts:131

***

### scan

```ts
scan: HTMLCanvasElement;
```

Defined in: website/components/home/about/glitch.ts:133

Scanline tile canvas (1×_SCAN_PERIOD) used as a repeat pattern.

***

### t

```ts
t: number;
```

Defined in: website/components/home/about/glitch.ts:135

Elapsed seconds — drives the rolling bar.

***

### lastT

```ts
lastT: number;
```

Defined in: website/components/home/about/glitch.ts:136

***

### raf

```ts
raf: number;
```

Defined in: website/components/home/about/glitch.ts:138

Pending rAF handle.

***

### active

```ts
active: boolean;
```

Defined in: website/components/home/about/glitch.ts:140

True while the loop should keep running.

***

### hover

```ts
hover: boolean;
```

Defined in: website/components/home/about/glitch.ts:142

Intensity — idle ambient or full VHS under hover.

***

### tick

```ts
tick: number;
```

Defined in: website/components/home/about/glitch.ts:144

Frame counter — paces un-armed retry polls.

***

### ro

```ts
ro: ResizeObserver | null;
```

Defined in: website/components/home/about/glitch.ts:148

Wrapper ResizeObserver — the CSS canvas is width:100%, so any post-arm
 layout change (resize, grid reflow, mosaic expand above) would stretch
 the stale device-px raster into a zoomed/cropped portrait without it.
