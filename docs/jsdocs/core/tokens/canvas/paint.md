# `core\tokens\canvas\paint.ts`

Canvas/GLSL paint-color tokens — sole declaration site

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\canvas\paint.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `DISC_BG`

Neutral disc background (non-HC).

### `SILVER_DEEP`

Liquid body — the deep end of the mercury pour ramp.

### `SILVER_TOP`

Liquid surface — the metal palette's specular pole.

### `FOAM_CREST`

Foam-crest glow riding the liquid surface.

### `BUBBLE_HI`

Rising-bubble highlight inside the liquid.

### `INK_WHITE`

Pure-white ink/stroke pole.

### `GLYPH_DARK`

Glyph pulse peak on the dark surface.

### `GLYPH_LIGHT`

Glyph pulse trough on the light surface.

### `GLOW_DARK`

Ambient glyph glow on the dark surface.

### `GLOW_LIGHT`

Ambient glyph glow on the light surface.

### `TRACK_OFF`

Off-state track fill.

### `TRACK_STATS`

Stats context — emerald-green on state.

### `TRACK_GRID`

Grid context — cyan-blueprint on state.

### `TRACK_MOTION`

Motion context — violet/magenta on state.

### `TRACK_CONTRAST`

Contrast context — warm-amber on state.

### `WAVE_OFF`

ECG wave — off-state grey.

### `WAVE_ON`

ECG wave — on-state green.

### `GRID_OFF`

Blueprint grid lines — off-state slate.

### `GRID_ON`

Blueprint grid lines — on-state cyan.

### `STREAK`

Wind-drift streak (motion-off).

### `DATUM`

Calm centerline datum (motion-on).

### `WIPE_DARK`

Contrast wipe — dark side.

### `SURFACE_NEAR_WHITE`

Near-white surface (wipe light side, knob base).

### `SEAM`

Amber seam riding the contrast boundary.

### `DOT_OFF`

Knob dot — off-state grey.

### `DOT_STATS`

Knob dot — stats on-state.

### `DOT_GRID`

Knob dot — grid on-state.

### `DOT_MOTION`

Knob dot — motion on-state.

### `DOT_CONTRAST`

Knob dot — contrast on-state.

### `BLACK`

Solid black (bezel/shadow mixes).

### `SKY_NIGHT_A`

Night sky — zenith end.

### `SKY_NIGHT_B`

Night sky — horizon end.

### `SKY_SYS_A`

System-twilight sky — zenith end.

### `SKY_SYS_B`

System-twilight sky — horizon end.

### `SKY_DAY_A`

Day sky — zenith end.

### `SKY_DAY_B`

Day sky — horizon end.

### `SUN_CREAM`

Sun core cream.

### `RING_INNER`

Corona ring — inner.

### `RING_OUTER`

Corona ring — outer.

### `AURORA_COOL`

Aurora wave — cool end.

### `AURORA_WARM`

Aurora wave — warm end.

### `MESA_BACK_NIGHT`

Back mesa — night.

### `MESA_BACK_SYS`

Back mesa — system twilight.

### `MESA_BACK_DAY`

Back mesa — day.

### `MESA_FRONT_NIGHT`

Front dune — night.

### `MESA_FRONT_SYS`

Front dune — system twilight.

### `MESA_FRONT_DAY`

Front dune — day.

### `RIPPLE`

Interactive ripple tint.

### `KNOB_SHADOW`

Knob drop-shadow tint.

### `KNOB_SYS`

Knob base — system position.

### `KNOB_SUN`

Knob base — day position.

### `CRATER`

Lunar crater fill.

### `HALO_SUN`

Knob corona — day position.

### `HALO_SYS`

Knob corona — system position.

### `FLAG_DIVIDER`

Split-flag dividing line — near-black hairline (`vec4` w/ alpha).

### `CANVAS_PAINT_CSS`

CSS hex strings — 2D-context fallbacks (ctx.strokeStyle/fillStyle).

### `METAL_STEEL`

`$metal-steel` — the site accent (SILVER_TOP's fallback cut).

### `MESH_GREY`

About-mesh dot lattice — quiet neutral used only when the themed
`--text-muted` ink cannot resolve (its pre-theme value).
