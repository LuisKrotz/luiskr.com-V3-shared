[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/autoplay](../README.md) / autoplayAllowed

```ts
function autoplayAllowed(host): boolean
```

Defined in: website/components/home/cardstack/autoplay.ts:109

The autoplay eligibility gate — the countdown is a fan-tier surface
only: the stacked mobile/tablet layouts get no countdown, no border
light, and no transport button (the stylesheet hides it under the
same 1280 boundary). Arms and the transport both check this so a
stacked tier can never start the clock.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`boolean`

True on a desktop fan tier with a populated deck.
