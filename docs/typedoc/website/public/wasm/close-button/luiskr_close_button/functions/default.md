[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/close-button/luiskr\_close\_button](../README.md) / default

```ts
function default(module_or_path?): Promise<InitOutput>;
```

Defined in: website/public/wasm/close-button/luiskr\_close\_button.d.ts:100

If `module_or_path` is {RequestInfo} or {URL}, makes a request and
for everything else, calls `WebAssembly.instantiate` directly.

## Parameters

### module\_or\_path?

\| \{
`module_or_path`: InitInput \| Promise\<InitInput\>;
\}
\| [`InitInput`](../type-aliases/InitInput.md)
\| `Promise`\<[`InitInput`](../type-aliases/InitInput.md)\>

Passing `InitInput` directly is deprecated.

## Returns

`Promise`\<[`InitOutput`](../interfaces/InitOutput.md)\>
