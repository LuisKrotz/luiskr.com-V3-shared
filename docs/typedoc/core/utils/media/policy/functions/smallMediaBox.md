[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/policy](../README.md) / smallMediaBox

```ts
function smallMediaBox(boxWidthCssPx): boolean
```

Defined in: core/utils/media/policy.ts:79

Whether a rendered media box is small enough that the 768px-wide
`-mobile` derivative stem already over-resolves it — at ≤768 CSS px
every full-width rung (original/uncompressed are multi-MB) is
guaranteed waste regardless of connection. A 0/unknown width stays
false: the ladder then keeps the full stem and only the connection
term applies.

## Parameters

### boxWidthCssPx

`number`

Rendered width of the media box in CSS px.

## Returns

`boolean`

True when the mobile stem is the correct ladder.
