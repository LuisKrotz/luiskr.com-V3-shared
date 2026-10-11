[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/catalog](../README.md) / nbr

```ts
function nbr(
   l, 
   b, 
   dLy
): [number, number, number];
```

Defined in: experiments/star-field/engine/catalog.ts:47

Neighborhood-band placement — bodies inside ~3 000 ly compress to
sub-unit chart radii (Proxima's 4.2 ly → 0.04 units, inside the
exaggerated solar system), so near objects keep their true galactic
direction but ride a monotonic legibility band between
NEIGHBORHOOD_INNER and INNER+BAND units. Beyond the band the honest
compressed radius takes over, so distant bodies stay truthful.

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
