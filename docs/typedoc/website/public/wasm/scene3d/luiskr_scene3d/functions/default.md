[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/scene3d/luiskr\_scene3d](../README.md) / default

```ts
function default(module_or_path?): Promise<InitOutput>;
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:680

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
