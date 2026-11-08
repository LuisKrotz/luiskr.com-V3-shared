[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/ring-fill/luiskr\_ring\_fill](../README.md) / initSync

```ts
function initSync(module): InitOutput
```

Defined in: website/public/wasm/ring-fill/luiskr\_ring\_fill.d.ts:89

Instantiates the given `module`, which can either be bytes or
a precompiled `WebAssembly.Module`.

## Parameters

### module

\| \{
`module`: [`SyncInitInput`](../type-aliases/SyncInitInput.md);
\}
\| [`SyncInitInput`](../type-aliases/SyncInitInput.md)

Passing `SyncInitInput` directly is deprecated.

## Returns

[`InitOutput`](../interfaces/InitOutput.md)
