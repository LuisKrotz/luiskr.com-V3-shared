[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/utils/service-worker](../README.md) / dropStaleServiceWorkers

```ts
function dropStaleServiceWorkers(): void;
```

Defined in: core/utils/service-worker.ts:21

Unregisters every service worker bound to the current origin. No-op
outside browsers and where `getRegistrations` is unavailable; failures
are swallowed — this is best-effort cleanup, never a boot blocker.

## Returns

`void`
