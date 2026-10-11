[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/debug/params](../README.md) / runDebugActions

```ts
function runDebugActions(): void;
```

Defined in: core/debug/params.ts:46

Runs the side-effecting debug flags once at boot. The toast test is async
(lazy <site-toast> chunk) — intentionally fire-and-forget so a slow chunk
load never blocks the app start.

## Returns

`void`
