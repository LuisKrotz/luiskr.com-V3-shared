[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/manifest](../README.md) / DocsGroup

Defined in: experiments/docs/manifest.ts:41

A view-synthesized section node — `buildGroups` always supplies the
children array and flags the node `group: true`, so the section type
narrows both fields required for scene/tree consumers.

## Extends

- [`DocsNode`](DocsNode.md)

## Properties

### type

```ts
type: 'dir' | 'file'
```

Defined in: experiments/docs/manifest.ts:22

#### Inherited from

[`DocsNode`](DocsNode.md).[`type`](DocsNode.md#type)

---

### name

```ts
name: string
```

Defined in: experiments/docs/manifest.ts:23

#### Inherited from

[`DocsNode`](DocsNode.md).[`name`](DocsNode.md#name)

---

### path

```ts
path: string
```

Defined in: experiments/docs/manifest.ts:24

#### Inherited from

[`DocsNode`](DocsNode.md).[`path`](DocsNode.md#path)

---

### id?

```ts
optional id?: string;
```

Defined in: experiments/docs/manifest.ts:26

#### Inherited from

[`DocsNode`](DocsNode.md).[`id`](DocsNode.md#id)

---

### mtime?

```ts
optional mtime?: string;
```

Defined in: experiments/docs/manifest.ts:27

#### Inherited from

[`DocsNode`](DocsNode.md).[`mtime`](DocsNode.md#mtime)

---

### aggregate?

```ts
optional aggregate?: boolean;
```

Defined in: experiments/docs/manifest.ts:30

Scene-only flag — `+N` aggregate leaves the leaf cap synthesizes
for surplus file children; the map colors them with the dir ink.

#### Inherited from

[`DocsNode`](DocsNode.md).[`aggregate`](DocsNode.md#aggregate)

---

### children

```ts
children: DocsNode[];
```

Defined in: experiments/docs/manifest.ts:42

#### Overrides

[`DocsNode`](DocsNode.md).[`children`](DocsNode.md#children)

---

### group

```ts
group: true
```

Defined in: experiments/docs/manifest.ts:43

View-synthesized section node — a disclosure wrapper the portal
tree/grid renders above the real roots (Source Code, Documentation,
Architecture Docs, Reports). Toggles only: no manifest path or
route exists for a section, so group rows never navigate.

#### Overrides

[`DocsNode`](DocsNode.md).[`group`](DocsNode.md#group)
