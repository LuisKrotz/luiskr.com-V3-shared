[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFDossierMedia

Defined in: experiments/star-field/engine/types.ts:274

One media asset inside a dossier — the file lives under
`public/media/<id>/` and renders with caption + credit (NASA/ESA/…
attribution is required by the sources' usage terms).

## Properties

### src

```ts
src: string
```

Defined in: experiments/star-field/engine/types.ts:276

Asset path relative to `SF_DATA_BASE`-adjacent media root.

---

### caption?

```ts
optional caption?: string;
```

Defined in: experiments/star-field/engine/types.ts:278

Localized caption/alt text.

---

### credit?

```ts
optional credit?: string;
```

Defined in: experiments/star-field/engine/types.ts:280

Credit line (e.g. "NASA/JPL-Caltech/MSSS").

---

### poster?

```ts
optional poster?: string;
```

Defined in: experiments/star-field/engine/types.ts:282

Poster frame for videos (relative path).
