[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/data/wasm](../README.md) / WASM\_ACTIONS

```ts
const WASM_ACTIONS: Readonly<{
[k: string]: string;
}>;
```

Defined in: core/tokens/data/wasm.ts:31

Frozen `{ NAME: 'NAME' }` action map built from `_WASM_ACTION_LIST` —
workers dispatch on `type`, and self-keyed entries make typos
compile-checkable while the wire value stays the plain string.
