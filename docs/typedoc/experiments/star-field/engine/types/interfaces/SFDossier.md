[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFDossier

Defined in: experiments/star-field/engine/types.ts:216

Lazy-loaded dossier JSON shape — `public/data/<locale>/<id>.json`.
Facts render as a definition list; `history`/`sections` are prose;
`source` credits the data provenance (NASA, ESO, …); `media` is a
curated gallery; `meta` carries the acquisition/translation signature.

## Extended by

- [`SFDossierFile`](SFDossierFile.md)

## Properties

### id

```ts
id: string;
```

Defined in: experiments/star-field/engine/types.ts:217

***

### name

```ts
name: string;
```

Defined in: experiments/star-field/engine/types.ts:218

***

### kind

```ts
kind: string;
```

Defined in: experiments/star-field/engine/types.ts:219

***

### tagline

```ts
tagline: string;
```

Defined in: experiments/star-field/engine/types.ts:220

***

### facts

```ts
facts: object[];
```

Defined in: experiments/star-field/engine/types.ts:221

#### label

```ts
label: string;
```

#### value

```ts
value: string;
```

***

### history

```ts
history: string;
```

Defined in: experiments/star-field/engine/types.ts:222

***

### source

```ts
source: string;
```

Defined in: experiments/star-field/engine/types.ts:223

***

### sections?

```ts
optional sections?: SFDossierSection[];
```

Defined in: experiments/star-field/engine/types.ts:225

Optional prose subsections for deep-history bodies.

***

### media?

```ts
optional media?: object;
```

Defined in: experiments/star-field/engine/types.ts:227

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

***

### meta?

```ts
optional meta?: SFDossierMeta;
```

Defined in: experiments/star-field/engine/types.ts:233

Acquisition/translation signature.
