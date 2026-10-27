[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/webgpu-widget](../README.md) / WidgetModule

Defined in: core/utils/gpu/webgpu-widget.ts:30

The generated wasm-pack glue module shape. Each crate exports a
differently-named widget class, so the registry carries the class
name and the module is indexed dynamically.

## Indexable

```ts
[cls: string]: unknown
```

The crate's widget class — indexed by `GPU_WIDGET_ARTIFACTS[kind].cls`.

## Properties

### default

```ts
default: (input?) => Promise<unknown>;
```

Defined in: core/utils/gpu/webgpu-widget.ts:32

Async initializer returning the wasm exports (includes memory).

#### Parameters

##### input?

`RequestInfo`

#### Returns

`Promise`\<`unknown`\>
