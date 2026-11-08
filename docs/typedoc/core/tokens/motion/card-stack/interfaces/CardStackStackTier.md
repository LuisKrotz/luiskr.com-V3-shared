[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/card-stack](../README.md) / CardStackStackTier

Defined in: core/tokens/motion/card-stack.ts:89

Portrait "entire card" stack tier (phones + portrait tablets) — the
card carries its project copy inside (cover top, title/description/
link body). The pile works like a dealt deck seen from above:
the NEXT card (s = +1) sits in the deal slot — shifted down-RIGHT so
its bottom band (description + CTA) peeks below the front card's
edge; deeper upcoming cards (s ≥ 2) fan up-LEFT behind it — each fan
level adds a small leftward/upward shift and counter-clockwise tilt
so only their top-left corners sliver out into the page margins.
Swiped cards (s < 0) slide under the pile's bottom — the deepest
up-left slot — and dissolve there (the cycled deck's bottom).

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
STACKED: true
```

Defined in: core/tokens/motion/card-stack.ts:90

---

### IN\_CARD\_INFO

```ts
IN_CARD_INFO: boolean
```

Defined in: core/tokens/motion/card-stack.ts:96

Whether cards carry their own project copy (title/desc/CTA) —
true on phones + portrait tablets (the "entire card" sheet),
false on the 768–1279 landscape band where the pile is image-only
and the side text column owns the copy. Also gates the in-card
title burn — hidden titles never mount a session.

---

### DEAL\_X

```ts
DEAL_X: number
```

Defined in: core/tokens/motion/card-stack.ts:98

Deal card's right offset (s = +1), in card widths.

---

### DEAL\_Y

```ts
DEAL_Y: number
```

Defined in: core/tokens/motion/card-stack.ts:101

Deal card's downward offset (s = +1), in card heights — sized so
its bottom band (description + CTA) clears the front card's edge.

---

### DEAL\_RZ

```ts
DEAL_RZ: number
```

Defined in: core/tokens/motion/card-stack.ts:103

Deal card's clockwise tilt (deg).

---

### DEAL\_D

```ts
DEAL_D: number
```

Defined in: core/tokens/motion/card-stack.ts:105

Deal card's Z recess, in card widths.

---

### FAN\_X

```ts
FAN_X: number
```

Defined in: core/tokens/motion/card-stack.ts:109

First fan card's signed x offset (s = +2), in card widths —
negative = left, lands the top-left sliver just past the front
card's edge.

---

### FAN\_X\_STEP

```ts
FAN_X_STEP: number
```

Defined in: core/tokens/motion/card-stack.ts:111

Extra signed x per deeper fan level, in card widths.

---

### FAN\_Y

```ts
FAN_Y: number
```

Defined in: core/tokens/motion/card-stack.ts:114

First fan card's signed y offset (s = +2), in card heights —
negative = up.

---

### FAN\_Y\_STEP

```ts
FAN_Y_STEP: number
```

Defined in: core/tokens/motion/card-stack.ts:116

Extra signed y per deeper fan level, in card heights.

---

### FAN\_RZ

```ts
FAN_RZ: number
```

Defined in: core/tokens/motion/card-stack.ts:118

First fan card's tilt (deg) — negative = counter-clockwise.

---

### FAN\_RZ\_STEP

```ts
FAN_RZ_STEP: number
```

Defined in: core/tokens/motion/card-stack.ts:120

Extra tilt per deeper fan level (deg).

---

### FAN\_D

```ts
FAN_D: number
```

Defined in: core/tokens/motion/card-stack.ts:122

First fan card's Z recess, in card widths (positive = deeper).

---

### FAN\_D\_STEP

```ts
FAN_D_STEP: number
```

Defined in: core/tokens/motion/card-stack.ts:124

Extra Z recess per deeper fan level, in card widths.

---

### PARK\_X

```ts
PARK_X: number
```

Defined in: core/tokens/motion/card-stack.ts:128

Parked slot's left offset at |s| = 1, in card widths — the pile's
bottom edge the swiped card slides into (pose scales by |s|, so
the front card travels there smoothly mid-drag).

---

### PARK\_Y

```ts
PARK_Y: number
```

Defined in: core/tokens/motion/card-stack.ts:130

Parked slot's upward offset at |s| = 1, in card heights.

---

### PARK\_RZ

```ts
PARK_RZ: number
```

Defined in: core/tokens/motion/card-stack.ts:132

Parked slot's counter-clockwise tilt (deg).

---

### PARK\_D

```ts
PARK_D: number
```

Defined in: core/tokens/motion/card-stack.ts:134

Parked slot's Z recess, in card widths — the deepest plane.
