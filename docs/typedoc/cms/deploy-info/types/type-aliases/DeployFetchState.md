[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/deploy-info/types](../README.md) / DeployFetchState

```ts
type DeployFetchState = "loading" | "missing" | "ready";
```

Defined in: cms/deploy-info/types.ts:82

Tri-state of the Deploy Info fetch: still `loading`, the bundle
is `missing` (no deploy-info/ in this build), or the index parsed `ready`.
