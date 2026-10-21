# `core\tokens\starfield\params\weather.ts`

Living-planet parameters — the procedural weather field

| | |
|---|---|
| **Source** | `src/core\tokens\starfield\params\weather.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CLOUD_FREQ`

Base fbm coverage frequency — sampled in unit-sphere space so the
value counts octaves of planetary-scale features (2.8 ≈ continent-
sized cloud banks with sub-structure).

### `CLOUD_DETAIL_FREQ`

Detail octave — a second fbm layer at ~4× the base frequency that
breaks coverage into clumpy, cauliflower-edged banks instead of
smooth latitude stripes; DETAIL_GAIN is its blend weight.

### `CLOUD_EVOLVE`

Noise-field evolution rate (scene-seconds⁻¹) — slow morph, no boil.

### `CLOUD_STEER`

How much the real 8k cloud map steers procedural coverage (0..1).

### `COVER_LO`

Coverage ramp edges — below LO is clear sky, above HI is overcast.
A tight ramp punches broken cloud shapes out of the field; a wide
soft ramp reads as haze stripes.

### `JET_BASE`

Differential rotation — air masses shear against the surface:
base equatorial drift plus a mid-latitude jet boost (lat-weighted
so weather visibly races around the temperate bands, slow near the
poles — the read that makes the planet feel alive in close orbit).

### `LAT_MEANDER`

Latitude meander — slow noise that warps the coverage sample in the
vertical direction so jet-sheared banks undulate north/south
instead of ringing the globe in straight east-west stripes.

### `ITCZ_HALF`

ITCZ — the equatorial convergence band where trade winds meet.
HALF is the band half-width (radians of latitude), GAIN its extra
cover, WANDER how far it migrates with the solar declination
(monsoon seasonality — the band follows the sun north/south).

### `ITCZ_CELL_LO`

Convective-cell gate for the ITCZ — the band only clouds where the
detail octave beats this ramp, so the convergence zone renders as
a broken chain of storm puffs instead of a solid equatorial stripe.

### `DENS_POW`

Density→opacity power — thin noise haze is crushed toward zero so
only genuine cloud mass renders; keeps the surface saturated under
the deck.

### `STORM_N`

Hurricane vortices — N seeded tropical cyclones; R is the chord
radius of the storm envelope, GAIN its cover contribution, SWIRL
the spiral-arm twist (radians at core), DRIFT the band-limited
westward walk, FREQ the feeder-band noise frequency, EYE_R/DIP the
calm eye punch-out.

### `ICE_BASE`

Polar snow/ice — ICE_BASE is the northern solstice cap edge in
|lat| units (0.82 ≈ 55°N keeps the cap polar instead of blanketing
half the globe); ICE_DECL swings the line against the solar
declination so the cap visibly grows into winter and retreats in
summer. The south runs a tighter, steadier footprint — ICE_S_BASE
keeps it poleward of ~64°S and ICE_S_DECL halves its seasonal
swing, so southern glaciation never approaches the northern
winter's reach. SNOW_GAIN is the cap's deck-brightness
contribution — a fraction, not a coat.

### `VOLC_R`

Volcanic ash — one seeded eruption site pulsing on a slow period;
GAIN is plume darkness, VOLC_R its radius (unit-sphere chord),
VOLC_PERIOD the eruption cycle in scene-seconds.

### `ASH_TINT`

Ash plume tint — dark gray-brown against the white deck.

### `SHADOW`

Cloud shadow — the fraction the surface dims under dense deck on
the day side only (night lights must never be occluded).

### `SF_SOLAR_WIND`

Solar-wind activity cycle — one shared uniform drives the sun's flare
frequency AND every aurora shell, so a storm spike on the Sun visibly
reaches Earth/Jupiter/Saturn/Neptune a beat later. BASE+WAVE give the
slow ~11-year-style swell; the storm term multiplies two detuned sines
and takes a high power so spikes stay rare and sharp.

### `BASE`

Quiet-Sun floor of the wind uniform.

### `WAVE_AMP`

Slow activity swell amplitude + period (scene-seconds).

### `STORM_F1`

Storm spikes — product of two detuned sines to a high power lands a
bright gust every ~90–140 s that lasts a few seconds; GAIN scales
the spike on top of BASE+WAVE.

### `FLARE_N`

Limb flares — N seeded prominence sprites on the Sun's equatorial
band; each breathes at its own rate and stretches past the limb when
the wind spikes.

### (module scope)

Aurora shells — polar emission curtains on atmosphere-bearing bodies.
Driven by the shared solar-wind uniform: quiet wind shows a faint oval
shimmer, storms ignite bright rippling curtains.

### `LAT0`

Auroral oval center — |lat| on the unit sphere (~0.8 ≈ 53° from
the equator, the real auroral zone sits just inside the pole).

### `OVAL_W`

Oval gaussian half-width — the emission is a thin curtain RING
hugging the oval; wide windows read as a smeared cap (the old
"green fried egg"), so this stays deliberately narrow.

### `LAT_WOBBLE`

Oval waviness — substorm arcs buckle the ring with longitude;
sampled as noise on the sphere so there's no seam at ±π.

### `FOLD_FREQ`

Curtain folds — real auroral striation runs ACROSS the band
(rays stand perpendicular to the arc), so the fold phase is the
signed distance from the oval centerline, not longitude — from
orbit this reads as woven ribbon filaments instead of radial
spokes. FOLD_JAG slides the fold phase with noise along the oval
so the ribbons curl and merge; FOLD_SHARP (a power) thins each
filament's bright core; FOLD_DRIFT ripples the weave with time.

### `FOLD_FLOOR`

Fold floor — gaps between filaments stay dimly lit.

