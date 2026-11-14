[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/accessibility](../README.md) / descriptionTracks

```ts
function descriptionTracks(stem, currentLocale): DescriptionTrack[]
```

Defined in: core/utils/media/accessibility.ts:91

All sixteen description-track descriptors for a media stem — one per
supported locale, each manifest-gated. `default` lands on the visitor's
current UI locale when that track is offered, else on English (the
canonical file the spec's naming contract guarantees).

## Parameters

### stem

`string`

Extensionless media stem — `storage + mediaSrc`.

### currentLocale

`string`

Active UI locale ('' ⇒ English default).

## Returns

[`DescriptionTrack`](../interfaces/DescriptionTrack.md)[]

Emittable tracks — possibly empty when the manifest proves
no description files exist for the media.
