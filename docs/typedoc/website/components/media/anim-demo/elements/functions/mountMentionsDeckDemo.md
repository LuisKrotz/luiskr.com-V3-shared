[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/elements](../README.md) / mountMentionsDeckDemo

```ts
function mountMentionsDeckDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/elements.ts:200

Mentions-deck demo — mounts the real <mentions-deck> and pushes the
real mention records + deck hint copy the contact section supplies.
The deck's drag-dismiss/autoplay choreography is the production path.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the element).

## Returns

Teardown — blocks the late data write.

() => `void`
