[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/catalog/milky-way](../README.md) / MILKY\_WAY

```ts
const MILKY_WAY: SFBodyDef[]
```

Defined in: experiments/star-field/engine/catalog/milky-way.ts:32

Milky Way neighborhood — famous nearby systems at their real galactic
(l, b, distance) coordinates through `gpos`. Every star sits at its
honest compressed distance (Proxima 0.042 units, Deneb 26.15) so the
chart never lies about who's next to whom — no stars render inside
the solar diagram. Marker radii are point-scale glyphs (~0.01–0.05
units, physically a star is far smaller) sized by luminosity class so
giants still read bigger than dwarfs; pickability comes from the
radius-scaled invisible proxy, not inflated geometry.

Two LOD faces per star (see `buildStarBodies`): the flat point-glow
carries the chart view, while a seeded photosphere — granulation,
sunspot groups past the `activity` threshold, `rim` limb darkening,
corona and flares — resolves on approach and `spin` visibly turns the
surface. Planets and stellar companions are real parented bodies with
their own eccentric orbits, so every authored system simulates its
members rather than decorating the star's glyph.
