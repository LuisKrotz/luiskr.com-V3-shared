[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/ring-sheen/luiskr\_ring\_sheen](../README.md) / RingSheen

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:7

Public wasm surface — one ring canvas per tile container.

## Constructors

### Constructor

```ts
new RingSheen(): RingSheen;
```

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:28

`RingSheen::new` — un-initialized widget; `init` must follow.

#### Returns

`RingSheen`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): boolean;
```

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:16

`frame` — advance the sweep clock, repack, draw all tiles.

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

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:24

`init` — device + pipeline + the initial bind group.

#### Parameters

##### canvas

`HTMLCanvasElement`

The overlay canvas (positioned over the grid).

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

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:34

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

### set\_colors()

```ts
set_colors(
   er,
   eg,
   eb,
   ea,
   ar,
   ag,
   ab,
   aa,
   hair
): void;
```

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:43

`set_colors` — push the live theme colors (computed style read
once per theme flip — the shader never sees CSS vars).

#### Parameters

##### er

`number`

##### eg

`number`

##### eb

`number`

##### ea

`number`

Ring edge rgba 0-1.

##### ar

`number`

##### ag

`number`

##### ab

`number`

##### aa

`number`

Sheen core rgba 0-1.

##### hair

`number`

Hairline half-width in device px.

#### Returns

`void`

---

### set\_size()

```ts
set_size(_w, _h): void;
```

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:59

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

### set\_tiles()

```ts
set_tiles(values): number;
```

Defined in: website/public/wasm/ring-sheen/luiskr\_ring\_sheen.d.ts:67

`set_tiles` — upload the per-tile sheet (8 f32s per tile — see
module doc). Recreates the storage buffer on growth, rebinds.

#### Parameters

##### values

`Float32Array`

The flat f32 sheet (len = tiles·8).

#### Returns

`number`

The tile count adopted (0 on malformed input).
