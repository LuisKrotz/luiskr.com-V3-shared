[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFDossier

Defined in: experiments/star-field/engine/types.ts:317

Lazy-loaded dossier JSON shape — `public/data/<locale>/<id>.json`.
Facts render as a definition list; `history`/`sections` are prose;
`source` credits the data provenance (NASA, ESO, …); `media` is a
curated gallery; `meta` carries the acquisition/translation signature.

## Extended by

- [`SFDossierFile`](SFDossierFile.md)

## Properties

### id

```ts
id: string
```

Defined in: experiments/star-field/engine/types.ts:318

---

### name

```ts
name: string
```

Defined in: experiments/star-field/engine/types.ts:319

---

### kind

```ts
kind: string
```

Defined in: experiments/star-field/engine/types.ts:320

---

### tagline

```ts
tagline: string
```

Defined in: experiments/star-field/engine/types.ts:321

---

### facts

```ts
facts: object[];
```

Defined in: experiments/star-field/engine/types.ts:322

#### label

```ts
label: string
```

#### value

```ts
value: string
```

---

### history

```ts
history: string
```

Defined in: experiments/star-field/engine/types.ts:323

---

### source

```ts
source: string
```

Defined in: experiments/star-field/engine/types.ts:324

---

### sections?

```ts
optional sections?: SFDossierSection[];
```

Defined in: experiments/star-field/engine/types.ts:326

Optional prose subsections for deep-history bodies.

---

### media?

```ts
optional media?: object;
```

Defined in: experiments/star-field/engine/types.ts:328

Downloaded gallery — images, videos, audio recordings.

#### images?

```ts
optional images?: SFDossierMedia[];
```

#### videos?

```ts
optional videos?: SFDossierMedia[];
```

#### audio?

```ts
optional audio?: SFDossierMedia[];
```

---

### meta?

```ts
optional meta?: SFDossierMeta;
```

Defined in: experiments/star-field/engine/types.ts:334

Acquisition/translation signature.
