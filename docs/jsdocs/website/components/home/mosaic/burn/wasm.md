# `website\components\home\mosaic\burn\wasm.ts`

| | |
|---|---|
| **Source** | `src/website\components\home\mosaic\burn\wasm.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Kind-specific wasm surface for the burn crate — typed on top of the
generic WasmWidget so calls stay checked.

### `packLetters`

Packs the session's letter table into the crate's flat layout —
6 f32s per glyph: x0, y0, x1, y1 (paper device px), v (speed
multiplier), delay (ignition fraction). Mirrors
`sim::BurnSim::set_letters` field-for-field.
- `@param` s The live session — letters were filled by analyzePaper.
- `@returns` Flat letter table, or null when analysis produced none.

### `packColors`

Packs the burn inks into the crate's [core, mid, edge, scorch,
smoke] × rgba table. parseCssColor yields 0..1 rgb triples; alpha
is 1 — the JS sim paints particles fully opaque and fades via
globalAlpha, which the crate folds into the emitted tint instead.
- `@param` s The live session — ink was resolved by readBurnInk.
- `@returns` 20 f32s for `set_colors`.

### `pushBurnSession`

Pushes the session's static tables into a freshly mounted widget —
begin() creates the sim (dir + paper origin + deterministic seed),
then letters/ink/colors land once. Called from the mount callback
after the artifact's init has resolved.
- `@param` s The live session.

### `frameBurnWasm`

Per-frame wasm arm — pushes direction, stage + jagged amplitude and
ticks the sim once. `set_dir` clears live particles inside the crate
(a flip restarts the mote stream), so it is only forwarded when the
session's dir actually changed.
- `@param` s The live session.
- `@param` stage Global burn stage 0..1 (climbs in both directions).
- `@param` jagAmp Jagged-edge amplitude in device px.
- `@param` dt Seconds since the previous frame.

### `liveBurnParticles`

The loop's settle check for the wasm path — the session idles once
the front is spent AND the crate's last mote died (mirroring the JS
`particles.length === 0` condition).
- `@param` s The live session.
- `@returns` Live particle count in the crate's sim.

### `tryWasmBurn`

Attempts the wasm mount: creates the stacked particle canvas (same
class/box as the paper canvas — it paints above it by DOM order) and
mounts the burn artifact on it with MANUAL drive — this module keeps
the session's own RAF loop, so the bridge only initializes the
surface. On any failure the 2D particle path simply keeps running.
- `@param` s The live session — must already be laid out (syncPaper ran).

### `setBurnDirWasm`

Pushes a dir flip into the crate (burn ↔ rebuild) when mounted.

### `mirrorBurnGpuCanvas`

Mirrors the paper canvas's CSS box onto the particle canvas.

### `destroyBurnWasm`

Releases the wasm handle + removes the particle canvas — teardown
path only; a pending mount drops its canvas when it resolves.
- `@param` s The session being torn down.
