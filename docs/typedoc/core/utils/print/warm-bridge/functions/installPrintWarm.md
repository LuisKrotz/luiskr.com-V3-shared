[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/print/warm-bridge](../README.md) / installPrintWarm

```ts
function installPrintWarm(warm): ShadowRoot[]
```

Defined in: core/utils/print/warm-bridge.ts:61

Installs the real warm hook — called once by `initPrintSupport`. Hands
back every root queued before installation so the caller can sweep
their already-loaded imgs (load events that fired before the hook
existed). Roots bound afterward already carry their listener and route
loads straight into `warm`.

## Parameters

### warm

(`img`) => `void`

The print module's per-img warm function.

## Returns

`ShadowRoot`[]

Roots queued before installation — for the one-time sweep.
