[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_BELT

```ts
const SF_BELT: Readonly<{
  PX: 1.1;
  OPACITY: 0.85;
  PUFF: 0.16;
  ALBEDO_JITTER: 0.45;
  GAP_FREQ: 1.9;
  GAP_DEPTH: 0.55;
}>;
```

Defined in: core/tokens/starfield/params.ts:210

Small-body belts (asteroid + Kuiper) — the seeded Points annulus each
`kind: belt` catalog entry renders. Radii live on the def itself
(belt.inner/belt.outer); these tokens own particle size, opacity and
the default vertical half-thickness fraction.
