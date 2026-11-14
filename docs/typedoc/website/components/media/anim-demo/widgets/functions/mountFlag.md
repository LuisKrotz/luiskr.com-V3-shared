[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/widgets](../README.md) / mountFlag

```ts
function mountFlag(ctx): () => void
```

Defined in: website/components/media/anim-demo/widgets.ts:183

Locale flag row — one real FlagWebGL per LANG_OPTIONS entry, so the
record lists every flag the widget serves instead of sampling one
locale at a time. The wave is the whole animation; no state cycle.
Each widget shares the pooled flag renderer (refcounted acquire), so
the row costs sixteen small 2D canvases and one shared GL surface.
The flags keep their pool registration: purge/restore is honest for
them — the canvas only ever binds '2d', so re-entry re-acquisition
can't strand on the async WebGL restore the quad widgets hit.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the flags row).

## Returns

Teardown — destroys every mounted flag widget.

() => `void`
