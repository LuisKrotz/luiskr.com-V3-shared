[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/data](../README.md) / AnimDemoData

Defined in: website/components/media/anim-demo/data.ts:26

The demo payload — the pages/HOME node (portfoliolist + deck copy),
the pages/ABOUT node (mention_items + profilePicture) and the
components/related node (canonical featured flags) — the raw locale
objects the real components consume, matching the home view's three
data sources.

## Properties

### home

```ts
home: Record<string, unknown> | null
```

Defined in: website/components/media/anim-demo/data.ts:28

pages/<locale>/HOME — portfoliolist, deckHint, home copy.

---

### about

```ts
about: Record<string, unknown> | null
```

Defined in: website/components/media/anim-demo/data.ts:31

pages/<locale>/ABOUT — mention_items + profilePicture + bio.

---

### related

```ts
related:
  | Record<string, {
  featured?: unknown;
  link?: string;
}>
  | null;
```

Defined in: website/components/media/anim-demo/data.ts:34

components/<locale>/related — the canonical featured project flags.
