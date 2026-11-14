# `core\tokens\motion\page-backdrop.ts`

Tuning tokens for the WebGL page backdrop — the grained

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\page-backdrop.ts`                 |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `DPR_MAX`

Backing-store devicePixelRatio cap. The field is smooth colour with
an in-shader dither, so rendering past 2× adds GPU fill for no
visible gain; 2× keeps retina output at native pixels so the dither
lands per device pixel instead of being upsampled into blur.

### `MAX_DIM`

Per-axis backing-store cap in device pixels — 4K-wide at 1× or a
2× laptop panel both fit; beyond this the browser's bilinear
downsample of a 32-bit-dithered field is still band-free.

### `PERIOD_1`

Drift periods (seconds) for the three lobe layers — pairwise
coprime so the layers never phase-lock into a repeating pose; these
mirror the former CSS keyframe durations (16/21/27s).

### `PERIOD_KEY`

Key-light drift period (seconds) — coprime with the three field
periods so the right-side specular pool never phase-locks into a
repeating pose.

### `KEY_GAIN_DARK`

Key-light peak gains — the right-side specular lobe. Dark is dimmer
(a soft studio pool on the near-black field); light is a stronger
window-light sheen over the paper.

### `SHADE_GAIN_DARK`

Counter-shade peak gains — the lower-left pool the key light throws.
Dark deepens the field corner; light is a faint sepia paper shadow.

### `GRAIN_LSB`

Film-grain base amplitude in 8-bit least-significant bits, applied
to a triangular (two-tap) white-noise distribution whose peak is
±half the token. 2.4 LSB puts the triangular tail at ±1.2 LSB —
past the ±1 LSB TPDF floor that guarantees every 8-bit
quantization boundary gets dithered, so no contour line can
survive — and just far enough past it to read as very fine film
grain on the dark field (the eye integrates the per-frame
decorrelation into a stationary speckle).

### `GRAIN_LUM_LSB`

Luminance-adaptive grain lift in LSB — multiplied by the pixel's
composite luminance before adding to GRAIN_LSB. An absolute LSB
step carries far less visible contrast on the bright paper field
than on near-black (Weber's law), so the grain scales with
luminance to read the same very-fine speckle in both themes.

### `DARK_GAIN`

Dark-theme alpha gain applied to every lobe peak — the dark field
keeps the same parallax structure at ember strength (≈0.04 peak)
so the near-black canvas never lights up.

### `LIGHT_GAIN`

Light-theme gain — lobe peaks render as authored.
