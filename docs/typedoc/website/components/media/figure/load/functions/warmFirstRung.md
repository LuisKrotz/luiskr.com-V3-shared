[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/figure/load](../README.md) / warmFirstRung

```ts
function warmFirstRung(fig): void
```

Defined in: website/components/media/figure/load.ts:104

CDN warm ordering — fires a detached fetch of the FIRST ladder rung
while the figure is still ~600px outside the viewport. The request
itself warms the CDN edge and the browser HTTP cache (decodeImageWASM
replays it via `force-cache`), so the 100px-margin climb starts on a
hot rung instead of a cold one. Warms only the entry rung — the climb
ascends serially, so warming the top rung early would fight the low
rung's fetch for bandwidth and warm a resource that may never publish.
Never publishes, never marks loaded — pure network warm.

## Parameters

### fig

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

## Returns

`void`
