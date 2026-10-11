[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_ZOOM

```ts
const SF_ZOOM: Readonly<{
  MIN: 4;
  MAX: 52000;
}>;
```

Defined in: core/tokens/starfield/params.ts:60

Orbit-controls zoom bounds — clamps how far the camera can dolly:
MIN keeps a close approach above the body surface; MAX frames the
whole cosmic hierarchy — Milky Way, the Local Group neighbourhood and
the supercluster/observable-universe shells — and stops just inside
the boundary so the chart never zooms into empty space.
