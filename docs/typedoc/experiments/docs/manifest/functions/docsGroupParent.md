[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/manifest](../README.md) / docsGroupParent

```ts
function docsGroupParent(path): string | undefined
```

Defined in: experiments/docs/manifest.ts:229

The section-group path containing a manifest path — walks ancestors so
deep paths ('docs/sassdoc/index.html') resolve through their section
member ('docs/sassdoc') to the owning group ('group/docs'). Used to
auto-open the group row for a routed path and to climb Arrow-Left out
of a section member (its real path parent is not a rendered row).

## Parameters

### path

`string`

Manifest-relative docs path.

## Returns

`string` \| `undefined`

The owning 'group/<id>' path, or undefined outside the tree.
