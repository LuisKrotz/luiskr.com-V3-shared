[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/scale](../README.md) / sfChartDist

```ts
function sfChartDist(ly): number;
```

Defined in: experiments/star-field/engine/scale.ts:36

Piecewise distance → chart-units compression shared by the authored
catalog, the deep-field point cloud and the registry fly-to math.
Continuous at each break so close objects keep honest ratios: a body
twice as far always lands twice as far within a tier, and the tier
boundaries join smoothly (1 Mly → 10 000 units from either side).

## Parameters

### ly

`number`

Heliocentric distance in light-years.

## Returns

`number`

Compressed chart radius in scene units.
