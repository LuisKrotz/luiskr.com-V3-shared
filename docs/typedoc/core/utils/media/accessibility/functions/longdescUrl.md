[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/accessibility](../README.md) / longdescUrl

```ts
function longdescUrl(stem, currentLocale): string
```

Defined in: core/utils/media/accessibility.ts:128

Localized longdesc URL for an image stem — the current locale's file
when offered, English canonical otherwise, `''` when the manifest
proves neither exists.

## Parameters

### stem

`string`

Extensionless media stem — `storage + mediaSrc`.

### currentLocale

`string`

Active UI locale.

## Returns

`string`

Emittable `longdesc`/`aria-details` URL or ''.
