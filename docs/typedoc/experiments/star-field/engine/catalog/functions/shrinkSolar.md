[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/catalog](../README.md) / shrinkSolar

```ts
function shrinkSolar(d): SFBodyDef;
```

Defined in: experiments/star-field/engine/catalog.ts:102

Solar-tier shrink — every AU-scale body authored below is diagram-size
(a 12-unit Sun would mass 1 200 ly at the galactic tier — bigger than
honestly-scaled dwarf spheroidals). Multiplying the whole tier by
SF_SCALE.SOLAR_SCALE keeps the planets visitable while making the Sun
smaller than the least dwarf galaxy and leaving a real void between
the Kuiper edge (~30 units) and the neighborhood band (300+).
`radius`, `orbit`, `belt` bounds and `satellites` all shrink together
so internal proportions stay authored. Exported so coverage tails can
pin every arm — no current solar def carries satellites, but the arm
keeps a future moon-bearing def honest.

## Parameters

### d

[`SFBodyDef`](../../types/interfaces/SFBodyDef.md)

## Returns

[`SFBodyDef`](../../types/interfaces/SFBodyDef.md)

Copy with every spatial field scaled by SOLAR_SCALE.
