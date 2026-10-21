[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/genie/luiskr\_genie](../README.md) / Genie

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:7

Public wasm surface — one genie transition per expand modal.

## Constructors

### Constructor

```ts
new Genie(): Genie;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:28

`Genie::new` — un-initialized widget; `init` must follow.

#### Returns

`Genie`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): boolean;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:16

`frame` — repack uniforms + one render pass (the mesh draw).

#### Parameters

##### dt

`number`

Frame delta in seconds.

#### Returns

`boolean`

false once the surface is stale/lost.

---

### init()

```ts
init(canvas, device): void;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:24

`init` — device + the mesh pipeline + the placeholder texture.

#### Parameters

##### canvas

`HTMLCanvasElement`

The overlay canvas.

##### device

`GPUDevice`

The shared GPUDevice (one per page, from the JS bridge).

#### Returns

`void`

Ok on a live surface, Err(JsValue) on failure.

---

### resize()

```ts
resize(w, h): void;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:34

`resize` — device px — the `res` uniform + surface re-configure.

#### Parameters

##### w

`number`

##### h

`number`

Backing size in device pixels.

#### Returns

`void`

---

### set\_flags()

```ts
set_flags(opening, near_bottom): void;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:41

`set_flags` — direction + facing edge.

#### Parameters

##### opening

`number`

1.0 while opening, 0.0 on the collapse.

##### near\_bottom

`number`

1.0 when the origin sits below the destination.

#### Returns

`void`

---

### set\_progress()

```ts
set_progress(p): void;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:47

`set_progress` — the JS-owned spring progress 0..1.

#### Parameters

##### p

`number`

Progress.

#### Returns

`void`

---

### set\_rects()

```ts
set_rects(
   fx,
   fy,
   fw,
   fh,
   tx,
   ty,
   tw,
   th
): void;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:54

`set_rects` — the warp's origin + destination rects, CSS px.

#### Parameters

##### fx

`number`

##### fy

`number`

##### fw

`number`

##### fh

`number`

Origin rect.

##### tx

`number`

##### ty

`number`

##### tw

`number`

##### th

`number`

Destination rect.

#### Returns

`void`

---

### set\_size()

```ts
set_size(w, h): void;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:69

`set_size` — canvas CSS px (drives the dpr uniform against `dev`).

#### Parameters

##### w

`number`

##### h

`number`

CSS size.

#### Returns

`void`

---

### set\_tint()

```ts
set_tint(
   r,
   g,
   b,
   a
): void;
```

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:76

`set_tint` — the accent rgba (0-1, theme-resolved in JS) the
untextured ghost fill reads.

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

Rgba channels.

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

Defined in: website/public/wasm/genie/luiskr\_genie.d.ts:85

`upload_bitmap` — decode happened off-thread (createImageBitmap);
GPU→GPU copy into a fresh texture, then the mesh bind group is
rebuilt against it and `has_tex` goes live.

#### Parameters

##### bitmap

`ImageBitmap`

The decoded frame.

##### w

`number`

##### h

`number`

Bitmap pixel size.

#### Returns

`void`
