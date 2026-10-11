[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/wiring](../README.md) / destroySpaceCheckboxCanvases

```ts
function destroySpaceCheckboxCanvases(c): void;
```

Defined in: experiments/earth-playground/space/wiring.ts:384

Tears down every CheckboxWebGL twin — frees their GL contexts via the
shared release path and clears the registry so a remount starts clean.

## Parameters

### c

[`SpacePlayground`](../../../SpacePlayground/classes/SpacePlayground.md)

The SpacePlayground element.

## Returns

`void`
