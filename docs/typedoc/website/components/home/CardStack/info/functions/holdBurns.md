[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/info](../README.md) / holdBurns

```ts
function holdBurns(host, held): void
```

Defined in: website/components/home/cardstack/info.ts:334

Scroll-visibility hold for every burn session the deck owns — the
in-card title knits/consumes AND the text column's burn swap. The
section's IntersectionObserver calls it with the inverse of
isIntersecting: a hold cancels each live session's rAF in place
(prog/dir survive — the knit freezes exactly where it was, which
also stops an off-screen mount's first frame spending the draw-in
before the user ever sees it), and a release re-arms any session
still active so the draw animation plays out on the frame the
deck scrolls back into view. Sessions that already ran to
completion (`active` false) stay parked — a finished burn must not
resurrect on re-entry.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

### held

`boolean`

True while the section is off-screen.

## Returns

`void`
