[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/loaders/skeleton-webgl](../README.md) / SkelStyle

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:27

Per-placeholder computed style, cached between measures (cleared on theme flip).

## Properties

### lineHeight

```ts
lineHeight: number
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:29

Computed line-height — text placeholders tile glyph rows against it.

---

### radius

```ts
radius: number
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:31

Computed border-radius — forwarded to the shader's corner rounding.

---

### textLike

```ts
textLike: boolean
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:33

Whether this placeholder is a text line (vs a media block).

---

### baseStr

```ts
baseStr: string
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:35

Raw CSS color string for the base fill — parsed lazily.

---

### inkStr

```ts
inkStr: string
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:37

Raw CSS color string for the ink/glyph color — parsed lazily.
