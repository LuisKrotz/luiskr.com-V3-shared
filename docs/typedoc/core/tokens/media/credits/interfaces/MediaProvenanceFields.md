[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/media/credits](../README.md) / MediaProvenanceFields

Defined in: core/tokens/media/credits.ts:107

Inputs for the shared media-provenance field bag.

## Properties

### licenseUrl?

```ts
optional licenseUrl?: string;
```

Defined in: core/tokens/media/credits.ts:113

Absolute licence URL — the locale's legal page for site-owned
assets, the source's terms page for credited third-party assets.
Undefined omits both licence properties.

---

### copyrightNotice?

```ts
optional copyrightNotice?: string;
```

Defined in: core/tokens/media/credits.ts:116

Copyright/attribution notice — '© owner' for owned assets, the raw
credit for third-party ones.

---

### creditText?

```ts
optional creditText?: string;
```

Defined in: core/tokens/media/credits.ts:118

Structured credit line — owner name or `creditTextFor` output.
