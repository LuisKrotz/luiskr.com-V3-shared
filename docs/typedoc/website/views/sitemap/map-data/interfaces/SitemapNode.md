[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/sitemap/map-data](../README.md) / SitemapNode

Defined in: website/views/sitemap/map-data.ts:34

One node of the sitemap link tree — groups, pages and leaves.

## Properties

### label

```ts
label: string
```

Defined in: website/views/sitemap/map-data.ts:36

Visible label — group name, page title, locale code or filename.

---

### href

```ts
href: string
```

Defined in: website/views/sitemap/map-data.ts:38

Navigation target — empty on the synthetic root and on groups.

---

### depth

```ts
depth: number
```

Defined in: website/views/sitemap/map-data.ts:40

Tree depth (0 root, 1 group, 2 page, 3 leaf).

---

### children

```ts
children: SitemapNode[];
```

Defined in: website/views/sitemap/map-data.ts:42

Child nodes — empty on leaves.

---

### dir

```ts
dir: boolean
```

Defined in: website/views/sitemap/map-data.ts:44

True on group + page nodes (the layout's "dir" flag).

---

### locale?

```ts
optional locale?: string;
```

Defined in: website/views/sitemap/map-data.ts:46

Locale code when the leaf is a localized page variant.

---

### tip?

```ts
optional tip?: string;
```

Defined in: website/views/sitemap/map-data.ts:48

Descriptive tooltip — the media object's CMS label.

---

### media?

```ts
optional media?: SitemapMedia;
```

Defined in: website/views/sitemap/map-data.ts:51

Card media payload — present only on media-bearing page nodes
(project media + playground share captures).

---

### collapsible?

```ts
optional collapsible?: boolean;
```

Defined in: website/views/sitemap/map-data.ts:53

Group renders collapsed; the children mount on first open.

---

### mosaic?

```ts
optional mosaic?: boolean;
```

Defined in: website/views/sitemap/map-data.ts:56

Group children lay out as a packed media-card wall (the skyline
masonry), not the stacked page list.

---

### wide?

```ts
optional wide?: boolean;
```

Defined in: website/views/sitemap/map-data.ts:60

Group spans the full index grid and flows its page rows into
multi-column tracks — long flat lists (portfolio) stop reading
as one tall single column.

---

### key?

```ts
optional key?: string;
```

Defined in: website/views/sitemap/map-data.ts:64

Stable group id (SitemapGroupKey) — locale-proof identity for the
view's open-state map and aria-controls region ids. Set on every
group node; page/leaf nodes leave it undefined.
