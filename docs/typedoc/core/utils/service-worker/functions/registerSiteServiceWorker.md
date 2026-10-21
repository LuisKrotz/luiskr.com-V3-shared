[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/service-worker](../README.md) / registerSiteServiceWorker

```ts
function registerSiteServiceWorker(swUrl, hooks?): Promise<void>
```

Defined in: core/utils/service-worker.ts:123

Registers `swUrl` and reports lifecycle through `hooks`. No-ops when
`navigator.serviceWorker` is unavailable. Local hosts get the
existence/mime probe first; a bad probe unregisters rather than
installing a dev-shell SW.

## Parameters

### swUrl

`string`

### hooks?

[`ServiceWorkerHooks`](../interfaces/ServiceWorkerHooks.md) = `{}`

## Returns

`Promise`\<`void`\>
