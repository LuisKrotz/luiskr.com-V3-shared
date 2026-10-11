[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/wiring](../README.md) / mountSpaceCheckboxCanvases

```ts
function mountSpaceCheckboxCanvases(c): void;
```

Defined in: experiments/earth-playground/space/wiring.ts:347

Mounts one CheckboxWebGL twin per checkbox canvas: destroys a stale
twin when the canvas element changed identity across a re-render,
creates missing ones, and re-syncs checked state on existing ones.

## Parameters

### c

[`SpacePlayground`](../../../SpacePlayground/classes/SpacePlayground.md)

The SpacePlayground element.

## Returns

`void`
