[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/locale/reader-content](../README.md) / updateReaderContent

```ts
function updateReaderContent(path): Promise<void>
```

Defined in: core/locale/reader-content.ts:58

Replaces the reader article's markup with the prerendered article of
`path`'s static page. Responses are cached per path; fetches race
safely via the generation counter. A page without a reader article
clears the holder (reader mode then correctly finds nothing to offer).

## Parameters

### path

`string`

URL path to mirror (e.g. window.location.pathname).

## Returns

`Promise`\<`void`\>
