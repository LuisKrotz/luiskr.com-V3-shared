[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/flag/luiskr\_flag](../README.md) / Flag

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:7

Public wasm surface — one flag canvas per instance.

## Constructors

### Constructor

```ts
new Flag(): Flag;
```

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:30

`Flag::new` — un-initialized widget; `init` must follow.

#### Returns

`Flag`

## Methods

### free()

```ts
free(): void;
```

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:8

#### Returns

`void`

---

### \[dispose\]()

```ts
dispose: void;
```

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:9

#### Returns

`void`

---

### frame()

```ts
frame(dt): void;
```

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:17

`frame` — one animation tick: pack, write, draw. Skips silently
until textures land (no bind group yet — an unbound draw would
be a validation error).

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

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:26

`init` — device + pipeline + sampler; the bind group builds
once textures land (`upload_textures` → `rebind`).

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

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:37

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

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:44

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
   hover,
   anim,
   is_split,
   split_x
): void;
```

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:54

`set_state` — bundled scalar update: hover amount, the locale
personality, and the split-flag geometry.

#### Parameters

##### hover

`number`

0..1 hover amount.

##### anim

`number`

Locale personality 0..11 (`GPU_FLAG_ANIMS`).

##### is\_split

`number`

0 single / 1 split flag.

##### split\_x

`number`

Seam position 0..1.

#### Returns

`void`

---

### upload\_textures()

```ts
upload_textures(a, b): void;
```

Defined in: website/public/wasm/flag/luiskr\_flag.d.ts:71

`upload_textures` — stage one or two RGBA8 flag images. Single-
flag widgets pass `rgba_b` identical to `rgba_a` (the shader
reads tex2 only when is_split=1 — a duplicate binding is the
cheapest no-op). Rebuilds the bind group so the new textures go
live next frame.

`ImageBitmap` inputs — the browser decodes the SVG off-main-
thread and `copyExternalImageToTexture` moves pixels GPU→GPU,
so no CPU pixel round-trip ever touches the flag path.

#### Parameters

##### a

`ImageBitmap`

The primary flag's decoded bitmap.

##### b

`ImageBitmap`

The secondary flag's decoded bitmap (same as `a` for
unsplit locales — a duplicate binding is the cheapest
no-op).

#### Returns

`void`
