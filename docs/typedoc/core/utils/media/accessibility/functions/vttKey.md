[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/accessibility](../README.md) / vttKey

```ts
function vttKey(stem, locale): string
```

Defined in: core/utils/media/accessibility.ts:53

Bucket key (or URL) of a locale's descriptions track for a media stem —
`<stem>.vtt` for English (the spec's identical-name contract), dotted
`<stem>.<locale>.vtt` for every other language.

## Parameters

### stem

`string`

Extensionless media stem — `<storage><folder><src>` form at
runtime, `<folder><src>` form in the pipeline.

### locale

`string`

Site locale code.

## Returns

`string`

The sibling key/URL — same shape the caller handed in.
