[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFDossierFile

Defined in: experiments/star-field/engine/types.ts:426

Raw `public/data/<locale>/<id>.json` file shape — each locale folder
ships one self-contained dossier per body so only the active language
downloads; `id`, `kind` and `source` are locale-neutral.

## Extends

- [`SFDossier`](SFDossier.md)

## Properties

### id

```ts
id: string
```

Defined in: experiments/star-field/engine/types.ts:402

#### Inherited from

[`SFDossier`](SFDossier.md).[`id`](SFDossier.md#id)

---

### name

```ts
name: string
```

Defined in: experiments/star-field/engine/types.ts:403

#### Inherited from

[`SFDossier`](SFDossier.md).[`name`](SFDossier.md#name)

---

### kind

```ts
kind: string
```

Defined in: experiments/star-field/engine/types.ts:404

#### Inherited from

[`SFDossier`](SFDossier.md).[`kind`](SFDossier.md#kind)

---

### tagline

```ts
tagline: string
```

Defined in: experiments/star-field/engine/types.ts:405

#### Inherited from

[`SFDossier`](SFDossier.md).[`tagline`](SFDossier.md#tagline)

---

### facts

```ts
facts: object[];
```

Defined in: experiments/star-field/engine/types.ts:406

#### label

```ts
label: string
```

#### value

```ts
value: string
```

#### Inherited from

[`SFDossier`](SFDossier.md).[`facts`](SFDossier.md#facts)

---

### history

```ts
history: string
```

Defined in: experiments/star-field/engine/types.ts:407

#### Inherited from

[`SFDossier`](SFDossier.md).[`history`](SFDossier.md#history)

---

### source

```ts
source: string
```

Defined in: experiments/star-field/engine/types.ts:408

#### Inherited from

[`SFDossier`](SFDossier.md).[`source`](SFDossier.md#source)

---

### sections?

```ts
optional sections?: SFDossierSection[];
```

Defined in: experiments/star-field/engine/types.ts:410

Optional prose subsections for deep-history bodies.

#### Inherited from

[`SFDossier`](SFDossier.md).[`sections`](SFDossier.md#sections)

---

### media?

```ts
optional media?: object;
```

Defined in: experiments/star-field/engine/types.ts:412

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

#### Inherited from

[`SFDossier`](SFDossier.md).[`media`](SFDossier.md#media)

---

### meta?

```ts
optional meta?: SFDossierMeta;
```

Defined in: experiments/star-field/engine/types.ts:418

Acquisition/translation signature.

#### Inherited from

[`SFDossier`](SFDossier.md).[`meta`](SFDossier.md#meta)

---

### namedStars?

```ts
optional namedStars?: object[];
```

Defined in: experiments/star-field/engine/types.ts:432

Locale-neutral proper-named star table shipped inside
`en/milky-way.json` — real HYG catalogue entries (heliocentric
light-years) kept for future labels and the browse index.

#### name

```ts
name: string
```

#### x

```ts
x: number
```

#### y

```ts
y: number
```

#### z

```ts
z: number
```

#### mag

```ts
mag: number
```

#### spect

```ts
spect: string
```

#### con

```ts
con: string
```

#### dist\_ly

```ts
dist_ly: number
```
