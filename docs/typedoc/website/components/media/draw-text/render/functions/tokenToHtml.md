[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/render](../README.md) / tokenToHtml

```ts
function tokenToHtml(token, renderWord, ctx?): string
```

Defined in: website/components/media/draw-text/render.ts:276

Top-level token → HTML: <br> and space become aria-hidden layout
nodes (the space gets a span so the flex/grid layout sees a real box),
words render animated chars, tags recurse. Unknown token types return
"" — forward-compatible for tokenizer additions.

## Parameters

### token

[`DrawToken`](../../types/interfaces/DrawToken.md)

The parsed token.

### renderWord

`RenderWord`

Word renderer bound to the current delay/offset.

### ctx?

[`DrawRenderCtx`](../interfaces/DrawRenderCtx.md)

## Returns

`string`

HTML string for the token.
