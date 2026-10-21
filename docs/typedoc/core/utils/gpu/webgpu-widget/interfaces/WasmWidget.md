[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/webgpu-widget](../README.md) / WasmWidget

Defined in: core/utils/gpu/webgpu-widget.ts:42

Public surface every widget crate shares (`init`/`resize`/`frame`
are the contract; `set_size`/`set_state`/`tap`/`click`/
`upload_textures`/`write_sheet`/`begin`/`set_letters`/`upload_bitmap`
etc. are kind-specific and reached through `handle.widget`).

## Indexable

```ts
[key: string]: unknown
```

Kind-specific setters — see each crate's lib.rs exports.

## Methods

### init()

```ts
init(canvas, device): Promise<unknown>;
```

Defined in: core/utils/gpu/webgpu-widget.ts:44

Async init on the widget's canvas, bound to the shared device.

#### Parameters

##### canvas

`HTMLCanvasElement`

##### device

`GPUDevice`

#### Returns

`Promise`\<`unknown`\>

---

### resize()

```ts
resize(w, h): void;
```

Defined in: core/utils/gpu/webgpu-widget.ts:46

Surface re-configure after a bitmap resize (device px).

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

Defined in: core/utils/gpu/webgpu-widget.ts:48

Canvas CSS size — feeds the shader's res/rect uniforms.

#### Parameters

##### w

`number`

##### h

`number`

#### Returns

`void`

---

### frame()

```ts
frame(dt): boolean;
```

Defined in: core/utils/gpu/webgpu-widget.ts:54

One rAF tick; `dt` in seconds. Returns false when the surface is
stale/lost (the caller disarms its loop); the wasm-pack signature
declares `boolean | undefined`, so callers must tolerate undefined.

#### Parameters

##### dt

`number`

#### Returns

`boolean`

---

### free()?

```ts
optional free(): void;
```

Defined in: core/utils/gpu/webgpu-widget.ts:65

wasm-bindgen `free()` — drops the boxed struct AND unregisters the
FinalizationRegistry entry, so the object never re-enters
`__wbg_*_free` at GC time (the registry path is where a stale
glue/wasm pair traps `memory access out of bounds` — the glue's
free shim walks the struct layout compiled into ITS wasm, and a
hot-swapped artifact pair makes that read land off the heap).
Destroy calls it so the free happens deterministically while the
artifact pair that built the object is still the live one.

#### Returns

`void`