### `ARC2_OFF`

Secondary arc — real substorm ovals frequently run a fainter
parallel arc poleward of the main one; ARC2_OFF is its latitude
offset, ARC2_GAIN its relative brightness.

### `PATCH_FREQ`

Arc patchiness — a medium-frequency mottle multiplies the oval so
segments vary in brightness irregularly (patches, torch curls)
instead of a smooth one-level arc.

### `ARC_FREQ`

Arc breakup — low-frequency longitude modulation flares sections
of the oval (auroral substorms brighten one sector at a time);
ARC_GAIN is the modulation contrast — high values let sectors go
dark so storms never wash the whole oval flat.

### `INTENSITY`

Brightness scale against the wind uniform — a faint shimmer that
storms multiply through `wind`, visible on the dark limb without
reading as a second surface layer.

### `SHELL_SCALE`

Shell lift above the surface radius — hugs the atmosphere top.

### `LIMB_POW`

Limb-fade power — |view normal z| powered this high so the oval
only glows when seen against the planet's face; at the silhouette
the shell would otherwise draw arcs floating off the limb.

### `TILT`

Default magnetic-axis tilt (radians) — Earth's dipole sits ~11°
off the spin axis; per-body `aurora.tilt` overrides (Neptune's
dipole is offset ~47°, swinging its oval wildly off-pole).

### `NIGHT_LO`

Night-side gate — auroras read through darkness: `dot(normal,
sunDir)` smoothstepped between the edges so day-side emission
fades to DAY_FLOOR instead of vanishing (UV aurora still runs
in sunlight, it just doesn't show).

### `HEMI_LO`

Hemisphere gate — `aurora.south === false` fades the oval out
across the magnetic equator so only the boreal (north) curtain
shows; the giants keep both ovals. Edges are signed magnetic
latitude on the unit sphere.

### `TOP`

Default palette — oxygen-green curtain top over a violet-red
lower edge (Earth); per-body `aurora.color/colorLow` override for
the giants' hydrogen-dominated blues and cyans.

### `SF_METEOR`

Meteor strikes — airless cratered bodies (Moon, Callisto, Mercury,
the asteroid dwarfs) still take hits; a small pooled sprite flashes
at a random surface point every few seconds, the way a real impact
fireball flickers. Pool keeps allocation out of the frame loop.

### `INTERVAL`

Mean seconds between strikes per body (per-strike jitter ±60%).

### `LIFE`

Flash duration — rise fast (25% of life), decay slow.

### `SIZE`

Flash sprite diameter × the body radius.

### `POOL`

Sprites pooled per flagged body.

### `COLOR`

Impact flash tint — hot white-gold impact fireball.

### `SF_CONSTELLATION`

LEO constellation shell — the Starlink-class swarm: dozens of small
lit specks sharing one inclined orbital plane that sweeps as a unit.

### `ORBIT`

Shell altitude as a multiple of the body radius.

### `SPEED`

Shell angular speed multiplier (frame pivot).

### `INCLINE`

Orbital plane inclination (radians, ~53° like Starlink).

### `INCLINE_SPREAD`

Inclination spread (radians) — real shells fly several planes
(53°, 53.2°, 70°, 97.6° for Starlink), so per-satellite jitter
around the base scatters the swarm into a volume instead of
tracing a single crisp ring.

### `JITTER`

Altitude jitter fraction — the shell has thickness, not a line.

### `SIZE`

Point size vs the host body radius — glints, not balls.

### `REVEAL`

Near-field reveal distance (world units) — LEO satellites are
invisible from interplanetary range: the swarm resolves only when
the camera is inside the Moon's orbital neighborhood (~4.5 units),
so the threshold sits just past it. The value is an absolute
camera-to-host distance, replacing the generic LOD `PAD + size·SCALE`
reach that would otherwise key on the host's heliocentric orbit and
reveal the shell from halfway across the chart.

### `SF_PLUME`

Cryovolcanic/volcanic plume systems — Enceladus vents water-ice
geysers from its south-polar tiger stripes, Io throws sulfur plumes
hundreds of km over its whole surface. Each vent carries a steady
jet sprite plus a rising puff sprite that cycles outward, fades, and
recycles — a continuous eruption read without per-frame allocation.

### `VENTS`

Default vent count when `def.plumes.count` is unset.

### `HEIGHT`

Jet/puff reach as a multiple of the body radius.

### `WIDTH`

Jet sprite width × body radius.

### `JET_BASE_W`

Jet cone footprint — the steady column is an open-ended tapered
cylinder rooted at the vent (narrow throat, umbrella spread at the
top, CylinderGeometry(rTop>rBottom)). JET_SEG is the radial
tessellation — 12 keeps the silhouette round under any azimuth.
A vertical alpha gradient texture feeds `map`: blazing at the vent
(v=1 side) and dissolving into transparency at the rim.

### `PERIOD`

Rising-puff cycle seconds (per-vent phase is seeded).

### `OPACITY`

Steady jet opacity at the vent base.

### `PUFF_OPACITY`

Puff opacity peak at the bottom of its rise.

### `SUN_LO`

Sunlight gate — cryovolcanic jets scatter sunlight, so a vent on
the body's night side shows only a faint smudge. `dot(ventDir,
sunDirLocal)` smoothsteps between LO/HI: fully dark vents keep
DARK_FLOOR so the plume never pops discontinuously at the
terminator.

### `POLAR_LAT`

Polar vent latitude band — |y| on the unit sphere above this marks
the tiger-stripe cluster (Enceladus vents sit ~75°S). Scattered
(volcanic) vents ignore it and sample the whole sphere.

### `POLAR_SPREAD`

Per-vent spread around the pole direction (unit-sphere radius).
