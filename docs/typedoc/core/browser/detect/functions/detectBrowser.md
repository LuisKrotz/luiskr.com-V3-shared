[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/browser/detect](../README.md) / detectBrowser

```ts
function detectBrowser(ua): BrowserInfo;
```

Defined in: core/browser/detect.ts:45

Parses a UA string against BROWSERS. Regex `pattern` strings keep their
escaped form so the same table survives JSON serialization into the
inlined `__LK` manifest. The loop walks the ordered table and returns on
first match — order is load-bearing (see browsers.ts header).

## Parameters

### ua

`string`

User-Agent string to classify.

## Returns

[`BrowserInfo`](../interfaces/BrowserInfo.md)

Engine identity; `other/0` when no pattern matches.
