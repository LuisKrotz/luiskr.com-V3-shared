[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/cycle](../README.md) / after

```ts
function after(ms, fn): () => void
```

Defined in: website/components/media/anim-demo/cycle.ts:71

Fires `fn` once after `ms` — used to start a demo's first beat on the
next breath instead of synchronously inside mount (the stage must
paint once before the first state flip lands).

## Parameters

### ms

`number`

Delay.

### fn

() => `void`

The deferred callback.

## Returns

Teardown clearing the timeout.

() => `void`
