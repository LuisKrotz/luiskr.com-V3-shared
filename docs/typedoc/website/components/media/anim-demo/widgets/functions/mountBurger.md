[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/widgets](../README.md) / mountBurger

```ts
function mountBurger(ctx): () => void
```

Defined in: website/components/media/anim-demo/widgets.ts:42

Nav burger → ✕ liquid morph — the real BurgerButtonWebGL, cycling
hover-pool → open morph → calm-X → close, the four beats the nav
drives with pointer + menu state.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the icon canvas).

## Returns

Teardown — stops the cycle and destroys the widget.

() => `void`
