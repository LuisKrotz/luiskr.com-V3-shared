[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/about/mesh](../README.md) / MeshSession

Defined in: website/components/home/about/mesh.ts:29

Live mesh session parked on the host.

## Properties

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: website/components/home/about/mesh.ts:30

---

### ctx

```ts
ctx: CanvasRenderingContext2D
```

Defined in: website/components/home/about/mesh.ts:31

---

### raf

```ts
raf: number
```

Defined in: website/components/home/about/mesh.ts:32

---

### ro

```ts
ro: ResizeObserver | null
```

Defined in: website/components/home/about/mesh.ts:33

---

### io

```ts
io: IntersectionObserver | null
```

Defined in: website/components/home/about/mesh.ts:34

---

### visible

```ts
visible: boolean
```

Defined in: website/components/home/about/mesh.ts:37

True only while the canvas intersects the viewport — the loop parks
offscreen instead of burning a ~3k-dot raster nobody can see.

---

### lastPaint

```ts
lastPaint: number
```

Defined in: website/components/home/about/mesh.ts:39

rAF timestamp of the last painted frame — the 60 Hz paint cap.

---

### w

```ts
w: number
```

Defined in: website/components/home/about/mesh.ts:40

---

### h

```ts
h: number
```

Defined in: website/components/home/about/mesh.ts:41

---

### t0

```ts
t0: number
```

Defined in: website/components/home/about/mesh.ts:42

---

### size

```ts
size: () => void;
```

Defined in: website/components/home/about/mesh.ts:44

Re-measures the canvas box and re-stamps the backing store.

#### Returns

`void`
