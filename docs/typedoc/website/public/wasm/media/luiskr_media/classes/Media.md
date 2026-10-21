[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/media/luiskr\_media](../README.md) / Media

Defined in: website/public/wasm/media/luiskr\_media.d.ts:7

Public wasm surface — one media canvas per instance.

## Constructors

### Constructor

```ts
new Media(): Media;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:31

`Media::new` — un-initialized widget; `init` must follow.

#### Returns

`Media`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(_dt): void;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:18

`frame` — draw the current texture. No clock needed (static
until an upload lands); the bridge calls this on resize/scroll
or per rAF — drawing costs one 6-vertex call.

#### Parameters

##### \_dt

`number`

Seconds since last call (unused — media is static
between uploads; kept for API symmetry).

#### Returns

`void`

---

### init()

```ts
init(canvas, device): void;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:27

`init` — device + pipeline + sampler; the bind group builds on
the first upload.

#### Parameters

##### canvas

`HTMLCanvasElement`

The widget's dedicated canvas.

##### device

`GPUDevice`

The shared GPUDevice (one per page, from the JS bridge).

#### Returns

`void`

Ok on a live surface, Err(JsValue) on failure.

---

### push\_frame()

```ts
push_frame(
   frame,
   w,
   h
): void;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:41

`push_frame` — stream a WebCodecs `VideoFrame` into the texture.
Same GPU→GPU path as bitmaps — video frames upload per
requestVideoFrameCallback, NOT per rAF.

#### Parameters

##### frame

`VideoFrame`

The decoded frame.

##### w

`number`

Frame width px.

##### h

`number`

Frame height px.

#### Returns

`void`

---

### resize()

```ts
resize(_w, _h): void;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:50

`resize` — canvas-bitmap change → surface re-configure. The
projection is pure CSS px (`rect`/`viewport` — see State doc),
so no size state updates here.

#### Parameters

##### \_w

`number`

Device-pixel width (element-side; unused — see doc).

##### \_h

`number`

Device-pixel height.

#### Returns

`void`

---

### set\_size()

```ts
set_size(w, h): void;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:57

`set_size` — the canvas's CSS-pixel size (rect + viewport).

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

### set\_uv\_rect()

```ts
set_uv_rect(
   u,
   v,
   du,
   dv
): void;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:68

`set_uv_rect` — the cover-fit crop window: which sub-rect of
the texture maps onto the widget. JS computes the aspect math
(single responsibility — the shader just samples it).

#### Parameters

##### u

`number`

Crop window left edge, 0..1.

##### v

`number`

Crop window top edge, 0..1.

##### du

`number`

Crop window width, 0..1.

##### dv

`number`

Crop window height, 0..1.

#### Returns

`void`

---

### upload\_bitmap()

```ts
upload_bitmap(
   bitmap,
   w,
   h
): void;
```

Defined in: website/public/wasm/media/luiskr\_media.d.ts:78

`upload_bitmap` — paint a decoded `ImageBitmap` (JS did the
decode off-main-thread via createImageBitmap). GPU→GPU copy —
the fastest possible path and zero wasm-side decode code.

#### Parameters

##### bitmap

`ImageBitmap`

The decoded image.

##### w

`number`

Bitmap width px.

##### h

`number`

Bitmap height px.

#### Returns

`void`
