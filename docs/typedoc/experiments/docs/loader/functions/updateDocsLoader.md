[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/loader](../README.md) / updateDocsLoader

```ts
function updateDocsLoader(
   view, 
   msg, 
   pct
): void;
```

Defined in: experiments/docs/loader.ts:27

Mirrors a docs boot stage into the loader overlay — stage message,
rounded percent text, and the bar's width style. The values also land
on the view's `_loaderMsg`/`_loaderPct` fields so a mid-boot re-render
(which rebuilds the shadow content) re-emits the current stage instead
of snapping back to the initial markup. All three nodes are
optional-chained so a partial loader render can't throw mid-boot.

## Parameters

### view

[`ViewDocs`](../../Docs/classes/ViewDocs.md)

The ViewDocs element.

### msg

`string`

Stage message ('Indexing modules and reports', …).

### pct

`number`

Progress 0–100.

## Returns

`void`
