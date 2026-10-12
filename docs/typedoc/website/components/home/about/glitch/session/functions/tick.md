[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/session](../README.md) / tick

```ts
function tick(host): void
```

Defined in: website/components/home/about/glitch/session.ts:196

Self-maintaining tick — always running while mounted:
no session → retry the arm at ~4 Hz (covers lazy image decode
and the first render landing before data).
session detached→ heal against the fresh wrapper/img (re-render-safe).
healthy session → draw the frame.

## Parameters

### host

[`AboutSection`](../../../../AboutSection/classes/AboutSection.md)

## Returns

`void`
