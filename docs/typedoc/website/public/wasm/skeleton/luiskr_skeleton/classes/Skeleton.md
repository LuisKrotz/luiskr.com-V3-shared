[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/skeleton/luiskr\_skeleton](../README.md) / Skeleton

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:8

Public wasm surface — one skeleton canvas per instance. A page may
mount several (hero + content areas shimmer independently).

## Constructors

### Constructor

```ts
new Skeleton(): Skeleton;
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:33

`Skeleton::new` — un-initialized surface; `init` must follow.
Split because the device request is an async browser promise.

#### Returns

`Skeleton`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:9

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:10

#### Returns

`void`

---

### frame()

```ts
frame(dt): void;
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:18

`frame` — one animation tick. Per-frame cost: one ~64 B uniform
write + one pass + one 3-vertex draw. The fragment loop early-
outs per rect — bounded and cheap.

#### Parameters

##### dt

`number`

Seconds since the previous `frame` call.

#### Returns

`void`

---

### init()

```ts
init(canvas, device): void;
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:28

`init` — acquire adapter/device, configure the canvas, compile
the pipeline, allocate the uniform + sheet buffers. Rejection
propagates to JS, which falls back to the WebGL/CSS skeleton.

#### Parameters

##### canvas

`HTMLCanvasElement`

The dedicated canvas this surface paints.

##### device

`GPUDevice`

The shared GPUDevice (one per page, from the JS bridge).

#### Returns

`void`

Ok on a configured surface, Err(JsValue) on failure.

---

### resize()

```ts
resize(w, h): void;
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:42

`resize` — re-configure the surface after a canvas-bitmap
change + store the DEVICE-pixel size as the shader's `rect`
(the whole-canvas clip, in `frag`'s device units).

#### Parameters

##### w

`number`

Device-pixel width (element CSS px × DPR).

##### h

`number`

Device-pixel height.

#### Returns

`void`

---

### set\_size()

```ts
set_size(w, h): void;
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:51

`set_size` — the canvas's CSS-pixel size. Feeds the shader's
`res` field (the widget rect IS the whole canvas — device-px
`rect` is written by `resize` instead).

#### Parameters

##### w

`number`

Canvas width in CSS pixels.

##### h

`number`

Canvas height in CSS pixels.

#### Returns

`void`

---

### set\_state()

```ts
set_state(
   resolve,
   ink_alpha,
   count
): void;
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:60

`set_state` — scalar updates bundled to keep the JS call count
low: resolve progress, ink alpha, live rect count.

#### Parameters

##### resolve

`number`

0..1 resolve progress (collapse+fade driver).

##### ink\_alpha

`number`

Global glyph opacity multiplier.

##### count

`number`

Live rect count, clamped to MAX_RECTS.

#### Returns

`void`

---

### write\_sheet()

```ts
write_sheet(values): void;
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:69

`write_sheet` — upload the per-rect data block: 16 f32s per
rect — [x,y,w,h][radius,cell,row_h,unused][sbase rgb,unused]
[sink rgb,unused]. Truncated at MAX_RECTS rows; `count` (set
via `set_state`) decides how many rows the GPU reads.

#### Parameters

##### values

`Float32Array`

Flat f32 sheet — 16 values per rect row.

#### Returns

`void`
