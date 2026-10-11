[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [website/views/project/types](../README.md) / ProjectTranslations

Defined in: website/views/project/types.ts:46

The project's translation node — `title`, `noindex` SEO flag,
`folder` CDN prefix, `cover`, and `sections` (array of SectionChild arrays).
Index signature preserves CMS fields the view doesn't consume.

## Indexable

```ts
[key: string]: unknown
```

## Properties

### title?

```ts
optional title?: string;
```

Defined in: website/views/project/types.ts:47

***

### noindex?

```ts
optional noindex?: boolean;
```

Defined in: website/views/project/types.ts:48

***

### folder?

```ts
optional folder?: string;
```

Defined in: website/views/project/types.ts:49

***

### cover?

```ts
optional cover?: CoverMedia;
```

Defined in: website/views/project/types.ts:50

***

### sections?

```ts
optional sections?: SectionChild[][];
```

Defined in: website/views/project/types.ts:51
