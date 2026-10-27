[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/manifest](../README.md) / coverVariants

```ts
function coverVariants(coverJpg): CoverVariants
```

Defined in: core/utils/media/manifest.ts:262

Resolves the progressive cover matrix for one `covers/<stem>.jpg` URL:
the kodak LQIP blur-up (plus its 768px mobile tier and webp siblings)
as the first paint, and `rungs` as the ascending quality ladder the
high layer climbs once bytes confirm — q50 → q75 → original →
uncompressed, highest proven tier last. Every variant is gated on
`mediaKeyExists` so an unproven object can never become a card's only
image; a missing/never-loaded manifest yields the original URL with
its own webp probe and no ladder (`rungs` stays empty).

## Parameters

### coverJpg

`string`

Emission-encoded covers/*.jpg URL (original).

## Returns

[`CoverVariants`](../interfaces/CoverVariants.md)

Bound URLs for picture/img — empty strings mean "omit".
