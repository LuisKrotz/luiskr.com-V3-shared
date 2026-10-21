[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/string](../README.md) / splitDrawSentences

```ts
function splitDrawSentences(text): string[]
```

Defined in: core/utils/string.ts:173

Splits a paragraph into sentence runs for staged draw-text reveals.
A boundary is terminal punctuation (. ! ? …) followed by whitespace —
mid-word dots without a following space ("Three.js", CDN paths) never
split. The delimiter whitespace is consumed; callers join runs with a
real space node so inline wrapping is preserved. Text with no
boundary returns as a single run; empty input returns [].

## Parameters

### text

`string`

Raw paragraph text.

## Returns

`string`[]

Sentence strings in document order, whitespace-trimmed.
