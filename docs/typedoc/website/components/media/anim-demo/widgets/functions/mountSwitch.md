[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/widgets](../README.md) / mountSwitch

```ts
function mountSwitch(ctx): () => void
```

Defined in: website/components/media/anim-demo/widgets.ts:120

Preference switch — the real SwitchWebGL ('stats' context, the ECG
variant) toggling itself on the cycle the preferences panel's pointer
would.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the switch canvas).

## Returns

Teardown — stops the cycle and destroys the widget.

() => `void`
