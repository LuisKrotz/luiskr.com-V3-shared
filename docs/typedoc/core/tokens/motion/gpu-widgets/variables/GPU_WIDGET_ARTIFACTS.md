[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/gpu-widgets](../README.md) / GPU\_WIDGET\_ARTIFACTS

```ts
const GPU_WIDGET_ARTIFACTS: Readonly<
  Record<
    number,
    {
      url: string
      cls: string
      eager: boolean
    }
  >
>
```

Defined in: core/tokens/motion/gpu-widgets.ts:70

Artifact registry — kind → wasm-pack glue URL + exported class name.
`url` is `/wasm/<slug>/<pkg>.js` under public/; `cls` is the crate's
`#[wasm_bindgen]` struct name (each crate exports a differently-
named widget, so the bridge indexes the module dynamically).
`eager` marks the skeleton — the only artifact allowed on the
critical path since it IS the loading placeholder.
Frozen; consumers import members, never redeclare literals.
