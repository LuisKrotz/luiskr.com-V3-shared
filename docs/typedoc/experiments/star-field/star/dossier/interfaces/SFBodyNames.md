[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/dossier](../README.md) / SFBodyNames

Defined in: experiments/star-field/star/dossier.ts:37

Locale body-name table — `byId` feeds the navigator rows, hover
tooltips and the URL segment; `bySlug` (each name run through the
shared `slugify` — NFD-fold, lowercase, `-` runs) resolves translated
deep-link segments back to the canonical catalog id.

## Properties

### byId

```ts
byId: Map<string, string>
```

Defined in: experiments/star-field/star/dossier.ts:39

Canonical body id → localized display name.

---

### bySlug

```ts
bySlug: Map<string, string>
```

Defined in: experiments/star-field/star/dossier.ts:41

`slugify(localized name)` → canonical body id.
