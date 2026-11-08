[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / ringSigned

```ts
function ringSigned(d, len): number
```

Defined in: website/components/home/cardstack/deck.ts:59

Signed ring distance of `d` modulo `len`, normalized into (-len/2, len/2]
so the shortest fan direction wins — fractional `d` (mid-drag) passes
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
