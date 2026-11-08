[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / pickTier

```ts
function pickTier(vw, vh): CardStackTier
```

Defined in: website/components/home/cardstack/deck.ts:76

The coverflow tier for a viewport — the first (widest) tier whose
MIN_VW the width meets; the portrait tablet tier also requires a
taller-than-wide viewport, mirroring the SCSS `orientation` split.
The final (phone) tier has MIN_VW 0 and is the unconditional floor.

## Parameters

### vw

`number`

Viewport width px.

### vh

`number`

Viewport height px.

## Returns

[`CardStackTier`](../../../../../../core/tokens/motion/card-stack/type-aliases/CardStackTier.md)

The matching tier.
