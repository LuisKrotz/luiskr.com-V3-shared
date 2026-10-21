[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/expanded/genie](../README.md) / startGenieOpen

```ts
function startGenieOpen(el, done): boolean
```

Defined in: website/components/media/expanded/genie.ts:590

Open transition — warps the media from the clicked figure's rect
into the modal's media box.

## Parameters

### el

[`MediaExpanded`](../../../MediaExpanded/classes/MediaExpanded.md)

The <media-expanded> element.

### done

() => `void`

Settle callback (the unveil already happened internally).

## Returns

`boolean`

False when the transition cannot start — caller falls back.
