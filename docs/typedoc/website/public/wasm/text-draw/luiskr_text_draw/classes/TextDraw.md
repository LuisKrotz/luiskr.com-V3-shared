[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/text-draw/luiskr\_text\_draw](../README.md) / TextDraw

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:7

Public wasm surface — one text-draw canvas per animated block.

## Constructors

### Constructor

```ts
new TextDraw(): TextDraw;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:30

`TextDraw::new` — un-initialized widget; `init` must follow.

#### Returns

`TextDraw`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): boolean;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:16

`frame` — advance the clock, repack, draw all live chars.

#### Parameters

##### dt

`number`

Frame delta in seconds.

#### Returns

`boolean`

false once the surface is stale/lost (JS disarms).

---

### init()

```ts
init(canvas, device): void;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:26

`init` — device + pipeline + sampler; the bind group builds
once the atlas + first sheet land (`upload_atlas`/`set_chars`
→ `rebind`).

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

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:36

`resize` — device px — the `res` uniform.

#### Parameters

##### w

`number`

##### h

`number`

Backing size in device pixels.

#### Returns

`void`

---

### set\_chars()

```ts
set_chars(values): number;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:45

`set_chars` — upload the per-char sheet (12 f32s per char —
see module doc). Recreates the storage buffer when the sheet
outgrows capacity, then rebinds.

#### Parameters

##### values

`Float32Array`

The flat f32 sheet (len = count·12).

#### Returns

`number`

The char count adopted (0 on malformed input).

---

### set\_ink()

```ts
set_ink(
   r,
   g,
   b,
   a
): void;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:51

`set_ink` — push the text color (computed style read once).

#### Parameters

##### r

`number`

##### g

`number`

##### b

`number`

##### a

`number`

rgba 0-1.

#### Returns

`void`

---

### set\_size()

```ts
set_size(_w, _h): void;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:57

`set_size` — CSS px (contract parity; unused — device px only).

#### Parameters

##### \_w

`number`

##### \_h

`number`

CSS size — unused.

#### Returns

`void`

---

### trigger()

```ts
trigger(): void;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:62

`trigger` — start the stagger: the clock's current value
becomes t0 so `frame` reports elapsed ms from HERE.

#### Returns

`void`

---

### upload\_atlas()

```ts
upload_atlas(bitmap): boolean;
```

Defined in: website/public/wasm/text-draw/luiskr\_text\_draw.d.ts:71

`upload_atlas` — stage the rasterized char atlas. `ImageBitmap`
input — `copyExternalImageToTexture` moves pixels GPU→GPU.
Rebinds so the new atlas goes live next frame.

#### Parameters

##### bitmap

`ImageBitmap`

The decoded atlas bitmap.

#### Returns

`boolean`

true when the texture landed, false before init.
