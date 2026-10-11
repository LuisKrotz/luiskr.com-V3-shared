[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/state](../README.md) / createStarState

```ts
function createStarState(canvas, events?): SFState;
```

Defined in: experiments/star-field/engine/state.ts:34

Builds the initial engine state — everything null/empty until bootstrap
fills it; `disposed`/`failed`/`reduced` are the flags every async stage
re-checks before touching the scene.

## Parameters

### canvas

`HTMLCanvasElement`

Persistent canvas the host renders into.

### events?

[`SFEvents`](../interfaces/SFEvents.md) = `{}`

Host callbacks (ready/progress/select/approach/hover).

## Returns

[`SFState`](../../types/interfaces/SFState.md)

Fresh SFState.
