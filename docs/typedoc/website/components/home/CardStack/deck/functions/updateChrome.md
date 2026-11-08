[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / updateChrome

```ts
function updateChrome(host): void
```

Defined in: website/components/home/cardstack/deck.ts:582

Refreshes the non-pose chrome after a nav — the "PROJECT 01 OF 08"
counter (projectLabel + ofLabel, both localized), the dot --active
flags, each card's aria-hidden/tabindex so off-front cards leave the
tab order and AT tree, and the text column's copy for the new front.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
