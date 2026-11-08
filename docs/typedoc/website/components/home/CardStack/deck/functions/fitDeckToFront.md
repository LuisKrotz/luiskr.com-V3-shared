[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / fitDeckToFront

```ts
function fitDeckToFront(host): void
```

Defined in: website/components/home/cardstack/deck.ts:687

Re-fits the stacked deck's min-height to the FRONT card's rendered
height — applyPoses lets the front card auto-grow past the ratio
height so its copy never truncates and never scrolls (the page
itself absorbs the overflow); the measured delta parks as
_frontExtra (pileH's input — the behind sheets match the front's
live height) and the deck row stretches to the taller card so it
never collides with the foot. The front card's ResizeObserver
re-runs the fit when fonts/locale change the copy after mount.
Fan tiers just clear the artifact. One layout read per nav/mount —
same class as measure(), never per-frame.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
