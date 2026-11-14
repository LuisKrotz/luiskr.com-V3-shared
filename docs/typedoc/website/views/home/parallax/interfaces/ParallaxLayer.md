[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/home/parallax](../README.md) / ParallaxLayer

Defined in: website/views/home/parallax.ts:67

A moving layer: `el` receives inline vars whose translate3d consumers
live INSIDE the element's shadow tree (its own box never transforms),
and `measureEl` supplies the document-space geometry. Because only
inner content moves, every measured rect is always untransformed —
no painted-position correction is ever needed.

## Properties

### el

```ts
el: HTMLElement
```

Defined in: website/views/home/parallax.ts:69

Element receiving the inline CSS vars.

---

### measureEl

```ts
measureEl: HTMLElement
```

Defined in: website/views/home/parallax.ts:71

Element measured for document-space position.

---

### top

```ts
top: number
```

Defined in: website/views/home/parallax.ts:73

Cached untransformed document-space top (px).

---

### height

```ts
height: number
```

Defined in: website/views/home/parallax.ts:75

Cached border-box height (px).

---

### writes

```ts
writes: ParallaxWrite[];
```

Defined in: website/views/home/parallax.ts:77

Per-var writes applied each tick.
