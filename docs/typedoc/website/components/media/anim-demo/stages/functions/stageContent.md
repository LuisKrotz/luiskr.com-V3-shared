[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/stages](../README.md) / stageContent

```ts
function stageContent(id): Node | null
```

Defined in: website/components/media/anim-demo/stages.tsx:66

The staged DOM for one ANIMATION_IDS entry — the element(s) the
matching driver mounts its animation onto. Unknown ids get an empty
stage (the record still renders its text; only the demo area is bare).

## Parameters

### id

`string`

ANIMATION_IDS entry (the record key).

## Returns

`Node` \| `null`

Stage node for the demo, or null.
