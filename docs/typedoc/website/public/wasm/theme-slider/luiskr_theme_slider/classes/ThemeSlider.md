[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/theme-slider/luiskr\_theme\_slider](../README.md) / ThemeSlider

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:7

Public wasm surface — one slider canvas per instance.

## Constructors

### Constructor

```ts
new ThemeSlider(): ThemeSlider;
```

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:28

`ThemeSlider::new` — un-initialized widget; `init` must follow.

#### Returns

`ThemeSlider`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): void;
```

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:15

`frame` — one animation tick: pack, write, draw.

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

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:24

`init` — device + pipeline. Rejection → JS keeps the WebGL
slider; mounting can never regress the page.

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

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:35

`resize` — canvas-bitmap change → surface re-configure.

#### Parameters

##### w

`number`

##### h

`number`

#### Returns

`void`

---

### set\_size()

```ts
set_size(w, h): void;
```

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:42

`set_size` — the canvas's CSS-pixel size (res + rect).

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

### set\_state()

```ts
set_state(progress, knob_x): void;
```

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:50

`set_state` — bundled scalar update: eased progress + knob X.

#### Parameters

##### progress

`number`

0..2 theme morph (0..1 night→system,
1..2 system→day; clamped to the shader's domain).

##### knob\_x

`number`

Knob center X in px.

#### Returns

`void`

---

### tap()

```ts
tap(time, x): void;
```

Defined in: website/public/wasm/theme-slider/luiskr\_theme\_slider.d.ts:60

`tap` — registers a tap for the expanding-ring ripple: the JS
bridge passes its clock time + the tap's X position.

#### Parameters

##### time

`number`

The frame clock's current seconds (matches what
`frame` accumulates — the shader compares
`u.time - ripple_time`).

##### x

`number`

Tap X in canvas CSS px.

#### Returns

`void`
