[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/interactions](../README.md) / cardIdxFromEvent

```ts
function cardIdxFromEvent(e): {
  el: Element
  idx: number
} | null
```

Defined in: website/components/home/cardstack/interactions.ts:31

Resolves the deck card element + its deck index from a DOM event, or
null when the event didn't land on a card.

## Parameters

### e

`Event`

The DOM event.

## Returns

\| \{
`el`: `Element`;
`idx`: `number`;
\}
\| `null`

for the containing card.
