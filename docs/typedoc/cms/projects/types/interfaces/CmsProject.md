[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/projects/types](../README.md) / CmsProject

Defined in: cms/projects/types.ts:25

The persisted CMS project document shape.

## Properties

### title

```ts
title: string;
```

Defined in: cms/projects/types.ts:27

Project title (heading + metadata).

***

### folder

```ts
folder: string;
```

Defined in: cms/projects/types.ts:29

CDN folder prefix all media resolves under.

***

### seo

```ts
seo: object;
```

Defined in: cms/projects/types.ts:31

SEO flags — noIndex removes the project from crawlers/schema.

#### noIndex

```ts
noIndex: boolean;
```

***

### cover

```ts
cover: CmsMediaItem;
```

Defined in: cms/projects/types.ts:33

Cover media shown in mosaics/cards.

***

### sections

```ts
sections: CmsSection[];
```

Defined in: cms/projects/types.ts:35

Ordered content sections.
