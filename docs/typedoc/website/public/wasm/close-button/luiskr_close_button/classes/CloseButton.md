[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/close-button/luiskr\_close\_button](../README.md) / CloseButton

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:7

Public wasm surface — one button canvas per instance.

## Constructors

### Constructor

```ts
new CloseButton(): CloseButton;
```

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:36

`CloseButton::new` — un-initialized widget; `init` must follow.

#### Returns

`CloseButton`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:9

#### Returns

`void`

---

### click()

```ts
click(time): void;
```

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:17

`click` — registers a click for the shockwave ring: the bridge
passes the frame clock's current seconds (the shader computes
`time - click_time` for ring expansion/fade).

#### Parameters

##### time

`number`

The frame clock's current seconds.

#### Returns

`void`

---

### frame()

```ts
frame(dt): void;
```

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:23

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

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:32

`init` — device + pipeline. Rejection → JS keeps the WebGL
button; mounting can never regress the page.

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

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:43

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

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:50

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
set_state(
   liquid,
   draw,
   rot
): void;
```

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:59

`set_state` — bundled scalar update: liquid fill, X stroke
progress, X rotation. All eased JS-side; the shader just draws.

#### Parameters

##### liquid

`number`

0..1 fill height.

##### draw

`number`

0..1 X stroke progress.

##### rot

`number`

X rotation in radians.

#### Returns

`void`
