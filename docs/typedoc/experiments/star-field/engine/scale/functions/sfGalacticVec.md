[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/scale](../README.md) / sfGalacticVec

```ts
function sfGalacticVec(
   xGal, 
   yGal, 
   zGal, 
   tilt
): [number, number, number];
```

Defined in: experiments/star-field/engine/scale.ts:113

Cartesian galactic → chart-position conversion — the shared back end
of `sfGalacticPos` used directly by the deep-field cloud and registry
fly-to, whose records already carry heliocentric galactic xyz. The
standard galactic frame (x toward l=0°, y toward l=90°, z toward the
north galactic pole) maps to (−x, z, y): chart X = −x_gal puts the
galactic centre at −X where the Milky Way disc sits, Y = z_gal raises
the north galactic pole, Z = y_gal keeps the frame right-handed. The
same `rotation.x = −π/2 + tilt` the cloud applies then leans the
whole galactic frame onto the rendered disc tilt.

## Parameters

### xGal

`number`

Heliocentric x_gal in light-years (toward l=0°).

### yGal

`number`

Heliocentric y_gal in light-years (toward l=90°).

### zGal

`number`

Heliocentric z_gal in light-years (toward NGP).

### tilt

`number`

Milky Way disc tilt in radians (the catalog `tilt` field).

## Returns

\[`number`, `number`, `number`\]

`[x, y, z]` world position in chart units.
