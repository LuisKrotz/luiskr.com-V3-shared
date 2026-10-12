[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/fx](../README.md) / coverRect

```ts
function coverRect(img, size, ox, oy): object
```

Defined in: website/components/home/about/glitch/fx.ts:66

Computes the cover-fit DESTINATION rect for the portrait at the given
canvas size — mirrors `object-fit: cover` AND the element's
`object-position`, read live from computed style so the canvas copy
always frames the portrait exactly the way the DOM <img> does.

The draw uses the whole-image form `drawImage(img, dx, dy, dw, dh)`
rather than a source crop on purpose: for srcset images selected via
`x` density descriptors, `naturalWidth`/`naturalHeight` report
DENSITY-CORRECTED units (intrinsic pixels ÷ descriptor) while
drawImage's source rect expects intrinsic pixels — a crop computed
from `naturalWidth` reads a fraction of the bitmap = the "zoomed
corner" bug at DPR ≠ 1. Destination-rect cover sidesteps the two
unit systems entirely: the browser maps the full image (any intrinsic
size) into the rect.

## Parameters

### img

`HTMLImageElement`

Decoded portrait element.

### size

`number`

Output square edge in canvas (device) px.

### ox

`number`

Canvas-space X origin of the square viewport.

### oy

`number`

Canvas-space Y origin of the square viewport.

## Returns

`object`

### dx

```ts
dx: number
```

### dy

```ts
dy: number
```

### dw

```ts
dw: number
```

### dh

```ts
dh: number
```
