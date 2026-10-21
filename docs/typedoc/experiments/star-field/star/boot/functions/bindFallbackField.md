[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/boot](../README.md) / bindFallbackField

```ts
function bindFallbackField(c): void
```

Defined in: experiments/star-field/star/boot.ts:26

Paints the 2D fallback starfield onto the freshly-rendered `.sf-fallback`
canvas (must run after `_updateDom` has mounted it). Stores the disposer
on the host so onDestroy can drop the resize observer.

## Parameters

### c

[`StarField`](../../../StarField/classes/StarField.md)

The StarField element.

## Returns

`void`
