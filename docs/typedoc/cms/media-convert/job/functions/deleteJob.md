[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / deleteJob

```ts
function deleteJob(host): Promise<void>;
```

Defined in: cms/media-convert/job.ts:182

DELETEs the job on the dev server (cleanup of uploaded tmp files) then
clears host.jobId — a missing job is tolerated (idempotent teardown).

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

The CmsMediaConverter element.

## Returns

`Promise`\<`void`\>
