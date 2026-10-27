[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/frame](../README.md) / tickStar

```ts
function tickStar(s, now?): void
```

Defined in: experiments/star-field/engine/frame.ts:53

Per-frame update, self-rescheduling via RAF:
orbits — pivot.rotation.y = phase + t·ORBIT_SPEED·speed
spins — spinner.rotation.y advances by SPIN_SPEED·spin·dt
satellites — same orbit formula on child pivots
fly — eased camera tween overrides manual control until done
render — RenderPipeline post chain when it built (bloom → vignette
→ film grain), plain renderer.render otherwise

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

### now?

`number`

RAF timestamp in ms — falls back to performance.now.

## Returns

`void`
