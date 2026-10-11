[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/manifest](../README.md) / crumbsForPath

```ts
function crumbsForPath(docsPath): object[];
```

Defined in: experiments/docs/manifest.ts:137

Breadcrumb segments for a resolved docs path — [{label, path}] from the
portal root down to the node.

## Parameters

### docsPath

`string`

Route param from /docs/<path>.

## Returns

`object`[]

Ordered crumb trail.
