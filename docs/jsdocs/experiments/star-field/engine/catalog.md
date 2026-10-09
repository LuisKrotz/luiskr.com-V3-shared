# `experiments/star-field/engine/catalog.ts`

The star-field body catalog — one static SFBodyDef per

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/catalog.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SOLAR`

Solar-system bodies — compressed orbits so all eight planets fit inside
a single readable sweep around the Sun.

### `MILKY_WAY`

Milky Way neighborhood — famous nearby systems placed on the mid-field
galactic plane; `satellites` dress each system with orbiting companions.

### `NEBULAE`

Nebulae — billboard sprites with procedural glow, mid-far field.

### `GALAXIES`

External galaxies — far-field sprite discs on the outer ring.

### `SF_CATALOG`

Full catalog — the order the navigator drawer lists groups in.

### `SF_GROUP_ORDER`

Ordered group keys for the navigator drawer sections.

### `sfCatalogByGroup`

Groups catalog entries by SF_GROUPS key — the navigator renders one
section per key with the body's display name on a focusable button.
- `@returns` group key → defs in catalog order
