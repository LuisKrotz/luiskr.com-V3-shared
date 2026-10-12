[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/catalog/geo](../README.md) / gpos

```ts
function gpos(l, b, dLy): [number, number, number]
```

Defined in: experiments/star-field/engine/catalog/geo.ts:24

Galactic-coordinate placement — every deep-sky body lands on its real
galactic (l, b) direction at the multi-tier compressed distance, in the
same tilted frame the Milky Way particle disc and the deep-field cloud
render. Directions stay astronomically true; only radii compress.

## Parameters

### l

`number`

Galactic longitude in degrees.

### b

`number`

Galactic latitude in degrees.

### dLy

`number`

Heliocentric distance in light-years.

## Returns

\[`number`, `number`, `number`\]

`[x, y, z]` chart position in scene units.
