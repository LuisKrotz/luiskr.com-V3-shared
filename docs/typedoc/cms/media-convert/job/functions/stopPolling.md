[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / stopPolling

```ts
function stopPolling(host): void;
```

Defined in: cms/media-convert/job.ts:22

Cancels the pending poll timer — called before every new poll schedule
and on reset so only one timer is ever armed.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

The CmsMediaConverter element.

## Returns

`void`
