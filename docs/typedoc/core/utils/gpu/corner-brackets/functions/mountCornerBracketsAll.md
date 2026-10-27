[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/corner-brackets](../README.md) / mountCornerBracketsAll

```ts
function mountCornerBracketsAll(root, selector, spec): () => void
```

Defined in: core/utils/gpu/corner-brackets.ts:391

Batch mount — one `mountCornerBrackets` per matching element under
`root` (a component shadow root or any parent). Returns a single
teardown that destroys them all; surfaces that re-render call it
then re-query (the helper tolerates re-mounting on new nodes).

## Parameters

### root

`ParentNode`

The subtree to query.

### selector

`string`

Class selector for the bracketed elements.

### spec

[`CornerBracketSpec`](../interfaces/CornerBracketSpec.md)

Shared surface parameters.

## Returns

Teardown for every mounted bracket.

() => `void`
