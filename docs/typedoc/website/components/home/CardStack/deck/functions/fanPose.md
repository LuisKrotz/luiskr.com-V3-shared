[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / fanPose

```ts
function fanPose(s, len, w, tier, peek?): CardPose
```

Defined in: website/components/home/cardstack/deck.ts:109

The coverflow pose for signed offset `s` (see CardStackTier for the
full model). With a = |s|, the near term min(a,1) carries the big
front→neighbour jump (FIRST_STEP / DEPTH / the full ROT_Y turn) and
the far term max(a−1,0) the tight per-card stacking (STEP /
DEPTH_STEP, plus ROT_STEP of extra turn per level so the fan wraps
like a carousel wall instead of parallel planes, capped at ROT_MAX)
— all linear in `a`, so a fractional drag offset slides every card
continuously along the curve. Right-hand
cards (s > 0) turn by +ROT_Y, which in CSS's rotateY convention sends
their outer edge away from the viewer; the left side mirrors it.
`0 - …` keeps the front depth at +0 (never −0). Opacity steps down
per level (FAN_DIM_STEP, floored at FAN_DIM_FLOOR) so the outer cards
darken into the deck edges exactly like the reference coverflow.

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

### tier

[`CardStackFanTier`](../../../../../../core/tokens/motion/card-stack/interfaces/CardStackFanTier.md)

The active coverflow fan tier.

### peek?

`number` = `tier.PEEK`

Visible cards per side; |s| beyond it hides the card.

## Returns

[`CardPose`](../../types/interfaces/CardPose.md)

The pose record for the DOM write.
