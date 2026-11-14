[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/autoplay](../README.md) / holdAutoplay

```ts
function holdAutoplay(host, held): void
```

Defined in: website/components/home/cardstack/autoplay.ts:238

The visibility hold — the section IO and the document's
visibilitychange freeze a running countdown while the deck can't be
seen (banked like a pause, but resuming by itself when the surface
returns — a user pause stays paused). The frozen state shares the
--auto-paused paint (a held light looks identical to a paused one).

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

### held

`boolean`

True while the deck is off-screen/tab-hidden.

## Returns

`void`
