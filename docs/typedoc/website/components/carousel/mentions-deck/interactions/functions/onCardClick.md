[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/interactions](../README.md) / onCardClick

```ts
function onCardClick(host, _item, idx): void
```

Defined in: website/components/carousel/mentions-deck/interactions.ts:70

Card activation — a side card click brings it to the front (the strip
affordance); the front card needs no handling — its anchor navigates
outbound natively.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

### \_item

[`MentionItem`](../../types/interfaces/MentionItem.md)

The clicked card's data row (unused — outbound links are native).

### idx

`number`

The clicked card's deck index.

## Returns

`void`
