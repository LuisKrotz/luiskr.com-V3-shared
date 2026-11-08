[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/card-stack](../README.md) / CardStackFanTier

Defined in: core/tokens/motion/card-stack.ts:50

Landscape-card coverflow tier (768+ landscape and every desktop).

## Extends

- `CardStackTierBase`

## Properties

### MIN\_VW

```ts
MIN_VW: number
```

Defined in: core/tokens/motion/card-stack.ts:26

Viewport width (px) at/above which the tier applies.

#### Inherited from

```ts
CardStackTierBase.MIN_VW
```

---

### PORTRAIT

```ts
PORTRAIT: boolean
```

Defined in: core/tokens/motion/card-stack.ts:28

True for the portrait-only tablet band (taller than wide).

#### Inherited from

```ts
CardStackTierBase.PORTRAIT
```

---

### CARD\_SHARE

```ts
CARD_SHARE: number
```

Defined in: core/tokens/motion/card-stack.ts:30

Front-card width as a fraction of the deck width.

#### Inherited from

```ts
CardStackTierBase.CARD_SHARE
```

---

### HEIGHT\_SHARE

```ts
HEIGHT_SHARE: number
```

Defined in: core/tokens/motion/card-stack.ts:33

Ceiling for the card height as a fraction of the deck height — short
viewports shrink the card (and its width, via the ratio) to fit.

#### Inherited from

```ts
CardStackTierBase.HEIGHT_SHARE
```

---

### FIRST\_STEP

```ts
FIRST_STEP: number
```

Defined in: core/tokens/motion/card-stack.ts:36

Drag px per card slot — the gesture's travel unit (and on fan tiers
also the ±1 neighbour's centre offset, in card widths).

#### Inherited from

```ts
CardStackTierBase.FIRST_STEP
```

---

### PEEK

```ts
PEEK: number
```

Defined in: core/tokens/motion/card-stack.ts:38

Ceiling for visible cards per side (fan) / deep (stack).

#### Inherited from

```ts
CardStackTierBase.PEEK
```

---

### PERSPECTIVE

```ts
PERSPECTIVE: number
```

Defined in: core/tokens/motion/card-stack.ts:41

Deck perspective distance, in card widths — larger = flatter, the
camera further back on the Z axis.

#### Inherited from

```ts
CardStackTierBase.PERSPECTIVE
```

---

### CARD\_H\_RATIO

```ts
CARD_H_RATIO: number
```

Defined in: core/tokens/motion/card-stack.ts:46

Card height as a multiple of its width — landscape ~0.64 planes on
fan tiers, ~0.62–1.45 "entire card" boxes on stacked tiers (the
wide-sheet bands carry the cover beside the copy, so their ratio
reads like the fan planes).

#### Inherited from

```ts
CardStackTierBase.CARD_H_RATIO
```

---

### STACKED

```ts
STACKED: false
```

Defined in: core/tokens/motion/card-stack.ts:51

---

### STEP

```ts
STEP: number
```

Defined in: core/tokens/motion/card-stack.ts:54

Extra centre offset per deeper card, in card widths — the tight
stacked edges of the coverflow.

---

### DEPTH

```ts
DEPTH: number
```

Defined in: core/tokens/motion/card-stack.ts:56

Z recess of the ±1 neighbour, in card widths.

---

### DEPTH\_STEP

```ts
DEPTH_STEP: number
```

Defined in: core/tokens/motion/card-stack.ts:58

Extra Z recess per deeper card, in card widths.

---

### ROT\_Y

```ts
ROT_Y: number
```

Defined in: core/tokens/motion/card-stack.ts:61

Y-axis turn (deg) of the ±1 neighbour — ~58-64° keeps the artwork
readable (classic coverflow), steeper reads as slivers.

---

### ROT\_STEP

```ts
ROT_STEP: number
```

Defined in: core/tokens/motion/card-stack.ts:66

Extra Y turn (deg) per card deeper than the neighbour — the fan
wraps like a carousel wall instead of stepping parallel planes:
a=2 sits ROT_Y+ROT_STEP, a=3 a further step, saturating at
ROT_MAX.

---

### ROT\_MAX

```ts
ROT_MAX: number
```

Defined in: core/tokens/motion/card-stack.ts:69

Y-turn ceiling (deg) — deep cards park just short of edge-on so a
hair of artwork (and the border glow) always reads.

---

### EDGE\_ROOM

```ts
EDGE_ROOM: number
```

Defined in: core/tokens/motion/card-stack.ts:74

Horizontal room the outermost visible card's projected edge may use,
as a multiple of the deck half-width. 1 keeps the fan inside the
deck; >1 lets phones bleed side cards off the screen edges as a
swipe hint.
