[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/types](../README.md) / DemoMount

```ts
type DemoMount = (_ctx) => (() => void) | void
```

Defined in: website/components/media/anim-demo/types.ts:29

A demo mount — wires the stage and returns a teardown (or nothing
when the animation needs no explicit teardown, e.g. the skeleton
layer the base component owns).

## Parameters

### \_ctx

[`DemoContext`](../interfaces/DemoContext.md)

## Returns

(() => `void`) \| `void`
