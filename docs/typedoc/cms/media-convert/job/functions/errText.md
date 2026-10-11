[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / errText

```ts
function errText(res, fallback): Promise<string>;
```

Defined in: cms/media-convert/job.ts:200

Extracts the server's `error` field from a JSON error body; falls back
to the given message — or a dev-server hint on 404 (the API only exists
under the dev middleware, so a 404 there means "not running dev").

## Parameters

### res

`Response`

The failed Response.

### fallback

`string`

Message used when the body has no `error`.

## Returns

`Promise`\<`string`\>

The human-readable error.
