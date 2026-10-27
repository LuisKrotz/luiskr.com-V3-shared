[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/routes/paths](../README.md) / ASSET\_PATHS

```ts
const ASSET_PATHS: Readonly<{
  FLAGS_PREFIX: '/assets/flags/'
  SVG_EXT: '.svg'
  WASM_WIDGETS_PREFIX: '/wasm/'
  WASM_DIAGRAM_PREFIX: '/wasm/diagram/'
  ORT_WASM_PREFIX: '/ort/'
  ML_MODELS_PREFIX: '/models/'
  EMPTY_CAPTIONS: '/assets/empty-captions.vtt'
}>
```

Defined in: core/tokens/routes/paths.ts:67

Frozen asset path map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.
