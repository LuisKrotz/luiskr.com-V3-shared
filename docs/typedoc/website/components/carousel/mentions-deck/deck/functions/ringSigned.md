[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/deck](../README.md) / ringSigned

```ts
function ringSigned(d, len): number
```

Defined in: website/components/carousel/mentions-deck/deck.ts:38

Signed ring distance of `d` modulo `len`, normalized into (-len/2, len/2]
so the shortest strip direction wins — fractional `d` (mid-drag) passes
through unchanged in magnitude.

## Parameters

### d

`number`

Raw index difference (may be fractional, any sign).

### len

`number`

Deck length.

## Returns

`number`

Signed ring offset.
