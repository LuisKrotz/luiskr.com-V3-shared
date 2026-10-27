[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/loaders/skeleton-webgl](../README.md) / SkelRect

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:42

One measured placeholder: geometry (CSS px) + sampled palette for the shader.

## Properties

### x

```ts
x: number
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:44

Left edge relative to the layer canvas origin.

---

### y

```ts
y: number
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:46

Top edge relative to the layer canvas origin.

---

### w

```ts
w: number
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:48

Box width in CSS px.

---

### h

```ts
h: number
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:50

Box height in CSS px.

---

### radius

```ts
radius: number
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:52

Corner radius in CSS px — matches the placeholder's own border-radius.

---

### cell

```ts
cell: number
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:54

Glyph cell size driving the procedural 0/1 grid density.

---

### row

```ts
row: number
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:56

Row index within a text placeholder (0 for media blocks).

---

### base

```ts
base: number[];
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:58

Parsed [r,g,b,a] base fill 0–1 floats for the u_sbase uniform array.

---

### ink

```ts
ink: number[];
```

Defined in: core/utils/canvas/loaders/skeleton-webgl.ts:60

Parsed [r,g,b,a] ink/glyph floats for the u_sink uniform array.
