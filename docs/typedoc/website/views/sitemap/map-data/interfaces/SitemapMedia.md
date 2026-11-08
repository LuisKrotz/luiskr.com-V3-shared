[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/sitemap/map-data](../README.md) / SitemapMedia

Defined in: website/views/sitemap/map-data.ts:72

One card's media payload — the view resolves `kind` to its element:
'figure' mounts <media-figure> (the progressive thumb→ladder loader;
`src` is the extensionless CDN stem, folder already joined), 'img'
mounts a plain lazy <img> at the absolute capture URL (playground
share screenshots have no mozjpeg ladder — the file IS the source).

## Properties

### kind

```ts
kind: 'figure' | 'img'
```

Defined in: website/views/sitemap/map-data.ts:74

Renderer pick — 'figure' | 'img'.

---

### src

```ts
src: string
```

Defined in: website/views/sitemap/map-data.ts:77

'figure': extensionless stem relative to the CDN base.
'img': the absolute file URL.

---

### isVideo?

```ts
optional isVideo?: boolean;
```

Defined in: website/views/sitemap/map-data.ts:79

Video flag — figure videos autoplay muted in viewport.

---

### size?

```ts
optional size?: number[];
```

Defined in: website/views/sitemap/map-data.ts:81

Intrinsic [w,h] from the CMS record — drives mosaic packing.

---

### canExpand?

```ts
optional canExpand?: boolean;
```

Defined in: website/views/sitemap/map-data.ts:83

Expand-modal affordance (project media only).
