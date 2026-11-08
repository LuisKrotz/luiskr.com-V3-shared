[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/locale/reader-content](../README.md) / demoteReaderH1

```ts
function demoteReaderH1(root): void
```

Defined in: core/locale/reader-content.ts:39

Demotes every <h1> inside the parked mirror to <h2>. Emitted markup
ships a real <h1> for no-JS documents, crawlers and reader modes, but
once JS mounts the routed view supplies the document's level-one
heading — an <h1> left in the mirror would double it in the live DOM
for every JS-rendering agent. Idempotent: a no-op when no <h1> remains.

## Parameters

### root

`ParentNode`

Element whose descendant <h1>s are rewritten in place.

## Returns

`void`
