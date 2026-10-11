[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/scale](../README.md) / sfGalacticPos

```ts
function sfGalacticPos(
   lDeg, 
   bDeg, 
   distLy, 
   tilt
): [number, number, number];
```

Defined in: experiments/star-field/engine/scale.ts:75

Galactic-coordinate → chart-position conversion. Real galactic
coordinates are heliocentric: `l` longitude measured from the galactic
centre direction, `b` latitude above the plane, `d` distance in
light-years. The standard galactic frame (x toward l=0°, y toward
l=90°, z toward the north galactic pole) is right-handed; the chart
maps it to (-x, z, y) so the galactic centre lands at −X (matching the
Milky Way disc's offset centre) while staying right-handed.

The same rotation.x the deep-field cloud applies (`-π/2 + tilt`) then
leans the whole galactic frame onto the rendered disc tilt, so every
authored body shares the plane the particle spiral draws.

## Parameters

### lDeg

`number`

Galactic longitude in degrees.

### bDeg

`number`

Galactic latitude in degrees.

### distLy

`number`

Heliocentric distance in light-years.

### tilt

`number`

Milky Way disc tilt in radians (the catalog `tilt` field).

## Returns

\[`number`, `number`, `number`\]

`[x, y, z]` world position in chart units.
