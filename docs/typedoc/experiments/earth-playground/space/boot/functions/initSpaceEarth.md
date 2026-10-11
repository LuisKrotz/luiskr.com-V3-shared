[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/boot](../README.md) / initSpaceEarth

```ts
function initSpaceEarth(c): void;
```

Defined in: experiments/earth-playground/space/boot.ts:48

Constructs the EarthBackground engine on the persistent canvas and
wires its lifecycle: progress → loader overlay, ready → apply persisted
settings + reduced-motion flag + dismiss. The `_isInitializingEarth`
latch prevents double-init while init() is still awaiting. A failed
init still marks `_earthReady` and dismisses the loader so the page
isn't stuck behind a broken overlay.

## Parameters

### c

[`SpacePlayground`](../../../SpacePlayground/classes/SpacePlayground.md)

The SpacePlayground element.

## Returns

`void`
