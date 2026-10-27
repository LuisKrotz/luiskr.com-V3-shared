# `core\tokens\motion\gpu-widgets.ts`

WebGPU widget discriminants + artifact registry — the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\gpu-widgets.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `GPU_WIDGET_KINDS`

Widget kinds — one per animation domain migrated from a standalone
WebGL canvas to a dedicated WebGPU wasm artifact on the widget's own
canvas. Frozen; consumers import members, never redeclare literals.

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

### `MEDIA`

Media surface — decoded image/video textured quad.

### `GLITCH`

About portrait — VHS glitch corruption passes.

### `DIVIDER_SHEEN`

Footer divider — hairline + traveling sheen band.

### `TEXT_DRAW`

Draw-text — instanced per-char writing animation.

### `RING_SHEEN`

Mosaic/related tiles — instanced border ring sheen.

### `CORNER_BRACKETS`

Action buttons — corner-bracket expansion.

### `SCENE3D`

Full-scene surface — the scene3d engine handle (`Surface3d`). Not a
uniform widget: mounts through `core/utils/gpu/scene3d.ts`, which
reads its artifact spec from this same registry so the URL stays
single-sourced here.

### `GENIE`

Expand-modal genie — composited-sheet mesh-warp transition.

### `GPU_WIDGET_ARTIFACTS`

Artifact registry — kind → wasm-pack glue URL + exported class name.
`url` is `/wasm/<slug>/<pkg>.js` under public/; `cls` is the crate's
`#[wasm_bindgen]` struct name (each crate exports a differently-
named widget, so the bridge indexes the module dynamically).
`eager` marks the skeleton — the only artifact allowed on the
critical path since it IS the loading placeholder.
Frozen; consumers import members, never redeclare literals.

### (module scope)

burger — nav burger hairline bars.

### (module scope)

flag — locale flag (two textures for split flags).

### (module scope)

switch-slider — preference toggle.

### (module scope)

theme-slider — day/system/night slider.

### (module scope)

close-button — modal close control.

### (module scope)

menu-background — fullscreen menu contour field.

### (module scope)

skeleton — the FIRST-loading artifact (the loading placeholder).

### (module scope)

burn — mosaic letter-burn particle sim.

### (module scope)

media — decoded image/video quad.

### (module scope)

glitch — about-page VHS portrait corruption.

### (module scope)

divider-sheen — footer hairline traveling band.

### (module scope)

text-draw — per-char writing animation over a raster atlas.

### (module scope)

ring-sheen — instanced mosaic/related tile border rings.

### (module scope)

corner-brackets — button corner-bracket expansion.

### (module scope)

scene3d — the full-scene engine surface (mount via scene3d.ts).

### (module scope)

genie — expand-modal composited-sheet mesh-warp + dock flash.

### `GPU_WIDGET_UNIFORM_F32S`

Uniform f32 counts per kind — matches `UNIFORM_F32S` in each
`rust/<slug>/src/lib.rs` block-layout doc. Used by the bridge to
size/settle uniform writes.

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

### (module scope)

glitch: res(2), time, hover, seed, cover(4), pad(7).

### (module scope)

divider: res(2), time, pad, border(4), accent(4), rect(4).

### (module scope)

text-draw: res(2), time_ms, count, ink(4), pad(4).

### (module scope)

ring-sheen: res(2), time, hair, edge(4), accent(4), pad(4).

### (module scope)

corner: res(2), hover, hair, arm0(2), arm1(2), edge(4), accent(4).

### (module scope)

genie: res(2), time, progress, from(4), to(4), reserved(2), dpr, flags, tint(4), uv(4).

### `GPU_WIDGET_DRIVE`

Drive modes for `mountWebGpuWidget` — who owns the rAF clock.
Frozen; consumers import members, never redeclare literals.

### `RAF`

Bridge owns the rAF loop + resize listener — the default for
stateless widgets (burger, flag, sliders, close, menu, media).

### `MANUAL`

Caller owns the loop — for widgets whose host already runs a
frame-scheduled loop with its own semantics (skeleton's
frame-skip + resolve-out, burn's stage pump). The bridge skips
rAF AND the resize listener entirely; the caller drives
`widget.frame(dt)`, `widget.set_size(css)`, and
`widget.resize(device)` through its existing paths so there is
never a second clock or a second resize observer.

### `GPU_FLAG_ANIMS`

Flag animation personalities — mirrors `u_anim_type` in the flag
shader and `rust/flag`'s anim doc.

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
