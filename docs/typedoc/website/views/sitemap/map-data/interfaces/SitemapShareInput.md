[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/sitemap/map-data](../README.md) / SitemapShareInput

Defined in: website/views/sitemap/map-data.ts:147

One playground share-capture manifest the view fetched
(`/meta/<experiment>-share.json`) plus the localized per-capture
label (`pages.<experiment>.shareCapture`). `images`/`videos` hold
absolute CDN file URLs — the build emits one row per capture.

## Properties

### images?

```ts
optional images?: string[];
```

Defined in: website/views/sitemap/map-data.ts:149

Absolute screenshot URLs under the set's share/ prefix.

---

### videos?

```ts
optional videos?: string[];
```

Defined in: website/views/sitemap/map-data.ts:151

Absolute recorded-clip URLs under the same prefix.

---

### dims?

```ts
optional dims?: Record<string, number[]>;
```

Defined in: website/views/sitemap/map-data.ts:154

Capture URL → intrinsic [w,h] probed at manifest build time —
drives the wall's packed-card aspect (absent → generic box).

---

### label?

```ts
optional label?: string;
```

Defined in: website/views/sitemap/map-data.ts:156

Display-locale per-capture label ("Earth render"/"Star render").
