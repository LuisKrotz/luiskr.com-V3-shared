[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/widgets/theme-slider/init](../README.md) / initRest

```ts
function initRest(host): void
```

Defined in: core/utils/canvas/widgets/theme-slider/init.ts:164

The classic boot tail — context-loss watch → WebGL attempt →
events + loop. Runs directly on no-WebGPU browsers and after a
wasm mount failure.

## Parameters

### host

[`ThemeSliderWebGL`](../../classes/ThemeSliderWebGL.md)

The slider to bring up on the classic path.

## Returns

`void`
