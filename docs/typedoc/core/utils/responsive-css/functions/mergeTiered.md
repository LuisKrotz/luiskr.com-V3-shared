[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/responsive-css](../README.md) / mergeTiered

```ts
function mergeTiered(...parts): TieredStyles
```

Defined in: core/utils/responsive-css.ts:172

Merges several `?tiers` imports into one TieredStyles — the multi-sheet
equivalent of the old `` `${a}\n${b}` `` concat (MediaFigure). Bases are
joined in order; each merged tier resolves PER SHEET to the highest
defined tier at or below the class — the splitter omits a class whose
cumulative content equals the previous tier's ("the runtime falls back
to the highest defined lower tier"), so a sheet with only mobile/tablet
content must still contribute at desktop. Keying merged loaders by the
exact class alone orphaned those sheets — their narrower cumulative
rules would never be adopted once a wider tier existed on any sibling.

## Parameters

### parts

...(`string` \| [`TieredStyles`](../interfaces/TieredStyles.md))[]

## Returns

[`TieredStyles`](../interfaces/TieredStyles.md)
