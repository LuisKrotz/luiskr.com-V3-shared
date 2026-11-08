[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/mounts](../README.md) / mountGenieDemo

```ts
function mountGenieDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/mounts.ts:161

Genie modal — the real genieEnter/genieLeave helper driving a mini
backdrop + dialog: the origin dot's rect is committed as
store.modalOrigin each cycle, exactly like a trigger button would,
then the real warp plays between the enter/leave modifiers.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context — host supplies the `$` contract.

## Returns

Teardown — stops the cycle and clears the origin.

() => `void`
