[**luiskr.com**](../../../../../../../README.md)

***

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/loaders/menu-background/loop](../README.md) / release

```ts
function release(host): void;
```

Defined in: core/utils/canvas/loaders/menu-background/loop.ts:70

Eases the reveal back to 0 — used when the menu closes so the field
dissolves instead of cutting out. Rendering continues until stop()
lets the dissolve finish before the GPU goes idle.

## Parameters

### host

[`MenuBackgroundWebGL`](../../../menu-background-webgl/classes/MenuBackgroundWebGL.md)

## Returns

`void`
