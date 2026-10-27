[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/string](../README.md) / mediaSlugSeq

```ts
function mediaSlugSeq(seen, label): string
```

Defined in: core/utils/string.ts:235

Assigns the canonical deep-link slug for one media item within a
project's traversal. Distinct captions can collapse to the same slug
("Fórum 2020, Full page" vs "Fórum 2020: Full Page"), which used to
silently drop the second item's indexable URL everywhere. The first
occurrence keeps the base slug; later ones gain `-2`, `-3`, … in
document order — every labelled item stays uniquely addressable.
The base slug is first capped at MEDIA_SLUG_MAX_LENGTH so
prerendered dist paths stay under Windows MAX_PATH — the cap cuts at
the length then drops the trailing partial word (and a dangling
hyphen) so the slug always ends on a hyphen boundary; ordinal suffixes
disambiguate any collisions the cut introduces.
Callers iterate items in traversal order sharing one `seen` map; the
same map/count convention is mirrored in the build scripts
(generate-sitemap.js + build-locale-pages.mjs) so emitted file names,
sitemap <loc>s and runtime resolution agree.

## Parameters

### seen

`Map`\<`string`, `number`\>

Per-project base-slug → assigned-count map (mutated).

### label

`string`

The item's caption.

## Returns

`string`

The item's unique deep-link slug ('' when unslugifiable).
