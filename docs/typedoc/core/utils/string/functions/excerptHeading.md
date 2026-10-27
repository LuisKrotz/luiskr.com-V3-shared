[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/string](../README.md) / excerptHeading

```ts
function excerptHeading(text): string
```

Defined in: core/utils/string.ts:60

Builds a short heading from a block of content text: markup strips via
the iterated sanitizer, whitespace collapses, and the first
HEADING_EXCERPT_WORDS words are kept with a trailing ellipsis when the
text runs longer — the incipit names the block after its own content
("Joining Dell on June 6th, 2022…") instead of a meaningless ordinal.
Returns '' for empty/non-string input so callers can fall back to a
generic localized label.
Pure ESM utility function, tree-shakeable.

## Parameters

### text

`string`

Raw block text (markup tolerated).

## Returns

`string`

Heading excerpt or ''.
