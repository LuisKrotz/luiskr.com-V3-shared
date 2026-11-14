[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/sections](../README.md) / normalizeSection

```ts
function normalizeSection(s): CmsSection
```

Defined in: cms/projects/sections.ts:17

Coerces a stored section into the canonical `[texts, media]` tuple —
accepts the tuple form directly, the legacy object form
(`{texts, media}`), and anything else as an empty pair. The renderer
and event writers index `[0]`/`[1]`, so every read path funnels
through here before touching the model.

## Parameters

### s

`unknown`

— raw DB value (tuple, object, or garbage)

## Returns

[`CmsSection`](../../types/type-aliases/CmsSection.md)

`[paragraphs, mediaItems]` — never null, always arrays
