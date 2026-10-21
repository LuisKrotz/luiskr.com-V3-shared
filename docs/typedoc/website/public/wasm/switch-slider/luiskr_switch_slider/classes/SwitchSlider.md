[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/switch-slider/luiskr\_switch\_slider](../README.md) / SwitchSlider

Defined in: website/public/wasm/switch-slider/luiskr\_switch\_slider.d.ts:7

Public wasm surface — one toggle canvas per instance.

## Constructors

### Constructor

```ts
new SwitchSlider(): SwitchSlider;
```

Defined in: website/public/wasm/switch-slider/luiskr\_switch\_slider.d.ts:28

`SwitchSlider::new` — un-initialized widget; `init` must follow.

#### Returns

`SwitchSlider`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/switch-slider/luiskr\_switch\_slider.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/switch-slider/luiskr\_switch\_slider.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): void;
```

Defined in: website/public/wasm/switch-slider/luiskr\_switch\_slider.d.ts:15

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

Defined in: website/public/wasm/switch-slider/luiskr\_switch\_slider.d.ts:24

`init` — device + pipeline. Rejection → JS keeps the WebGL
toggle; mounting can never regress the page.

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

Defined in: website/public/wasm/switch-slider/luiskr\_switch\_slider.d.ts:37

`resize` — canvas-bitmap change → surface re-configure + the
DEVICE-pixel size that becomes `rect.zw` (the frag→uv divisor;
`frag` arrives in device px, so the divisor must too).

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

### set\_size()

```ts
set_size(w, h): void;
```

Defined in: website/public/wasm/switch-slider/luiskr\_switch\_slider.d.ts:46

`set_size` — the canvas's CSS-pixel size (res + rect). NOTE: the
shader's pixel-space math assumes the design height (~28px) —
mount the canvas at the design size.

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
set_state(
   progress,
   knob_x,
   context
): void;
```

Defined in: website/public/wasm/switch-slider/luiskr\_switch\_slider.d.ts:56

`set_state` — bundled scalar update: eased progress, knob X,
and the context personality (0 stats / 1 grid / 2 motion —
mirrored by `GPU_SWITCH_CONTEXTS` on the JS side).

#### Parameters

##### progress

`number`

0..1 eased on-ness.

##### knob\_x

`number`

Knob center X in px.

##### context

`number`

Track personality discriminant.

#### Returns

`void`
