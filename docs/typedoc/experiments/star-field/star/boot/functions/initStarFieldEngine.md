[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/boot](../README.md) / initStarFieldEngine

```ts
function initStarFieldEngine(c): void;
```

Defined in: experiments/star-field/star/boot.ts:60

Constructs the StarFieldEngine and wires its lifecycle: progress →
loader overlay; select → dossier load + live announce; approach →
dossier prefetch; hover → live announce; ready → reduced-motion flag +
loader dismiss. A failed init still resolves the loader so the page
isn't stuck behind a broken overlay.

## Parameters

### c

[`StarField`](../../../StarField/classes/StarField.md)

The StarField element.

## Returns

`void`
