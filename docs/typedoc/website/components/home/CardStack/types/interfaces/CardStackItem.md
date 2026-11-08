[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/types](../README.md) / CardStackItem

Defined in: website/components/home/cardstack/types.ts:12

A portfoliolist entry as pushed by the view — `link` joins to project
routes, `featured` selects the deck subset, and the index signature
passes through extra CMS fields untouched.

## Indexable

```ts
[key: string]: unknown
```

## Properties

### link?

```ts
optional link?: string;
```

Defined in: website/components/home/cardstack/types.ts:14

Route the card links to.

---

### image?

```ts
optional image?: string;
```

Defined in: website/components/home/cardstack/types.ts:16

Cover image stem.

---

### label?

```ts
optional label?: string;
```

Defined in: website/components/home/cardstack/types.ts:18

Accessible label.

---

### title?

```ts
optional title?: string;
```

Defined in: website/components/home/cardstack/types.ts:20

Card heading.

---

### description?

```ts
optional description?: string;
```

Defined in: website/components/home/cardstack/types.ts:22

Body copy (may carry `<br>` markup from the CMS).

---

### category?

```ts
optional category?: string;
```

Defined in: website/components/home/cardstack/types.ts:24

Optional index subtitle (category/tagline when the CMS provides one).

---

### subtitle?

```ts
optional subtitle?: string;
```

Defined in: website/components/home/cardstack/types.ts:25

---

### featured?

```ts
optional featured?: boolean;
```

Defined in: website/components/home/cardstack/types.ts:27

Deck membership — featured items fan in the stack.
