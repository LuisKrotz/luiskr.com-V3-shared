[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/mounts](../README.md) / mountDividerDemo

```ts
function mountDividerDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/mounts.ts:99

Footer divider sheen — the real `<hr>` fallback paint (authored in
anim-demo.scss) plus the WebGPU overlay attempt; the mount no-ops
without a GPU so the CSS band always plays.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the hr).

## Returns

Teardown — destroys the widget mount when it exists.

() => `void`
