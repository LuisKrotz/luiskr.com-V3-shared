# `experiments\star-field\engine\frame\fx.ts`

Ambient-life per-frame effects — `pulse` bodies (variable

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\frame\fx.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Live particle-sim record stashed on each tail `Points` node's
`userData[SF_USER_GAS]` — updateFx reads the seeded per-grain vectors
and rewrites `pos`/`col` in place each frame (the buffers are shared
with the geometry's BufferAttributes, so `needsUpdate` is the only
GPU round-trip; nothing allocates per frame). Bare test fixtures may
stub any field — every access is optional-chained and the layer is
simply skipped when the record is absent.

### (module scope)

Quaternion-ish — the scratch shape updateFx needs for the comet
billboard math (`invert`, `multiply`). Structural so the three.js
mock and the real Quaternion both satisfy it.

### `_mat`

Billboard scratch — per-grain instance matrices are composed as
`translate(grain) · orient(camera) · scale(size)`: a tail quad must
always face the camera, so its local orientation is the node's
inverse world quaternion times the camera's world quaternion. The
objects are created lazily off `s.THREE` (the module arrives on the
state, not as an import) and reused every frame — zero allocation in
the hot loop.

### `solarWindAt`

Solar-wind level — the shared activity signal every wind-touched
system reads from `s.solarWind`/`s.fxTime`: a slow BASE+WAVE swell
(the ~11-year-style activity cycle compressed to scene seconds) plus
sharp storm spikes from two detuned sines raised to a high power —
rare, brief, bright gusts that make auroras ignite and flares leap.

- `@param` t Scene seconds.
- `@returns` Activity level (0 quiet … ~1.5 storm).

### `updateTail`

One comet-tail layer update — the grain sim for a single `Points`
field (positions/colors rewritten in place on the shared buffers,
instance matrices composed into the pooled scratch). Module-level on
purpose: declaring it inside updateFx would allocate a closure every
frame a comet is live; explicit params keep it monomorphic and
capture-free.

- `@param` pts The tail Points node carrying `userData[SF_USER_GAS]`.
- `@param` s Engine state (camera for the billboard quat, scene `t`).
- `@param` f Comet activity factor 0..1 (tail length/width/opacity scale).
- `@param` windK Solar-wind gain multiplier for the grain column.

### `cam`

Billboard orientation — the quads face the camera in the
node's local frame: `local = nodeWorldQuat⁻¹ · camWorldQuat`.
Without a live camera/renderer (tests) the grain buffers
still update — only the matrix write is skipped.

### `rr`

Envelope — `smoothstep(0, RAMP, d)` ramps fresh grains in
(no pop at the nucleus), `(1−d)^FADE` dissolves them toward
the tip, `dim[i]` spreads per-grain brightness, `windK`
surges the whole column on solar storms, and `GAIN` pushes
overlapping additive grains into saturation so the cloud
fuses into a column.

### `if`

Instance matrix — the grain's quad swells downstream
(`SZ_BASE + SZ_GROW·d`: dispersing gas expands) and carries
the seeded size jitter.

### `updateFx`

Ambient life — the small "alive" behaviors on top of the static chart:
`pulse` bodies (variable stars, pulsars, flaring cores) breathe via a
sine scale oscillation; `cycle` bodies (Earth's glaciation) lerp the
surface tint between the neutral white and the ice-age palette.

- `@param` s Engine state.

### `windK`

Particle tails — each layer's `userData.gasPts` holds the
seeded grain field; this loop is the emission simulation:

d = frac(phase[i] + t·rate[i]) — grain age 0→1
x = d·len — anti-sunward drift
y = lat[i]·sp + sin(wobble)·amp — lateral fan +
plasma turbulence
z = latZ[i]·sp·ZFLAT — thin-sheet depth
sp = spread·(1 + grow·d) — solar-wind
dispersion fan
color = rgb·smoothstep(d/RAMP)·(1−d)^FADE·dim[i]·windK

The `(1−d)^FADE` term makes every grain die at its own
distance — the tip dissolves grain-by-grain instead of ending
on a line — and vertex-color brightness doubles as alpha under
additive blending, so no quad edge exists anywhere in the
silhouette. `len`/`sp` scale with the periapsis factor `f`
(sublimation ≈ solar flux), and `windK` couples brightness to
the shared solar-wind level so storms surge the stream.
~640 grains × a handful of flops — zero allocation.

### `T`

One lazy scratch set for the whole comet section — matrix/quat
compose targets shared by every tail layer this frame.
