[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/fallback-stars](../README.md) / bindStarFallback

```ts
function bindStarFallback(canvas): (() => void) | null;
```

Defined in: experiments/star-field/engine/fallback-stars.ts:111

Binds the fallback canvas: paints immediately and repaints whenever the
element resizes (viewport changes, grid step flips). Returns a disposer
for teardown — null when the canvas/observer can't run.

## Parameters

### canvas

`HTMLCanvasElement`

The `.sf-fallback` canvas element.

## Returns

(() => `void`) \| `null`
