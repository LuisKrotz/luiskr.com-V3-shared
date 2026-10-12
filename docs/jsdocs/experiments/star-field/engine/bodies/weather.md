# `experiments/star-field/engine/bodies/weather.ts`

Living-planet systems — everything that makes Earth (and

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/weather.ts`   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

TSL node shorthand — the fluent node graph (`.mul().add()…`) is fully
dynamic; one file-local alias keeps the builder readable instead of
fighting per-call generics.

### (module scope)

Live uniform handle shared between the builders and updateFx.

### `time`

Scene-seconds uniform — updateFx writes `s.t` into `.value`.

### `rodrigues`

Rotates position `p` around axis `k` by angle `a` — Rodrigues'
rotation formula: p·cos a + (k×p)·sin a + k·(k·p)·(1−cos a). Used to
swirl the weather sample point around each hurricane's eye axis.

### `weatherField`

The shared weather field — returns { density, ash, snow, day } nodes
sampled at `positionLocal`, so the cloud deck and the surface shadow
read the SAME sky in the same frame. `positionLocal` is object space,
meaning the field co-rotates with the body while the internal drift
terms add the atmosphere's own differential motion on top.

- `@param` TSL three/tsl namespace.
- `@param` time Shared time uniform (scene seconds).
- `@param` sunDirU Shared sun-direction uniform node — its Y doubles as
- `@param` cloudTex The real 8k cloud map steering large-scale coverage.
- `@returns` Field nodes: cloud density, ash darkness, snow cover, dayF.

### `makeWeatherClouds`

Builds the living cloud deck + applies the matching surface shadow —
a lit MeshStandardNodeMaterial so the deck takes real sun shading
(bright limb, dark night side, true terminator) instead of the old
additive white wash. `surfaceMat` gets a colorNode multiplying the
day-side diffuse by `1 − SHADOW·density` so thick weather visibly
dims the ground beneath it. The shared `fxTime` uniform drives field
evolution (updateFx writes it once per frame).

- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors.
- `@param` def Catalog entry (radius sizes the shell).
- `@param` cloudTex Loaded 8k cloud map (coverage steering).
- `@param` sunDir Shared day/night sun-direction vector.
- `@param` surfaceMat The body's surface material (node path only).
- `@param` time Shared scene-time uniform node (`s.fxTime`).

### `makeAurora`

Aurora curtains — a thin rayed emission OVAL centered on the body's
MAGNETIC pole (the `tilt` offsets the sampling frame by the dipole
angle, so Neptune's wildly offset field draws a swung oval, not a
symmetric polar cap). Two shells stack the curtain: the lower ring
hugs the atmosphere at SHELL_SCALE, an upper ring at SHELL_SCALE2
with poleward-shifted latitude reads as curtain tops standing off
the limb. Longitude fbm provides both the oval's substorm buckling
and the high-frequency curtain rays; the shared wind uniform gates
brightness so a solar storm ignites every aurora-bearing world in
the same frame, and the optional sun-direction uniform dims the
day-side arc (UV emission runs in sunlight — it just doesn't show).

- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors.
- `@param` def Catalog entry — `aurora` carries the per-body palette,
- `@param` time Shared time uniform node (updateFx-driven).
- `@param` wind Shared solar-wind uniform node (updateFx-driven).
- `@param` sunDir Shared sun-direction vector when the body registers

### `makeConstellation`

Starlink-class constellation — a `count`-point cloud on one inclined
orbital shell: each satellite is a single lit pixel glinting as it
laps the planet, and the whole shell precesses as a unit on its
pivot (frame.ts rotates it like a satellite pivot). Raycast is
stubbed so the swarm can never steal a body click.

- `@param` THREE The three.js module.
- `@param` def Catalog entry — `constellation` carries count/orbit.

### `makeSolarFlares`

Solar limb flares — `FLARE_N` seeded prominence sprites rooted at the
photosphere edge of the Sun's equatorial band. updateFx scales them by
`wind × sin⁴(phase + t·rate)` so eruptions breathe with the activity
cycle and spike outward when storms hit.

- `@param` THREE The three.js module.
- `@param` def Catalog entry (Sun).
- `@param` glowTex Shared radial-glow texture for the sprite maps.
- `@returns` Flare records for the node's `flares` list.

### `makeMeteorPool`

Meteor flash pool — `SF_METEOR.POOL` additive glow sprites parented
to the cratered body's mesh, all dormant (opacity 0). updateFx fires
a slot at a random surface point when `meteorNext` elapses and fades
it over `SF_METEOR.LIFE`, so a body like Callisto reads as still
being bombarded — matching the "saturated with craters" dossier —
instead of standing geologically dead.

- `@param` THREE The three.js module.
- `@param` def Catalog entry (meteors-flagged).
- `@param` glowTex Shared radial-glow texture for the flash map.
