[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/about/mesh](../README.md) / attachMesh

```ts
function attachMesh(host): boolean
```

Defined in: website/components/home/about/mesh.ts:180

Arms the mesh on the portrait wrapper: creates the canvas, sizes it to
the wrapper box (×1.9 bleed for the outer ring + lines), and starts the
rAF loop unless motion is reduced. Self-healing — a re-render detaches
the canvas, so callers re-arm from onUpdated. Idempotent.

## Parameters

### host

[`AboutSection`](../../../AboutSection/classes/AboutSection.md)

The <about-section> component the session parks on.

## Returns

`boolean`

true when a session is running.
