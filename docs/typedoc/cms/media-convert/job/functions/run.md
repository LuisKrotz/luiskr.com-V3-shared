[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / run

```ts
function run(host): Promise<void>;
```

Defined in: cms/media-convert/job.ts:263

Full pipeline orchestrator: create → upload → convert, flipping
host.phase at each stage and re-rendering. Errors land on the ERROR
phase with the server's message so the UI shows the real failure.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

The CmsMediaConverter element.

## Returns

`Promise`\<`void`\>
