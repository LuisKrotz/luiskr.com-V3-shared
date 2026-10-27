[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/render](../README.md) / plainTokensToHtml

```ts
function plainTokensToHtml(tokens, insideTag?): string
```

Defined in: website/components/media/draw-text/render.ts:310

Plain-mode assembly — consecutive word/space/br tokens collapse into
ONE aria-hidden span per run (a run can hold an entire paragraph), and
tag tokens emit real elements via plainTagToHtml so interactive
content stays reachable. Top-level spaces are literal (natural
width — the same metrics the span modes use); inside a tag they are
nbsp — the same unbreakable rule the animated render applies inside
links (a link's words stay one visual unit).

## Parameters

### tokens

[`DrawToken`](../../types/interfaces/DrawToken.md)[]

Parsed top-level tokens.

### insideTag?

`boolean` = `false`

True when collapsing a tag's inner chunks — spaces
become nbsp per the in-link/in-tag rule above.

## Returns

`string`

The assembled plain-mode HTML.
Exported so the run-collapse and malformed-token fallbacks are
unit-testable — same contract as tokenToHtml/renderWordHtml.
