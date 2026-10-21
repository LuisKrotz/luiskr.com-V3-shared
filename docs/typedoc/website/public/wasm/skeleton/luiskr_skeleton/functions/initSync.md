[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/skeleton/luiskr\_skeleton](../README.md) / initSync

```ts
function initSync(module): InitOutput
```

Defined in: website/public/wasm/skeleton/luiskr\_skeleton.d.ts:100

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
