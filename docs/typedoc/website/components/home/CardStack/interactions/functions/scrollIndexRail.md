[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/interactions](../README.md) / scrollIndexRail

```ts
function scrollIndexRail(host, dir): void
```

Defined in: website/components/home/cardstack/interactions.ts:139

`scrollIndexRail` — the index list is a horizontal rail on desktop and
a vertical sheet on mobile, so the arrows scroll whichever axis is
actually overflowing: one viewport-length hop per click, smoothed.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

### dir

`number`

Scroll direction (+1 forward, -1 backward).

## Returns

`void`
