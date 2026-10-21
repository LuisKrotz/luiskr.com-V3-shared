[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/glitch/luiskr\_glitch](../README.md) / Glitch

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:7

Public wasm surface — one glitch canvas per portrait.

## Constructors

### Constructor

```ts
new Glitch(): Glitch;
```

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:40

`Glitch::new` — un-initialized widget; `init` must follow.

The RNG seeds from a fixed constant — determinism is a feature:
replayed corruption is stable across mounts, and entropy comes
from the frame counter, not wall time.

#### Returns

`Glitch`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): boolean;
```

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:23

`frame` — advance the clock + RNG, repack the uniform, draw.

The RNG: one xorshift32 step per frame — `x ^= x<<13; x ^= x>>17;
x ^= x<<5` (Marsaglia) — maximal period 2³²−1, three shifts of
state. The seed goes down as an f32; the shader bitcasts it
back to u32 for the hash mixer (bit-exact round trip — the
seed's low 24 bits are the only ones that survive f32, which is
why the mixer uses the HIGH bits via the second shift).

#### Parameters

##### dt

`number`

Frame delta in seconds (roll-bar clock).

#### Returns

`boolean`

false once the surface is stale/lost.

---

### init()

```ts
init(canvas, device): void;
```

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:32

`init` — device + pipeline + sampler; the bind group builds
once the portrait lands (`upload` → `rebind`).

#### Parameters

##### canvas

`HTMLCanvasElement`

The overlay canvas (positioned over the <img>).

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

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:47

`resize` — device px — the `res` uniform (corruption math is
px-native: band heights, tear distances, grain).

#### Parameters

##### w

`number`

##### h

`number`

Backing size in device pixels.

#### Returns

`void`

---

### set\_cover()

```ts
set_cover(
   dx,
   dy,
   dw,
   dh
): void;
```

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:56

`set_cover` — push the cover-fit dest rect (device px) — the
DOM `coverRect()` parity value so the shader's frag→uv mapping
matches `object-fit: cover` + `object-position` exactly.

#### Parameters

##### dx

`number`

##### dy

`number`

Dest rect origin (device px).

##### dw

`number`

##### dh

`number`

Dest rect size (device px).

#### Returns

`void`

---

### set\_hover()

```ts
set_hover(hover): void;
```

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:63

`set_hover` — the intensity latch: 0 = idle ambient, 1 = full
VHS. Mirrors `session.hover`.

#### Parameters

##### hover

`number`

0 or 1.

#### Returns

`void`

---

### set\_size()

```ts
set_size(_w, _h): void;
```

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:70

`set_size` — CSS px (kept for bridge contract parity; the
shader reads device px from `resize` only).

#### Parameters

##### \_w

`number`

##### \_h

`number`

CSS size — unused.

#### Returns

`void`

---

### upload()

```ts
upload(bitmap): boolean;
```

Defined in: website/public/wasm/glitch/luiskr\_glitch.d.ts:85

`upload` — stage the decoded portrait. `ImageBitmap` input —
the browser decodes off-main-thread and
`copyExternalImageToTexture` moves pixels GPU→GPU, so no CPU
pixel round-trip ever touches the glitch path.

NOTE on CORS: the portrait is cross-origin — the copy REQUIRES
the image be fetched with `crossorigin` or the bitmap is
tainted and the copy throws. The JS arm catches that and keeps
the 2D fallback alive — the <img> stays the source of truth.

#### Parameters

##### bitmap

`ImageBitmap`

The decoded portrait (`createImageBitmap(img)`).

#### Returns

`boolean`

true when the texture landed, false before init.
