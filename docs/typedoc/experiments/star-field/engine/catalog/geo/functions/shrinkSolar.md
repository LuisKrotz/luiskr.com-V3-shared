[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/catalog/geo](../README.md) / shrinkSolar

```ts
function shrinkSolar(d): SFBodyDef
```

Defined in: experiments/star-field/engine/catalog/geo.ts:70

Solar-tier shrink — every AU-scale body authored below is diagram-size
(a 12-unit Sun would mass 1 200 ly at the galactic tier — bigger than
honestly-scaled dwarf spheroidals). Multiplying the whole tier by
SF_SCALE.SOLAR_SCALE lands the Sun's drawn disc at 0.024 units — under
Proxima's true 0.042-unit distance, so no star renders inside the
photosphere — and the whole system inside ~0.23 units, honest ordering
against the stellar neighbourhood at the cost of planet specks that
only the fly-to/zoom tier reveals.
`radius`, `orbit`, `belt` bounds and `satellites` all shrink together
so internal proportions stay authored. Exported so coverage tails can
pin every arm — no current solar def carries satellites, but the arm
keeps a future moon-bearing def honest.

## Parameters

### d

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

## Returns

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Copy with every spatial field scaled by SOLAR_SCALE.
