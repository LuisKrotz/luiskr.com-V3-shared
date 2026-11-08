[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/project/layout](../README.md) / fitDescriptionSizes

```ts
function fitDescriptionSizes(c): void
```

Defined in: website/views/project/layout.ts:209

Description-size fit pass — classifies every .internal-description
block by measured line count (fitDescription) and wires the ResizeObserver
that refits a block when it reveals (content-visibility keeps it at
zero size until near the viewport) or its width changes with the
viewport. document.fonts.ready re-runs the pass once: the verdict is
line-count-based, so a late-arriving Poiret One metric could otherwise
leave a wrong promotion in place.

## Parameters

### c

[`ViewProject`](../../Project/classes/ViewProject.md)

The ViewProject instance.

## Returns

`void`
