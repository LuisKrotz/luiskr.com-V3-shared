[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/media/credits](../README.md) / MediaCreditSource

Defined in: core/tokens/media/credits.ts:17

Source record for one third-party credit string.

## Properties

### source

```ts
source: string
```

Defined in: core/tokens/media/credits.ts:19

Human-readable originating agency or collection.

---

### host

```ts
host: string
```

Defined in: core/tokens/media/credits.ts:21

Original host the asset is published on.

---

### license

```ts
license: string
```

Defined in: core/tokens/media/credits.ts:23

Licence posture as published by the source.

---

### licenseUrl

```ts
licenseUrl: string
```

Defined in: core/tokens/media/credits.ts:31

Canonical page stating the source's licence terms — emitted as
ImageObject/VideoObject `license` + `acquireLicensePage` for credited
assets so the licensable badge lands on the real terms page, never
the site's own legal page (the site's MPL grant does not cover
third-party imagery).
