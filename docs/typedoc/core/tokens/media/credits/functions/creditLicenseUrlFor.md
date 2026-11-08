[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/media/credits](../README.md) / creditLicenseUrlFor

```ts
function creditLicenseUrlFor(credit): string | undefined
```

Defined in: core/tokens/media/credits.ts:103

Resolves the canonical licence-terms URL for a registry credit — the
SOURCE's page (NASA media guidelines, Commons licensing), never the
site's. Returns undefined for credits without a source record so
emitters omit the licence pair rather than misattribute the asset.

## Parameters

### credit

`string`

Raw registry credit string (e.g. 'NASA').

## Returns

`string` \| `undefined`

Absolute licence URL, or undefined when the credit is unmapped.
