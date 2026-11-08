[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/project/types](../README.md) / ProjectMediaItem

Defined in: website/views/project/types.ts:14

A media row inside a project section — `src` is the extensionless CDN
stem, `size` the intrinsic [w,h] for aspect layout, `label`/`class`/`isVideo` the
optional render modifiers. Index signature passes through extra CMS fields.

## Indexable

```ts
[key: string]: unknown
```

## Properties

### src

```ts
src: string
```

Defined in: website/views/project/types.ts:15

---

### size

```ts
size: number[];
```

Defined in: website/views/project/types.ts:16

---

### naturalSize?

```ts
optional naturalSize?: number[];
```

Defined in: website/views/project/types.ts:18

Original CMS `size` — set only when `size` was downscaled through the desktop ladder (the expand modal reads this; it never reduces).

---

### label?

```ts
optional label?: string;
```

Defined in: website/views/project/types.ts:19

---

### class?

```ts
optional class?: string;
```

Defined in: website/views/project/types.ts:20

---

### isVideo?

```ts
optional isVideo?: boolean;
```

Defined in: website/views/project/types.ts:21
