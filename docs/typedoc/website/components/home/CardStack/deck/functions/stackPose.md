[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / stackPose

```ts
function stackPose(s, len, w, h, tier, peek?): CardPose
```

Defined in: website/components/home/cardstack/deck.ts:172

The stacked-layout pose for signed offset `s` — the "entire card"
pile of the phone/portrait tiers, modelled as a dealt deck:

- s = +1 is the DEAL slot — the next card shifted down-right so its
  bottom band (description + CTA) peeks below the front card's edge.
- s ≥ +2 is the draw-pile FAN — each level a further step up-left,
  tilted counter-clockwise, so only the top-left corners sliver out
  into the page margins.
- s < 0 are the returned cards — they slide under the pile's bottom
  edge (the deepest up-left slot), |s|-scaled so the swiped card
  travels there smoothly mid-drag; only the most recent stays lit.
  The s > 0 path is piecewise-linear in `a` across three segments —
  min(a,1) travels 0 → DEAL__, clamp(a−1,0,1) travels DEAL__ → FAN_*
  (first fan level, so the terms are the FAN−DEAL delta), and
  max(a−2,0) adds each deeper FAN_*_STEP — a fractional drag offset
  glides through deal/fan continuously.

## Parameters

### s

`number`

Signed ring offset (0 = front).

### len

`number`

Deck length — drives the z-index ladder.

### w

`number`

Card width px.

### h

`number`

Card height px.

### tier

[`CardStackStackTier`](../../../../../../core/tokens/motion/card-stack/interfaces/CardStackStackTier.md)

The active stacked tier.

### peek?

`number` = `tier.PEEK`

Visible pile depth; deeper upcoming cards hide.

## Returns

[`CardPose`](../../types/interfaces/CardPose.md)

The pose record for the DOM write.
