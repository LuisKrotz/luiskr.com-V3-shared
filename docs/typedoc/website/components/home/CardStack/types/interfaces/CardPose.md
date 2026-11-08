[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/types](../README.md) / CardPose

Defined in: website/components/home/cardstack/types.ts:36

The computed coverflow pose for one card — written into inline styles
by applyPoses(); `visible` also drives the --hidden class and the
reveal/dissolve transitions.

## Properties

### x

```ts
x: number
```

Defined in: website/components/home/cardstack/types.ts:38

Horizontal centre offset from the deck centre (px).

---

### y

```ts
y: number
```

Defined in: website/components/home/cardstack/types.ts:41

Vertical centre offset from the deck centre (px) — 0 on fan tiers;
the stacked tiers' down-right cascade carries it.

---

### depth

```ts
depth: number
```

Defined in: website/components/home/cardstack/types.ts:43

Z recess (px, ≤ 0) — the perspective divide shrinks the card.

---

### rot

```ts
rot: number
```

Defined in: website/components/home/cardstack/types.ts:45

Y-axis turn (deg) — side cards face the front card on fan tiers.

---

### rotZ

```ts
rotZ: number
```

Defined in: website/components/home/cardstack/types.ts:48

Z-axis tilt (deg) — 0 on fan tiers; the stacked cascade leans
deeper cards like a dealt deck.

---

### opacity

```ts
opacity: number
```

Defined in: website/components/home/cardstack/types.ts:50

Opacity written for visible cards.

---

### scale

```ts
scale: number
```

Defined in: website/components/home/cardstack/types.ts:54

Extra scale — the fan's active-card boost (CARD_STACK_LAYOUT.
FRONT_SCALE) easing to 1 as the card slides away; 1 on stacked
tiers.

---

### z

```ts
z: number
```

Defined in: website/components/home/cardstack/types.ts:56

z-index ladder — the front card paints on top.

---

### visible

```ts
visible: boolean
```

Defined in: website/components/home/cardstack/types.ts:58

Inside the per-side peek window.
