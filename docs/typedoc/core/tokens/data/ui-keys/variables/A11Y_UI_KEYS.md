[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/data/ui-keys](../README.md) / A11Y\_UI\_KEYS

```ts
const A11Y_UI_KEYS: Readonly<{
  A11Y_SECTION: 'a11y.section'
  A11Y_CAROUSEL: 'a11y.carousel'
  A11Y_PARAGRAPH: 'a11y.paragraph'
  A11Y_FOOTER: 'a11y.footer'
}>
```

Defined in: core/tokens/data/ui-keys.ts:169

Frozen a11y ui key map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime. Each value is a template carrying
the `{index}` placeholder (see A11Y_INDEX_TOKEN) — resolved by
indexedText() into the hidden navigation headings.
