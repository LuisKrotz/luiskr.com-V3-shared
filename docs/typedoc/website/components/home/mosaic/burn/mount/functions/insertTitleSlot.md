[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/mount](../README.md) / insertTitleSlot

```ts
function insertTitleSlot(cardEl, titleText): void
```

Defined in: website/components/home/mosaic/burn/mount.ts:30

Inserts the rewrite slot above the description: an aria-hidden spacer
holds the layout space (zero reflow when the clone animates) and a
<draw-text> replays the title. The whole slot is aria-hidden — the
original h2 remains the single a11y source for the title.

## Parameters

### cardEl

`Element`

The expanded mosaic card.

### titleText

`string`

The title string the slot replays.

## Returns

`void`
