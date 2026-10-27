[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/webgpu-widget](../README.md) / WidgetHandle

Defined in: core/utils/gpu/webgpu-widget.ts:72

Live widget handle returned by `mountWebGpuWidget`.

## Properties

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: core/utils/gpu/webgpu-widget.ts:74

The canvas the widget draws into (the caller's element).

---

### widget

```ts
widget: WasmWidget
```

Defined in: core/utils/gpu/webgpu-widget.ts:82

The wasm widget instance — kind-specific methods
(`set_state`, `tap`, `click`, `upload_textures`, `write_sheet`,
`begin`, `set_letters`, `set_ink`, `set_colors`, `set_dir`,
`set_stage`, `set_origin`, `upload_bitmap`, `push_frame`,
`set_uv_rect`, `set_dark`) are called directly on it.

---

### probe?

```ts
optional probe?: (ms) => Promise<number | null>;
```

Defined in: core/utils/gpu/webgpu-widget.ts:91

Worker-routed probes — renders an end-state frame and reports the
painted-pixel coverage ratio of the live canvas. Present only on
worker-backed handles (main-thread mounts keep the readback in the
caller); returns null on failure.

#### Parameters

##### ms

`number`

#### Returns

`Promise`\<`number` \| `null`\>

## Methods

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/gpu/webgpu-widget.ts:84

Tears down the rAF loop + listeners (the canvas is caller-owned).

#### Returns

`void`
