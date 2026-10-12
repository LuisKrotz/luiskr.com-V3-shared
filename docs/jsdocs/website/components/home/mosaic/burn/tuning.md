# `website/components/home/mosaic/burn/tuning.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/home/mosaic/burn/tuning.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_PAD_X`

Side/vertical bleed (css px) around the title box — embers need room.

### `_PAD_TOP`

Top bleed (css px) — rising embers need the most headroom.

### `_PAD_BOTTOM`

Bottom bleed (css px) — the front ignites at the baseline edge.

### `_JAG_RATIO`

Jagged-edge amplitude as a fraction of the paper height — a small
organic waver on top of the per-letter speed spread.

### `_COL_SPEED_MIN`

Per-letter burn-speed range — each glyph bucket burns between ~55%
and ~145% of the base rate, so letters vanish at visibly different
moments while all still finish inside the description's draw time.

### `_COL_SPEED_SPAN`

Random speed spread above the minimum — v lands in 0.7..2.0×.

### `_SCORCH_RATIO`

Scorch-band height below the burn front (fraction of letter height).

### `_BAND_MIN`

Scorch-band minimum height in device px (tiny letters still char visibly).

### `_BAND_ALPHA`

Opacity of the char band laid over ink just above the front.

### `_GLOW_ALPHA`

Opacity of the additive ember wash hugging the live front.

### `_FRONT_STEP`

X stride for tracing a letter's jagged front polygon (device px).

### `_BURN_MS_MIN`

Seconds the front spends travelling the paper. Falls under desc time.

### `_BURN_MS_MAX`

Burn duration ceiling — long descriptions cap here, never run on.

### `_DESC_CHAR_MS`

Per-char desc draw estimate (ms) — mirrors the 8ms char delay + draw.

### `_DESC_TAIL_MS`

Trailing draw allowance (ms) after the description's last char.

### `_P_MAX`

Particle budget — hard cap on live embers + flecks.

### `_SPAWN_PER_S`

Ember spawn per second along the front while it burns.

### `_CHAR_FRACTION`

Fraction of spawns that are dark char flecks (rest are embers).

### `_EMBER_LIFE_MIN`

Particle lifetime bounds (seconds).

### `_EMBER_LIFE_MAX`

Ember lifetime ceiling — sparks die well before the front finishes.

### `_FLECK_LIFE_MIN`

Fleck lifetime floor — char flecks outlast embers (they tumble).

### `_FLECK_LIFE_MAX`

Fleck lifetime ceiling (seconds).

### `_EMBER_VY_MIN`

Ember upward velocity bounds (canvas px/s).

### `_EMBER_VY_MAX`

Ember upward velocity ceiling — the fastest sparks outrun the front.

### `_EMBER_VX`

Ember sideways drift bound (canvas px/s).

### `_FLECK_VY`

Fleck launch velocity + gravity pull (canvas px/s, px/s²).

### `_FLECK_VX`

Fleck sideways drift bound (canvas px/s).

### `_FLECK_G`

Gravity accelerating flecks + rebuild deposits downward (px/s²).

### `_DEPOSIT_VY`

Rebuild deposit launch speed (canvas px/s) — motes leave the empty
zone drifting down gently, then _FLECK_G accelerates the fall.

### `_EMBER_SIZE`

Particle size bounds in device px.

### `_FLECK_SIZE`

Fleck size bound — char scraps read bigger than ember sparks.

### `_ALPHA_STRIDE`

Byte offset of the alpha channel inside a getImageData pixel quad.

### `_INK_ALPHA_MIN`

Alpha floor for "has ink" — anti-aliased feather below ~12% is ignored.

### `_IGNITE_DELAY`

Max ignition delay, as a fraction of total progress — letters catch
fire anywhere in the first ~fifth of the burn.

### `_BURN_END`

Progress at which the slowest letter finishes — the last glyph ashes
out just before the description's final chars land, never after.

### `_GLOW_RATIO`

Ember glow band height, as a share of letter height.

### `_REBUILD_RATIO`

Rebuild speed on un-hover — the un-burn replays the consume front
downward at this fraction of the burn duration, so rebuilding the
title reads quicker than burning it away while staying visible.
