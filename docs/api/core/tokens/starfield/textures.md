# `core\tokens\starfield\textures.ts`

CDN URLs for the Star Field experiment texture set —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\starfield\textures.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_SF_TEX`

CDN root the Star Field texture set uploads under.

### `SF_TEXTURES`

CDN URLs for the full Star Field texture set — sole declaration site;
consumers import members rather than re-declaring the literals.

### `IO`

Moons — NASA-3D-Resources equirect global mosaics (Galileo/Cassini/
Voyager basemaps). 1440×720 is the highest public distribution for
most of these bodies; Phobos upgrades to the 5499px USGS map.

### `CERES`

Dwarf planets / small bodies — Ceres is the Dawn HAMO elliptical map
(PIA20351, 4000px); Vesta the GeoHack Dawn mosaic; Phobos the USGS
5499px map above; Bennu the 8k OSIRIS-REx-derived albedo; Ryugu the
ONC albedo map. Asteroid albedos are grayscale — honest to the data.

### `NEBULA_CARINA`

Real-photography billboards — NASA/Hubble/ESA imagery on the
deep-sky bodies (nebulae, star clusters, external galaxies). All
served from the CDN bucket; additive/masked compositing
hides the rectangular edge so the photo reads as the object.

### `SF_DATA_BASE`

Public-URL prefix for the per-body lazy-loaded JSON dossiers.

### `SF_NAMES_FILE`

Per-locale body-name table filename — `data/<locale>/names.json`
maps every curated body id to its localized display name; the router
slugifies it for translated deep-link segments and the navigator rows.

### `SF_ASSET_BASE`

Module public-asset root — dossier media entries join under this.
