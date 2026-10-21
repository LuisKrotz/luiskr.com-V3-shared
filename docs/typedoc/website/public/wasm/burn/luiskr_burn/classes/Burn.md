[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/burn/luiskr\_burn](../README.md) / Burn

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:8

Public wasm surface — one burn canvas per instance (the mosaic
mounts one per title interaction).

## Constructors

### Constructor

```ts
new Burn(): Burn;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:51

`Burn::new` — un-initialized surface; `init` must follow.

#### Returns

`Burn`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:9

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:10

#### Returns

`void`

---

### begin()

```ts
begin(
   dir,
   ox,
   oy,
   seed
): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:21

`begin` — start a sim session: `dir` +1 burns, −1 rebuilds;
`origin` is the widget's CSS-px offset inside the canvas;
`seed` makes the xorshift deterministic per session.

#### Parameters

##### dir

`number`

+1.0 burn / −1.0 rebuild.

##### ox

`number`

Widget origin X, canvas CSS px.

##### oy

`number`

Widget origin Y, canvas CSS px.

##### seed

`number`

Deterministic xorshift seed (0 → session default).

#### Returns

`void`

---

### frame()

```ts
frame(dt): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:29

`frame` — one animation tick: advance the sim, emit instances,
upload, draw. Per-frame cost: O(particles) scalar math + one
instance write + one `draw(6, n)` — one JS→wasm crossing total.

#### Parameters

##### dt

`number`

Seconds since the previous call.

#### Returns

`void`

---

### init()

```ts
init(canvas, device): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:38

`init` — device + pipeline + buffers. Rejection → JS keeps the
2D-canvas burn; mounting can never regress the page.

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

### live\_particles()

```ts
live_particles(): number;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:47

`live_particles` — the sim's live-particle count. The JS loop
polls this for its settle check: the burn canvas can idle once
the front is spent AND the last ember died (mirroring the JS
sim's `particles.length === 0` condition).

#### Returns

`number`

Live particle count (0 when no sim is mounted).

---

### resize()

```ts
resize(_w, _h): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:58

`resize` — canvas-bitmap change → surface re-configure.

#### Parameters

##### \_w

`number`

Device-pixel width (element-side).

##### \_h

`number`

Device-pixel height.

#### Returns

`void`

---

### set\_colors()

```ts
set_colors(flat): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:65

`set_colors` — the ember ramp + scorch tint: [core, mid, edge,
scorch] × rgba = 16 f32s.

#### Parameters

##### flat

`Float32Array`

Flat f32 color table.

#### Returns

`void`

---

### set\_dir()

```ts
set_dir(dir): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:71

`set_dir` — +1 burn, −1 rebuild.

#### Parameters

##### dir

`number`

Direction discriminant.

#### Returns

`void`

---

### set\_ink()

```ts
set_ink(ink): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:78

`set_ink` — per-column ink occupancy bytes (the front's paper
mask — where burn front edges can live).

#### Parameters

##### ink

`Uint8Array`

One byte per pixel-column.

#### Returns

`void`

---

### set\_letters()

```ts
set_letters(flat): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:85

`set_letters` — the letter table: 6 f32s per glyph (rect +
speeds — see `sim::BurnSim::set_letters` for the exact layout).

#### Parameters

##### flat

`Float32Array`

Flat f32 letter table.

#### Returns

`void`

---

### set\_origin()

```ts
set_origin(ox, oy): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:92

`set_origin` — move the burn origin (the widget rect moved).

#### Parameters

##### ox

`number`

New origin X, canvas CSS px.

##### oy

`number`

New origin Y, canvas CSS px.

#### Returns

`void`

---

### set\_size()

```ts
set_size(w, h): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:99

`set_size` — the canvas's CSS-pixel size (viewport uniform).

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

### set\_stage()

```ts
set_stage(stage, jag_amp): void;
```

Defined in: website/public/wasm/burn/luiskr\_burn.d.ts:107

`set_stage` — per-frame stage + jagged amplitude pushed by the
bridge before `frame`.

#### Parameters

##### stage

`number`

Global burn progress 0..1.

##### jag\_amp

`number`

Jagged-edge amplitude in px.

#### Returns

`void`
