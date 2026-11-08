[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/data/animation-ids](../README.md) / ANIMATION\_DOCS

```ts
const ANIMATION_DOCS: Readonly<Record<string, string>>
```

Defined in: core/tokens/data/animation-ids.ts:125

Frozen animation-id → docs-manifest node path map — one in-depth docs
page per animation record so the /animations listing deep-links into
the docs portal (api reference with signatures + comments, or the
module source for document-level CSS surfaces). Values are manifest
`node.path` strings (`<root>/<rel>`) as served by the docs portal —
`docs/…` roots address generated api/architecture pages under
shared/docs, module roots (`core/…`) address live source files.
Consumers prefix with ROUTE_PATHS.DOCS. Keys reuse ANIMATION_IDS
members directly so the file stays import-free (the static locale-page
generator loads it under plain-node type stripping) and no id string
is retyped (zero-hardcoding).
