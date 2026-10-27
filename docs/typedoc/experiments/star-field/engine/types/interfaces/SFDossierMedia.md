[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFDossierMedia

Defined in: experiments/star-field/engine/types.ts:359

One media asset inside a dossier — the file lives under
`public/media/<id>/` and renders with caption + credit (NASA/ESA/…
attribution is required by the sources' usage terms).

## Properties

### src

```ts
src: string
```

Defined in: experiments/star-field/engine/types.ts:361

Asset path relative to `SF_DATA_BASE`-adjacent media root.

---

### caption?

```ts
optional caption?: string;
```

Defined in: experiments/star-field/engine/types.ts:363

Localized caption/alt text.

---

### credit?

```ts
optional credit?: string;
```

Defined in: experiments/star-field/engine/types.ts:365

Credit line (e.g. "NASA/JPL-Caltech/MSSS").

---

### poster?

```ts
optional poster?: string;
```

Defined in: experiments/star-field/engine/types.ts:367

Poster frame for videos (relative path).
