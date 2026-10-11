[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/manifest](../README.md) / isSourceRoot

```ts
function isSourceRoot(rootName): boolean;
```

Defined in: experiments/docs/manifest.ts:73

Whether a manifest root name ('src', 'core', …) is a protected source
bucket — source roots get the copy-guard and never auto-open index.html.

## Parameters

### rootName

`string`

First segment of a docs path or file id.

## Returns

`boolean`

True when the bucket's kind is 'source'.
