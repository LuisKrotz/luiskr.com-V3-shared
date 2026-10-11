[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / installTools

```ts
function installTools(host): Promise<void>;
```

Defined in: cms/media-convert/job.ts:235

POSTs the server's install plan (detected package manager runs the
package commands, then re-probes) and stores the refreshed report plus
the collected stdout/stderr log for the setup panel's log view. The
installing flag disables both buttons while the spawn runs.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

The CmsMediaConverter element.

## Returns

`Promise`\<`void`\>
