[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / poll

```ts
function poll(host): Promise<void>;
```

Defined in: cms/media-convert/job.ts:93

One poll tick: fetches job status, re-arms the timer while the server
reports running/uploading, and finishes (or errors) on a terminal
state. A failed GET is treated as server loss — the phase flips to
ERROR rather than polling forever.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

The CmsMediaConverter element.

## Returns

`Promise`\<`void`\>
