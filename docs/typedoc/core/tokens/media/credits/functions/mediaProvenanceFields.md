[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/media/credits](../README.md) / mediaProvenanceFields

```ts
function mediaProvenanceFields(fields): Record<string, unknown>
```

Defined in: core/tokens/media/credits.ts:132

Assembles the Schema.org provenance properties every media entity
(ImageObject/VideoObject) carries — `license` + `acquireLicensePage`
always resolve to the same target so Google Images can flag the asset
as licensable and land the click on the terms page. The property
names are declared once here for every emitter (runtime schema.ts,
share-gallery.ts, build-locale-pages.mjs) so the JSON-LD vocabulary
cannot drift between surfaces.

## Parameters

### fields

[`MediaProvenanceFields`](../interfaces/MediaProvenanceFields.md)

Resolved licence URL, notice and credit line.

## Returns

`Record`\<`string`, `unknown`\>

Field bag to spread into the entity literal.
