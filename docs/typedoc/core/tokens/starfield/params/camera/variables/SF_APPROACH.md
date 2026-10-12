[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/camera](../README.md) / SF\_APPROACH

```ts
const SF_APPROACH: Readonly<{
  PAD: 50
  SCALE: 4
}>
```

Defined in: core/tokens/starfield/params/camera.ts:53

Lazy-dossier trigger distance — the JSON for a body prefetches when the
camera comes within `approachPad + body.radius * approachScale` units,
so big bodies arm their data earlier than small ones.
