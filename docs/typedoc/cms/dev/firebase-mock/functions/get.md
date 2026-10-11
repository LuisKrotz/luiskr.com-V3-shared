[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/dev/firebase-mock](../README.md) / get

```ts
function get(r): Promise<{
  exists: () => boolean;
  val: () => unknown;
}>;
```

Defined in: cms/dev/firebase-mock.ts:107

Mock of firebase/database `get()` — resolves the ref's path in the
snapshot and returns the SDK-shaped {exists, val} result.

## Parameters

### r

`MockRef`

The ref to read.

## Returns

`Promise`\<\{
  `exists`: () => `boolean`;
  `val`: () => `unknown`;
\}\>

A snapshot-shaped promise.
