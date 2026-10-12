[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/session](../README.md) / armGlitch

```ts
function armGlitch(host, wrap): boolean
```

Defined in: website/components/home/about/glitch/session.ts:100

Arms the session: builds the overlay canvas + context against the live
wrapper. Bails quietly when the image isn't decoded, the wrapper is
zero-size, the 2D context is unavailable, or motion is reduced — the
<img> remains as the static fallback. Idempotent — returns true when a
session is already running.

## Parameters

### host

[`AboutSection`](../../../../AboutSection/classes/AboutSection.md)

The <about-section> component the session parks on.

### wrap

`HTMLElement`

The live picture wrapper element.

## Returns

`boolean`
