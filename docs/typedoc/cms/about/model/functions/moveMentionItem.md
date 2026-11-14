[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/model](../README.md) / moveMentionItem

```ts
function moveMentionItem(host, idx, dir): void
```

Defined in: cms/about/model.ts:105

Swaps a mention with its neighbor — `dir` is -1 (up) or +1 (down);
out-of-bounds targets return early.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData.mention_items`

### idx

`number`

— zero-based mention index

### dir

`number`

— -1 or +1

## Returns

`void`
