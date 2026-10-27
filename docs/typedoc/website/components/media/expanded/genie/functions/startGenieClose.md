[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/expanded/genie](../README.md) / startGenieClose

```ts
function startGenieClose(el, done): boolean
```

Defined in: website/components/media/expanded/genie.ts:668

Close transition — collapses the media from the modal box back into
the origin figure.

## Parameters

### el

[`MediaExpanded`](../../../MediaExpanded/classes/MediaExpanded.md)

The <media-expanded> element.

### done

() => `void`

Settle callback — the modal teardown (URL/dialog/scroll).

## Returns

`boolean`

False when the transition cannot start — caller falls back.
