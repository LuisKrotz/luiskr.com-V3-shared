[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_APPROACH

```ts
const SF_APPROACH: Readonly<{
  PAD: 30;
  SCALE: 6;
}>;
```

Defined in: core/tokens/starfield/params.ts:48

Lazy-dossier trigger distance — the JSON for a body prefetches when the
camera comes within `approachPad + body.radius * approachScale` units,
so big bodies arm their data earlier than small ones.
