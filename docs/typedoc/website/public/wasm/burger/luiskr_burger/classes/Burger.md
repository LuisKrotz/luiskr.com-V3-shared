[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/burger/luiskr\_burger](../README.md) / Burger

Defined in: website/public/wasm/burger/luiskr\_burger.d.ts:7

Public wasm surface — one burger canvas per instance.

## Constructors

### Constructor

```ts
new Burger(): Burger;
```

Defined in: website/public/wasm/burger/luiskr\_burger.d.ts:28

`Burger::new` — un-initialized widget; `init` must follow.

#### Returns

`Burger`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/burger/luiskr\_burger.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/burger/luiskr\_burger.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): void;
```

Defined in: website/public/wasm/burger/luiskr\_burger.d.ts:15

`frame` — one animation tick: pack the 8-f32 block, write, draw.

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

Defined in: website/public/wasm/burger/luiskr\_burger.d.ts:24

`init` — acquire device + compile the pipeline. Rejection → JS
keeps the DOM/CSS burger; mounting can never regress the page.

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

### resize()

```ts
resize(w, h): void;
```

Defined in: website/public/wasm/burger/luiskr\_burger.d.ts:38

`resize` — canvas-bitmap change → surface re-configure + the
DEVICE-pixel size that becomes `rect.zw` (the frag→uv divisor;
`frag` arrives in device px, so the divisor must too, or every
widget renders squashed at DPR ≠ 1).

#### Parameters

##### w

`number`

Device-pixel width (element CSS px × DPR).

##### h

`number`

Device-pixel height.

#### Returns

`void`

---

### set\_dark()

```ts
set_dark(v): void;
```

Defined in: website/public/wasm/burger/luiskr\_burger.d.ts:45

`set_dark` — the theme lerp: 0 = light, 1 = dark. Clamped —
the shader lerps ink colors on this factor.

#### Parameters

##### v

`number`

Theme darkness 0..1.

#### Returns

`void`

---

### set\_size()

```ts
set_size(w, h): void;
```

Defined in: website/public/wasm/burger/luiskr\_burger.d.ts:53

`set_size` — the canvas's CSS-pixel size (the `res` field —
the shader's design-unit domain; `uv * res` yields CSS px).

#### Parameters

##### w

`number`

Canvas width in CSS pixels.

##### h

`number`

Canvas height in CSS pixels.

#### Returns

`void`
