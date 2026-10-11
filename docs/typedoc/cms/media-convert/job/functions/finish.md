[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / finish

```ts
function finish(host): void;
```

Defined in: cms/media-convert/job.ts:125

Terminal handler — counts per-file results, sets DONE when at least one
converted (ERROR otherwise), notifies via toast AND the OS Notification
API (long jobs may run while the tab is backgrounded), then re-renders.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

The CmsMediaConverter element.

## Returns

`void`
