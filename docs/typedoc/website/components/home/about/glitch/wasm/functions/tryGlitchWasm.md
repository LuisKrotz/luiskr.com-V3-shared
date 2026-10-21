[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/wasm](../README.md) / tryGlitchWasm

```ts
function tryGlitchWasm(host, s): void
```

Defined in: website/components/home/about/glitch/wasm.ts:74

Async mount — tries the rust/glitch artifact on the session canvas.
On success the session's `wasm` field goes live and `tick` switches
to `frameGlitchWasm`; on ANY failure (artifact, init, decode) the
2D backend is claimed — the session stays alive either way unless
the 2D claim also fails, in which case the overlay is dropped and
the plain <img> is the final fallback.

## Parameters

### host

[`AboutSection`](../../../../AboutSection/classes/AboutSection.md)

The component the session is parked on.

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

Fresh session (ctx unclaimed, wasm null).

## Returns

`void`
