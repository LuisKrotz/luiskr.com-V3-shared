[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/types](../README.md) / MentionItem

Defined in: website/components/carousel/mentions-deck/types.ts:13

A mention_items row as pushed by the store — `link` is the outbound
award URL, `media` the optional badge image (path + intrinsic size for
aspect layout), `icon`/`description`/`label` the rendered copy fields.
All optional: cards tolerate partial CMS rows without render guards.

## Properties

### link?

```ts
optional link?: string;
```

Defined in: website/components/carousel/mentions-deck/types.ts:15

Outbound award/mention URL.

---

### media?

```ts
optional media?: object;
```

Defined in: website/components/carousel/mentions-deck/types.ts:17

Badge/trophy image descriptor — path joins the CDN storage base.

#### path?

```ts
optional path?: string;
```

#### width?

```ts
optional width?: string | number;
```

#### height?

```ts
optional height?: string | number;
```

---

### icon?

```ts
optional icon?: string;
```

Defined in: website/components/carousel/mentions-deck/types.ts:19

Emoji/glyph fallback shown when no media ships.

---

### description?

```ts
optional description?: string;
```

Defined in: website/components/carousel/mentions-deck/types.ts:21

Card copy — may carry `<br>`/inline markup from the CMS.

---

### label?

```ts
optional label?: string;
```

Defined in: website/components/carousel/mentions-deck/types.ts:23

Accessible label when description is absent.
