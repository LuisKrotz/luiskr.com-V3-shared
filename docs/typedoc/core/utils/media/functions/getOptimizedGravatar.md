[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/utils/media](../README.md) / getOptimizedGravatar

```ts
function getOptimizedGravatar(urlStr, size?): string;
```

Defined in: core/utils/media.ts:90

Replaces the `size=` parameter on a Gravatar URL. Non-Gravatar URLs pass
through unchanged (the param is meaningless off-domain), and a URL with
no `size=` is left alone since the regex finds no match.

## Parameters

### urlStr

`string`

Candidate Gravatar URL.

### size?

`number` = `300`

Pixel edge to request (default 300 — the rendered avatar box).

## Returns

`string`

Rewritten URL, original URL, or '' for non-string input.
