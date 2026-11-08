[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/widgets](../README.md) / mountMenuBackground

```ts
function mountMenuBackground(ctx): () => void
```

Defined in: website/components/media/anim-demo/widgets.ts:65

Nav menu backdrop — the real MenuBackgroundWebGL contour field:
start() reveals it exactly like menu-open; release() dissolves it.
The cycle alternates the two so the reveal ease replays forever.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the fullscreen canvas).

## Returns

Teardown — stops the cycle and destroys the widget.

() => `void`
