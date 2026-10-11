[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / createJob

```ts
function createJob(host): Promise<void>;
```

Defined in: cms/media-convert/job.ts:35

POSTs an empty job to the dev server and stores the returned id on the
host — every subsequent request hangs off host.jobId.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

The CmsMediaConverter element.

## Returns

`Promise`\<`void`\>

## Throws

Error with the server's message when the job can't be created.
