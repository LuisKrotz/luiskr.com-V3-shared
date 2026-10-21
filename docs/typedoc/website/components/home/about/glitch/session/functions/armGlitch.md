[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/session](../README.md) / armGlitch

```ts
function armGlitch(host, wrap): boolean
```

Defined in: website/components/home/about/glitch/session.ts:117

Arms the session: builds the overlay canvas against the live wrapper,
then races the two render backends — the rust/glitch WebGPU widget
mounts first when `navigator.gpu` exists; anything else claims the 2D
context and the painter pipeline (a canvas only allows ONE context
mode, so the 2D claim is deferred until the wasm arm fails). Bails
quietly when the image isn't decoded, the wrapper is zero-size, or
motion is reduced — the <img> remains as the static fallback.
Idempotent — returns true when a session is already running.

## Parameters

### host

[`AboutSection`](../../../../AboutSection/classes/AboutSection.md)

The <about-section> component the session parks on.

### wrap

`HTMLElement`

The live picture wrapper element.

## Returns

`boolean`
