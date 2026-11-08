[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/project/layout](../README.md) / sectionItemHeight

```ts
function sectionItemHeight(c, section): string
```

Defined in: website/views/project/layout.ts:38

Per-section CSS height: the TALLEST media item's intrinsic ratio
applied to the viewport width — min(100vw·h/w, SKELETON_ITEM_HEIGHT) —
mirroring the runtime strip, which sizes every slide to the tallest
rendered item. Emitting the height before decode means the section
never reflows when media arrives; over-reserving (never under) keeps
the correction direction downward-only. Sections without any sized
media fall back to the fixed skeleton height. `toFixed(4)` keeps the
calc string compact while preserving sub-pixel accuracy.

## Parameters

### c

[`ViewProject`](../../Project/classes/ViewProject.md)

The ViewProject instance (unused — part of the method facade).

### section

[`SectionChild`](../../types/type-aliases/SectionChild.md)[]

One section's children; the media array is detected by shape.

## Returns

`string`

A CSS `min()` height expression.
