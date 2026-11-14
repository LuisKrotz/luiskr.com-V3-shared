[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / tierPose

```ts
function tierPose(tier, s, len, w, h, peek): CardPose
```

Defined in: website/components/home/cardstack/deck.ts:228

Pose dispatcher — the STACKED tiers' down-right cascade or the fan
tiers' left/right coverflow. Single routing site for applyPoses and
the skeleton renderer.

## Parameters

### tier

[`CardStackTier`](../../../../../../core/tokens/motion/card-stack/type-aliases/CardStackTier.md)

The active tier (narrows the pose model).

### s

`number`

Signed ring offset.

### len

`number`

Deck length.

### w

`number`

Card width px.

### h

`number`

Card height px.

### peek

`number`

Visible depth window.

## Returns

[`CardPose`](../../types/interfaces/CardPose.md)

The pose record for the DOM write.
