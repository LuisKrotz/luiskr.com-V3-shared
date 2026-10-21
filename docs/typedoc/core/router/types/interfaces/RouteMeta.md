[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/router/types](../README.md) / RouteMeta

Defined in: core/router/types.ts:12

Metadata one route contributes to the document — `title`/`translation` feed
the head, `scrollTo` a post-nav anchor, `projectRoute`/`legalRoute` classify the
page for schema/analytics treatment.

## Properties

### title?

```ts
optional title?: string;
```

Defined in: core/router/types.ts:13

---

### description?

```ts
optional description?: string;
```

Defined in: core/router/types.ts:15

Meta description text — synced into description/og/twitter/DC metas.

---

### canonical?

```ts
optional canonical?: string;
```

Defined in: core/router/types.ts:17

Canonical path override — normalizes alias/legacy URLs to their canonical slug.

---

### translation?

```ts
optional translation?: string;
```

Defined in: core/router/types.ts:18

---

### scrollTo?

```ts
optional scrollTo?: string;
```

Defined in: core/router/types.ts:19

---

### projectRoute?

```ts
optional projectRoute?: boolean;
```

Defined in: core/router/types.ts:20

---

### legalRoute?

```ts
optional legalRoute?: boolean;
```

Defined in: core/router/types.ts:21

---

### docsRoute?

```ts
optional docsRoute?: boolean;
```

Defined in: core/router/types.ts:23

English-only docs portal — suppresses the language switcher.
