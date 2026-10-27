[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/manifest](../README.md) / DocsNode

Defined in: experiments/docs/manifest.ts:21

One manifest node — dir carries children, file carries id + mtime.

## Extended by

- [`DocsGroup`](DocsGroup.md)

## Properties

### type

```ts
type: 'dir' | 'file'
```

Defined in: experiments/docs/manifest.ts:22

---

### name

```ts
name: string
```

Defined in: experiments/docs/manifest.ts:23

---

### path

```ts
path: string
```

Defined in: experiments/docs/manifest.ts:24

---

### children?

```ts
optional children?: DocsNode[];
```

Defined in: experiments/docs/manifest.ts:25

---

### id?

```ts
optional id?: string;
```

Defined in: experiments/docs/manifest.ts:26

---

### mtime?

```ts
optional mtime?: string;
```

Defined in: experiments/docs/manifest.ts:27

---

### aggregate?

```ts
optional aggregate?: boolean;
```

Defined in: experiments/docs/manifest.ts:30

Scene-only flag — `+N` aggregate leaves the leaf cap synthesizes
for surplus file children; the map colors them with the dir ink.

---

### group?

```ts
optional group?: boolean;
```

Defined in: experiments/docs/manifest.ts:35

View-synthesized section node — a disclosure wrapper the portal
tree/grid renders above the real roots (Source Code, Documentation,
Architecture Docs, Reports). Toggles only: no manifest path or
route exists for a section, so group rows never navigate.
