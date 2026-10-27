# `core\tokens\starfield\params\post.ts`

Post-processing chain tuning for the star-field engine —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\starfield\params\post.ts`                |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `BLOOM_THRESHOLD`

Bloom luminance gate — only texels above this threshold bleed into
the bloom pyramid. 0.55 keeps nebula glows and star cores blooming
while the mid-tone planet textures and the skybox stay sharp.

### `BLOOM_STRENGTH`

Bloom contribution added on top of the scene color.

### `BLOOM_RADIUS`

Bloom blur radius — wider reads dreamier, tighter reads optical.

### `VIGNETTE_DARKNESS`

Vignette edge darkness + reach — a whisper of lens falloff so the
frame edges recede like a real eyepiece/sensor, never a black oval.

### `GRAIN_INTENSITY`

Film-grain intensity — just enough noise to kill the banding that
additive glow gradients leave on dark space backgrounds.
