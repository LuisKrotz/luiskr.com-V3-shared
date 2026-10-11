[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/manifest](../README.md) / resolveDocsPath

```ts
function resolveDocsPath(docsPath): DocsNode | null;
```

Defined in: experiments/docs/manifest.ts:90

Resolves a docs sub-path ('docs/a/b.md' or bare 'a/b' against roots) to
the manifest node. Case-sensitive — the tree mirrors the real fs layout.

## Parameters

### docsPath

`string`

Route param from /docs/<path>.

## Returns

[`DocsNode`](../interfaces/DocsNode.md) \| `null`

The node, or null when the path doesn't resolve.
