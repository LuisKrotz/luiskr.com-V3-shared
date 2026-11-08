[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/ring-fill/luiskr\_ring\_fill](../README.md) / RingFill

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:7

Public wasm surface — one ring-fill canvas per results list.

## Constructors

### Constructor

```ts
new RingFill(): RingFill;
```

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:28

`RingFill::new` — un-initialized widget; `init` must follow.

#### Returns

`RingFill`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): boolean;
```

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:16

`frame` — advance the clock, repack, draw all tiles.

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

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:24

`init` — device + pipeline + the initial bind group.

#### Parameters

##### canvas

`HTMLCanvasElement`

The overlay canvas (positioned over the list).

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

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:34

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
   tr,
   tg,
   tb,
   ta,
   fr,
   fg,
   fb,
   fa,
   hr,
   hg,
   hb,
   ha,
   hair
): void;
```

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:44

`set_colors` — push the live theme colors (computed style read
once per theme flip — the shader never sees CSS vars).

#### Parameters

##### tr

`number`

##### tg

`number`

##### tb

`number`

##### ta

`number`

Track ring rgba 0-1.

##### fr

`number`

##### fg

`number`

##### fb

`number`

##### fa

`number`

Progress arc rgba 0-1.

##### hr

`number`

##### hg

`number`

##### hb

`number`

##### ha

`number`

Arc-tip dot rgba 0-1.

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

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:50

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

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:58

`set_tiles` — upload the per-button sheet (8 f32s per tile — see
module doc). Recreates the storage buffer on growth, rebinds.

#### Parameters

##### values

`Float32Array`

The flat f32 sheet (len = tiles·8).

#### Returns

`number`

The tile count adopted (0 on malformed input).
