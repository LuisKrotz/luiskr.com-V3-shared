# `core/tokens/motion/gpu-widgets.ts`

WebGPU overlay widget discriminants — the numeric `kind`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/motion/gpu-widgets.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `BURGER`

Nav burger hairline bars (fluid wave + breathing).

### `FLAG`

Locale flag — wind warp + specular + split transition.

### `SWITCH_SLIDER`

Preference toggle — pill track + per-context waveform.

### `THEME_SLIDER`

Day/system/night slider — procedural sky scene.

### `CLOSE_BUTTON`

Modal close — liquid fill + rotating X strokes.

### `MENU_BACKGROUND`

Fullscreen menu backdrop — fbm contour field.

### `SKELETON`

Loading skeleton — morphing 0/1 glyph cells.

### `BURN`

Mosaic letter-burn — ember/char particle sim.

### `GPU_WIDGET_UNIFORM_F32S`

Uniform f32 counts per kind — matches `UNIFORM_F32S` in each
`rust/overlay/src/widgets/<kind>.rs` block-layout doc. Used by the
bridge to size/settle uniform writes.

### (module scope)

burger: time, res.xy, dark, rect(4).

### (module scope)

flag: res(2), time, hover, anim, split(2), pad, rect(4).

### (module scope)

switch: res(2), time, progress, knob_x, context, pad(2), rect(4).

### (module scope)

theme: res(2), time, progress, knob_x, ripple(2), pad, rect(4).

### (module scope)

close: res(2), time, liquid, draw, rot, click_time, pad, rect(4).

### (module scope)

menu-bg: time, res(2), reveal, color(3), alpha, color2(3), pad, rect(4).

### (module scope)

skeleton: res(2), time, resolve, ink_alpha, count, pad(2), rect(4).

### `GPU_FLAG_ANIMS`

Flag animation personalities — mirrors `u_anim_type` in the flag
shader and `widgets::flag::anims` in the crate.

### `EN`

EN (US — stars shimmer).

### `PT`

PT (BR — rhombus solar glow).

### `ES`

ES (Spain — flamenco silk).

### `DE`

DE (CH+DE split — cross-ribbon).

### `HRK`

HRK (DE+BR — harmonic wave).

### `CAS`

CAS (AR+UY — Sol de Mayo rays).

### `RIV`

RIV (UY+BR — river reflection).

### `GN`

GN (Paraguay — horizontal surge).

### `IT`

IT (Italy — mediterranean silk).

### `RU`

RU (Russia — aurora shimmer).

### `FR`

FR (France — satin ripple).

### `TLN`

TLN (IT+BR — venetian pulse).
