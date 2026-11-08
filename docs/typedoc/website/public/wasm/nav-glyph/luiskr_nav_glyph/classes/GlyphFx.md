[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/nav-glyph/luiskr\_nav\_glyph](../README.md) / GlyphFx

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:7

One glyph's particle system — construct once per icon, `step` per frame.

## Constructors

### Constructor

```ts
new GlyphFx(kind, seed): GlyphFx;
```

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:30

Creates an idle emitter of `kind` (KIND_STREAK / KIND_SWOOSH) seeded for
deterministic jitter.

#### Parameters

##### kind

`number`

##### seed

`number`

#### Returns

`GlyphFx`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:9

#### Returns

`void`

---

### alive()

```ts
alive(): number;
```

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:13

Live particle count — JS stops the frame loop once this and energy are 0.

#### Returns

`number`

---

### data\_len()

```ts
data_len(): number;
```

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:17

Float count of the output buffer (POOL * STRIDE).

#### Returns

`number`

---

### data\_ptr()

```ts
data_ptr(): number;
```

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:21

Address of the output buffer inside wasm linear memory.

#### Returns

`number`

---

### energy()

```ts
energy(): number;
```

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:25

Current activity energy in [0, 1].

#### Returns

`number`

---

### set\_active()

```ts
set_active(on): void;
```

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:35

Sets the wake target: true eases energy up (emission on), false eases it
back to rest while live particles finish their travel.

#### Parameters

##### on

`boolean`

#### Returns

`void`

---

### step()

```ts
step(dt): void;
```

Defined in: website/public/wasm/nav-glyph/luiskr\_nav\_glyph.d.ts:39

Advances the simulation by `dt` seconds and rewrites the output buffer.

#### Parameters

##### dt

`number`

#### Returns

`void`
