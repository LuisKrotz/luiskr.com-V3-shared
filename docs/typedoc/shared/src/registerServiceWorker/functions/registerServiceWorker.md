[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [shared/src/registerServiceWorker](../README.md) / registerServiceWorker

```ts
function registerServiceWorker(env): void;
```

Defined in: shared/src/registerServiceWorker.ts:19

Registers `<base>service-worker.js` on window load when `env.PROD` is set.
Exported (and env-injected) so the prod-only branch is exercisable in
tests — `import.meta.env` does not exist outside Vite.

## Parameters

### env

Vite env object ({PROD, BASE_URL})

#### PROD?

`boolean`

#### BASE_URL?

`string`

## Returns

`void`
