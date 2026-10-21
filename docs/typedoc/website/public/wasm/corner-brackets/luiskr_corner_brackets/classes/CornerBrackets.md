[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/corner-brackets/luiskr\_corner\_brackets](../README.md) / CornerBrackets

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:7

Public wasm surface — one bracket canvas per button.

## Constructors

### Constructor

```ts
new CornerBrackets(): CornerBrackets;
```

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:31

`CornerBrackets::new` — un-initialized widget; `init` must
follow.

#### Returns

`CornerBrackets`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(_dt): boolean;
```

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:18

`frame` — repack the uniform block, draw the brackets.

#### Parameters

##### \_dt

`number`

Frame delta — unused (the shader is stateless:
`hover` is driven from JS so time never appears in
the uniform).

#### Returns

`boolean`

false once the surface is stale/lost.

---

### init()

```ts
init(canvas, device): void;
```

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:26

`init` — device + pipeline + uniform bind group.

#### Parameters

##### canvas

`HTMLCanvasElement`

The overlay canvas (the button's own box).

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

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:37

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

### set\_arms()

```ts
set_arms(
   a0w,
   a0h,
   a1w,
   a1h,
   hair
): void;
```

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:46

`set_arms` — push the stub/full arm lengths and hairline (all
device px — JS computes them from the rect + tokens once).

#### Parameters

##### a0w

`number`

##### a0h

`number`

Stub arm lengths.

##### a1w

`number`

##### a1h

`number`

Full arm lengths.

##### hair

`number`

Hairline half-width in device px.

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
   aa
): void;
```

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:54

`set_colors` — push the resting/hover colors (computed style
read once per theme flip — the shader never sees CSS vars).

#### Parameters

##### er

`number`

##### eg

`number`

##### eb

`number`

##### ea

`number`

Resting rgba 0-1.

##### ar

`number`

##### ag

`number`

##### ab

`number`

##### aa

`number`

Hover rgba 0-1.

#### Returns

`void`

---

### set\_hover()

```ts
set_hover(v): void;
```

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:71

`set_hover` — drive the eased hover progress (JS runs the
ease so the shader stays stateless; pump frames while the
value is moving, settle it to present the last frame).

#### Parameters

##### v

`number`

Eased progress 0..1 (0 = stub arms, 1 = full span).

#### Returns

`void`

---

### set\_size()

```ts
set_size(_w, _h): void;
```

Defined in: website/public/wasm/corner-brackets/luiskr\_corner\_brackets.d.ts:77

`set_size` — CSS px (contract parity; unused — device px only).

#### Parameters

##### \_w

`number`

##### \_h

`number`

CSS size — unused.

#### Returns

`void`
