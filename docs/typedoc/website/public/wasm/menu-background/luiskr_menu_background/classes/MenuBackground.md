[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/menu-background/luiskr\_menu\_background](../README.md) / MenuBackground

Defined in: website/public/wasm/menu-background/luiskr\_menu\_background.d.ts:7

Public wasm surface — one fullscreen canvas per instance.

## Constructors

### Constructor

```ts
new MenuBackground(): MenuBackground;
```

Defined in: website/public/wasm/menu-background/luiskr\_menu\_background.d.ts:28

`MenuBackground::new` — un-initialized widget; `init` follows.

#### Returns

`MenuBackground`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/menu-background/luiskr\_menu\_background.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/menu-background/luiskr\_menu\_background.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): void;
```

Defined in: website/public/wasm/menu-background/luiskr\_menu\_background.d.ts:15

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

Defined in: website/public/wasm/menu-background/luiskr\_menu\_background.d.ts:24

`init` — device + pipeline. Rejection → JS keeps the WebGL
backdrop; mounting can never regress the page.

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

Defined in: website/public/wasm/menu-background/luiskr\_menu\_background.d.ts:35

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

Defined in: website/public/wasm/menu-background/luiskr\_menu\_background.d.ts:42

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
   reveal,
   r1,
   g1,
   b1,
   alpha,
   r2,
   g2,
   b2
): void;
```

Defined in: website/public/wasm/menu-background/luiskr\_menu\_background.d.ts:56

`set_state` — bundled scalar update: reveal amount, the two
theme inks (linear 0..1 rgb triples), and the global alpha.

#### Parameters

##### reveal

`number`

0..1 menu open amount.

##### r1

`number`

Primary ink red.

##### g1

`number`

Primary ink green.

##### b1

`number`

Primary ink blue.

##### alpha

`number`

Global opacity multiplier.

##### r2

`number`

Secondary ink red.

##### g2

`number`

Secondary ink green.

##### b2

`number`

Secondary ink blue.

#### Returns

`void`
