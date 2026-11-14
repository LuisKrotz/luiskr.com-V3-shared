[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/print/print](../README.md) / trackPrintJob

```ts
function trackPrintJob(job): void
```

Defined in: core/utils/print/print.ts:3187

Registers async print-composition work fired by a `printprepare`
listener — dossier fetches, generated mirror syncs, injected-DOM
builds whose nodes the walk must see whole. The promise is tracked in
the same bag the gated entry awaits before committing; its failures
are swallowed so one bad fetch can't take the job down.

## Parameters

### job

`Promise`\<`unknown`\>

Composition promise resolving after the listener's print
DOM is seated.

## Returns

`void`
