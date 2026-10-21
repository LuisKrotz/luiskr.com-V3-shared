[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/kinds](../README.md) / SF\_SURFACES

```ts
const SF_SURFACES: Readonly<{
  ROCK: 'rock'
  ICE: 'ice'
  GAS: 'gas'
  LAVA: 'lava'
  OCEAN: 'ocean'
}>
```

Defined in: core/tokens/starfield/kinds.ts:87

Surface-recipe hints — catalog defs may pin the procedural painter's
style so a body matches its dossier description (a tidally-locked
lava planet must never draw ocean bands). Absent → the seed picks
within the kind's bias as before.
