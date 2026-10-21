[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/widgets/close-button/init](../README.md) / initRest

```ts
function initRest(host): void
```

Defined in: core/utils/canvas/widgets/close-button/init.ts:211

The classic boot tail — context-loss watch → WebGL attempt → CSS-X
fallback → events + loop. Runs directly on no-WebGPU browsers and
after a wasm mount failure.

## Parameters

### host

[`CloseButtonWebGL`](../../classes/CloseButtonWebGL.md)

The button to bring up on the classic path.

## Returns

`void`
