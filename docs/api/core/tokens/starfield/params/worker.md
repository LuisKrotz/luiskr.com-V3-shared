# `core\tokens\starfield\params\worker.ts`

Worker-dispatch and deep-field layer parameters — the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\starfield\params\worker.ts`              |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CHUNK_MIN`

Points per chunk before a fill splits across the pool.

### `MAX_CHUNKS`

Chunk ceiling — the pool is ≤4 workers, extra chunks just queue.

### `SF_STAR_CLOUD`

Real star-cloud layer — HYG/Hipparcos catalogued stars (78k, mag ≤ 9,
heliocentric light-years) decoded from a packed Float32 binary and
drawn as one Points call at the Sun's true galactocentric position on
the Milky Way disc, so zooming toward the disc reveals real stellar
density rather than a stylized sprite. The proper-named subset lives
in the milky-way dossier JSON (`namedStars`) for future labelling.

### `FILE`

Lazy asset under the module data root (Float32 x,y,z,mag,ci,kind ×N).

### `STRIDE`

Record stride per object in the binary (x,y,z,mag,ci,kind).

### `MAX_STARS`

Safety bound on the record count read from the binary header.

### `UNITS_PER_LY`

Chart units per light-year — the galactic tier scale (SF_SCALE.
GALACTIC_LY) so real stars sit at true scale inside the volumetric
Milky Way disc: the ~3 000-ly HYG bubble spans ~60 units around the
Sun and resolves on zoom.

### `SUN_GC_LY`

Sun's galactocentric radius in light-years (ring offset on the disc).

### `POINT_PX`

Point size (px) — magnitude-attenuated in the shader-free material.

### `LOD_DIST`

Camera distance beyond which the cloud hides — disc carries the read.

### `CI_LOW`

B-V color-index ramp stops — below LOW reads blue-white, above RED red.

### `MAG_BIAS`

Magnitude → brightness curve: `BIAS − mag·SLOPE`, floor `FLOOR`.

### `STAR_MAX_LY`

Star-record sentinel cutoff (light-years) — the source catalogue
stamps ~1% of stars at exactly ~100 kpc when parallax is
unmeasurable; verbatim they draw a sparse ghost sphere far outside
the disc, so records past this distance are dropped.

### `EDGE_LY`

Selection-boundary fade (light-years) — the star catalogue ends at
~3 200 ly, which rendered as a hard golden sphere around the Sun.
Star and exoplanet brightness rolls to zero from `EDGE_LY` across
`EDGE_BAND_LY` so the cloud dissolves into the disc; DSOs are exempt
(their compressed far-shell is already a background layer).

### `OPACITY`

Whole-cloud opacity — additive vertex colors, so slightly <1.

### `CAM_FADE_IN`

Camera-distance fade (chart units from the Sun) — inside CAM_FADE_IN
the full density surrounds the viewer; past it the whole cloud rolls
toward CAM_FADE_FLOOR so the catalog's isotropic bubble never reads
as a solid sphere from outside. The authored catalog and the
volumetric disc carry the far-field read instead.

### `CAM_FADE_FLOOR`

Floor of 0 — the catalogue fully dissolves at range so its
isotropic extent can never silhouette a sphere against the disc.

### `FAR_CLAMP`

Far-field radius clamp (chart units) — deep-sky objects keep their
true sky direction but compress onto this shell when their real
distance exceeds it, so NGC galaxies stay visible inside the
Local-Group zoom bound instead of sitting at unreachable radii.

### `KIND_STAR`

Kind tags in the packed record (`kind` float).

### `REGISTRY_ACQUIRED`

Provenance + distance formatting for the 139k registry — ACQUIRED
is the ISO date the HYG/Exoplanet-Archive/OpenNGC source data was
pulled; MLY is the light-year cutoff above which distances render
in millions (keeps far-field DSO labels readable).

### `SRC_HYG`

Provenance strings shown on synthesized record panels.

### `SHARD_SIZE`

Registry index geometry — `public/data/index/` ships one JSON
manifest plus `<kind>-NNN.json` shards of SHARD_SIZE records each;
a body id's global rank decodes to shard/slot by pure division.

### `REGISTRY_KINDS`

Registry kinds in shard-scan order for incremental search.

### `SEARCH_LIMIT`

Cap on collected matches per registry search (UI page bound).

### `PAGE_SIZE`

Directory rows rendered before the "load more" affordance.

### `FLY_OFFSET`

Camera stand-off (chart units) when flying to a registry object —
point sources have no radius so the offset is fixed; the zoom
clamp still bounds how close OrbitControls lets the camera get.

### `BODY_CACHE`

Lazy registry-body spawning — when a catalog record is selected its
plain cloud point gets a real rendered body (textured star disc,
procedural exoplanet, DSO speckle cloud) mounted at the record's
heliocentric position on the Sun's pivot. BODY_CACHE caps the LRU
set so browsing never accumulates meshes; the radius tunables size
each spawned object for the fixed FLY_OFFSET standoff.

### `BODY_STAR_R`

Star sphere base radius (chart units) at magnitude 0.

### `BODY_STAR_MAGK`

Magnitude → radius slope: dimmer stars spawn smaller discs.

### `BODY_STAR_MIN_R`

Star sphere radius clamps (chart units).

### `BODY_PLANET_R`

Exoplanet sphere radius (chart units).

### `BODY_DSO_R`

DSO speckle-cloud radius + member count (galaxies/clusters).
