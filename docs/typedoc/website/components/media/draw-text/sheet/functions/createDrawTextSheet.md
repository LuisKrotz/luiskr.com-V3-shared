[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/sheet](../README.md) / createDrawTextSheet

```ts
function createDrawTextSheet(styles): DrawTextSheet
```

Defined in: website/components/media/draw-text/sheet.ts:86

Builds the sheet surface over one `?tiers`-shaped styles module. The
jest scss mocks answer plain strings for every query form, so the same
isTieredStyles probe Component uses keeps both shapes working: objects
deliver base+tiers+print lazily, strings behave as base-only sheets.

## Parameters

### styles

\| `string`
\| [`TieredStyles`](../../../../../../core/utils/responsive-css/interfaces/TieredStyles.md)

the `?tiers` module (or a plain css string).

## Returns

[`DrawTextSheet`](../interfaces/DrawTextSheet.md)

the sheet surface.
