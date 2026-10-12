# `experiments/star-field/engine/catalog/local-group.ts`

Local Group dwarf + satellite galaxies — seeded

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/catalog/local-group.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.    |

## Members

### `LOCAL_GROUP`

Local Group dwarf + satellite galaxies — the ~30 small members that
orbit the Milky Way and Andromeda, placed at real galactic (l, b,
distance) through `gpos`. Milky Way satellites inside ~1 Mly stay on
the honest galactic tier (LMC ~1 630, SagDEG ~810 units); the M31
subgroup and the scattered dIrrs land on the Local-Group tier beyond
~10k units. Drawn as seeded elliptical point smudges — warm for the
old-population spheroidals, cool for the star-forming irregulars.
