[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/divider-sheen/luiskr\_divider\_sheen](../README.md) / DividerSheen

Defined in: website/public/wasm/divider-sheen/luiskr\_divider\_sheen.d.ts:7

Public wasm surface — one divider canvas per footer hairline.

## Constructors

### Constructor

```ts
new DividerSheen(): DividerSheen;
```

Defined in: website/public/wasm/divider-sheen/luiskr\_divider\_sheen.d.ts:28

`DividerSheen::new` — un-initialized widget; `init` must follow.

#### Returns

`DividerSheen`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/divider-sheen/luiskr\_divider\_sheen.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/divider-sheen/luiskr\_divider\_sheen.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): boolean;
```

Defined in: website/public/wasm/divider-sheen/luiskr\_divider\_sheen.d.ts:16

`frame` — advance the sweep clock, repack, draw.

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

Defined in: website/public/wasm/divider-sheen/luiskr\_divider\_sheen.d.ts:24

`init` — device + pipeline + the single bind group.

#### Parameters

##### canvas

`HTMLCanvasElement`

The divider's overlay canvas.

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

Defined in: website/public/wasm/divider-sheen/luiskr\_divider\_sheen.d.ts:34

`resize` — device px — the `res`/`rect` uniform.

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
   br,
   bg,
   bb,
   ba,
   ar,
   ag,
   ab,
   aa
): void;
```

Defined in: website/public/wasm/divider-sheen/luiskr\_divider\_sheen.d.ts:43

`set_colors` — push the live theme colors (read once per
theme flip from the DOM's computed style — the shader never
sees CSS vars).

#### Parameters

##### br

`number`

##### bg

`number`

##### bb

`number`

##### ba

`number`

Hairline rgba 0-1.

##### ar

`number`

##### ag

`number`

##### ab

`number`

##### aa

`number`

Accent-band rgba 0-1.

#### Returns

`void`

---

### set\_size()

```ts
set_size(_w, _h): void;
```

Defined in: website/public/wasm/divider-sheen/luiskr\_divider\_sheen.d.ts:58

`set_size` — CSS px (contract parity; unused — device px only).

#### Parameters

##### \_w

`number`

##### \_h

`number`

CSS size — unused.

#### Returns

`void`
