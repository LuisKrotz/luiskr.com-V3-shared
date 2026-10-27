[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/schema](../README.md) / emitSpaceJsonLd

```ts
function emitSpaceJsonLd(c): void
```

Defined in: experiments/earth-playground/space/schema.ts:43

Emits the Earth Playground graph — route base + WebApplication whose
`featureList` enumerates every control group's localized label, every
control's localized label and every group action, mirroring the
build-time entity so the post-hydration graph keeps parity with the
served document (and the canvas-rendered panel stays crawler-legible).

## Parameters

### c

[`SpacePlayground`](../../../SpacePlayground/classes/SpacePlayground.md)

The view — translations supply the localized labels.

## Returns

`void`
