[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/picking](../README.md) / armPicking

```ts
function armPicking(Raycaster): void;
```

Defined in: experiments/star-field/engine/picking.ts:123

Stores the Raycaster constructor — bootstrap calls this after the lazy
three import so picking.ts never imports three itself (tree-shakeable,
test-mockable).

## Parameters

### Raycaster

() => `object`

## Returns

`void`
