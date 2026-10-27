[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/locale/ui-text](../README.md) / indexedText

```ts
function indexedText(path, index): string
```

Defined in: core/locale/ui-text.ts:71

Resolves an indexed a11y template (`a11y.section` / `a11y.carousel` /
`a11y.paragraph`) and substitutes the `{index}` placeholder with the
1-based ordinal — the hidden navigation headings that let assistive-tech
users jump straight to a section, carousel, or paragraph. Templates keep
the placeholder so translators position the number freely.

## Parameters

### path

`string`

dotted APP path, e.g. A11Y_UI_KEYS.A11Y_SECTION

### index

`number`

1-based ordinal inserted at the {index} placeholder

## Returns

`string`

the localized label, e.g. 'Section 2' / 'Seção 2'
