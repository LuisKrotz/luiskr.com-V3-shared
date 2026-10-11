[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/portfolio/related/types](../README.md) / RelatedTranslations

Defined in: website/components/portfolio/related/types.ts:36

The components/related DB node as consumed by <portfolio-related> —
`projects`/`socials` may arrive keyed-object or array from Firebase,
`path` is the portfolio base route, `note`/`title` the footer copy.

## Properties

### title?

```ts
optional title?: string;
```

Defined in: website/components/portfolio/related/types.ts:37

***

### projects?

```ts
optional projects?: 
  | Record<string, RelatedProject>
  | RelatedProject[];
```

Defined in: website/components/portfolio/related/types.ts:38

***

### path?

```ts
optional path?: string;
```

Defined in: website/components/portfolio/related/types.ts:39

***

### socials?

```ts
optional socials?: 
  | Record<string, RelatedSocial>
  | RelatedSocial[];
```

Defined in: website/components/portfolio/related/types.ts:40

***

### note?

```ts
optional note?: string;
```

Defined in: website/components/portfolio/related/types.ts:41
