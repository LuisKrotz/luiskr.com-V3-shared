# `core\utils\burn\types.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\burn\types.ts`                            |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `ITEM_BURNING`

Modifier toggled on the card while the canvas owns the hover.

### (module scope)

Optional modifier published the moment the forward pass has fully
consumed the title. Hosts that supply it relocate the title box in
CSS (the canvas re-anchors to the live box each frame, so the same
session then replays the consume front in reverse at the new
anchor — deposit motes knitting the glyphs back). Removed by
`disarmCardBurn` on un-hover; `teardownBurn` deliberately leaves it
on so the rebuilt title stays at its relocated spot while hovered.

### `TITLE_OVERLAY`

Gradient panel the title h2 + burn canvas live inside.

### `TITLE`

The title heading whose ink the canvas replaces.

### `TITLE_BURNING`

Ink-hidden state on the title (color: transparent).

### `TITLE_BURN`

The combustion canvas element class.

### `TITLE_SLOT`

Rewrite slot inserted above the details' first child.

### `TITLE_DUP`

Invisible spacer keeping the rewrite slot's layout box.

### `TITLE_REWRITE`

The <draw-text> clone replaying the title in the slot.

### `DETAILS`

Details container the rewrite slot prepends into.

### (module scope)

Minimal host contract — the shadow-root `$(selector)` query method.

### (module scope)

Queries the host's shadow root for the first match, or null.

### (module scope)

Minimal item contract — label/title feed the rewrite slot, description paces the burn.

### (module scope)

A live combustion session, keyed by card element in `_sessions`.

### `cls`

The host component's class map — teardown + child mounts read it.

### `canvas`

Overlay canvas absolutely positioned over the title box.

### (module scope)

Optional WebGPU particle canvas — mounted over `canvas` when the
per-widget wasm burn artifact loads; the paper raster stays 2D
(canvas contexts are mutually exclusive per element), particles
move to the GPU canvas.

### (module scope)

Live WebGPU wasm handle — the particle sim+renderer runs in the
artifact (begin/set_letters/set_ink/set_colors/set_dir/set_stage/
frame); unset on failure or before the mount resolves.

### (module scope)

In-flight mount — teardown must not double-resolve.

### (module scope)

Latch — a failed wasm mount never retries this session.

### `paper`

Pre-rasterized "paper" — the title text as a drawable image.

### `w`

Canvas box in device px.

### `paperX`

Paper (title box) offset inside the canvas — the pad bleeds embers.

### `t`

Seconds elapsed — noise/particle clock (forward progress derives from it).

### `prog`

Burn progress 0..1 while rebuilding — captured from the forward clock
at disarm, then counted down; burnPaper re-derives the raster from
the pristine paper every frame, so shrinking progress un-erases the
glyphs (a true time-reverse of the consume front).

### `dir`

Direction: 1 combusts forward, −1 un-burns back to whole text.

### `onBurned`

Fired once when the forward pass consumes the title (the ITEM_BURNED
publish) — hosts stage their next beat off it (card-stack starts the
description writer only then, so the rewrite follows the burn-out).
Also fires on hosts WITHOUT ITEM_BURNED at consume-complete — the
burn-out-only path still owes its host the beat; the callback
self-clears after firing so settle frames never re-fire it.

### `cardEl`

Owning card — teardown restores its classes and removes the slot.

### `particles`

Live particles (embers + char flecks).

### `letters`

Per-glyph burn units — detected as ink column-runs in the rasterized
paper (a space's gap splits runs, so each bucket IS a letter, not a
fixed grid slice). Each letter owns an ignition delay + burn speed:
fast letters fully char and dissolve while slow neighbours still
stand untouched — the effect consumes the text letter by letter.

### `colLetter`

Paper-x → owning letter index (nearest letter for gap columns).

### `colInk`

Paper-x → ink coverage flag (0/1) — embers only spawn on glyph ink.

### `work`

Working raster — every frame rebuilds the burned text here (paper →
char-darken → erode), then blits into the display canvas so the
compositing never collides with particles.

### `titleEl`

Live DOM nodes — re-measured every frame. The card's expand ease
animates the h2's `cqw` font-size and flex-end position for ~0.42s;
rasterizing once at arm time froze a mid-transition font into the
paper, which rendered as "the effect changed the font size". The
paper re-rasterizes whenever the DOM box moves so the burning copy
is always pixel-identical to what the DOM would show.

### `ink`

Theme-resolved inks — read once from the CSS burn palette.

### `inkColor`

The title's resolved ink color captured BEFORE the DOM glyphs hide —
the `burning` class sets `color: transparent`, so any re-raster after
the handoff would otherwise paint invisible text (the "whole word
vanishes" bug).

### `lastBox`

Arm-time title-box signature — set once; a truthy value freezes the raster.

### `lastPos`

Last tracked canvas-space position — position-only drift detector.

### `lastFont`

Computed-font signature of the current raster — knit sessions
(dir −1) compare it every frame: the card's expand/`--fw-lift` font
eases still run for ~0.42s after the arm, so a frozen arm-time
raster would knit stale letterforms that pop back to the live DOM
ink at teardown (the "chunks when font style changes" bug). Burn-out
sessions never re-check — their frozen raster is intentional.

### (module scope)

Combustion ink ramp — resolved from `--burn-*` CSS custom properties
(dark theme: cyan-blue plasma fire on the accent ramp; light theme:
airy paper-fire). Falls back to the fixed canvas inks where a runtime
lacks the custom properties.

### `smoke`

Smoke-puff tint — the rising ash column behind the embers.

### (module scope)

One glyph's burn unit — the ink-run span in the paper raster plus its
ignition profile. `v` is the burn-speed multiplier, `delay` the share
of total progress before this letter ignites (letters catch fire at
different moments), and y0/y1 bound the letter's ink extent so the
front only travels through its own glyph.

### `x0`

Column span inside the paper raster (device px).

### `y0`

Ink vertical extent inside the paper raster (device px).

### `v`

Burn-speed multiplier — 0.55..1.45 of the global front rate.

### `delay`

Ignition delay as a fraction of total progress (0..0.22).

### (module scope)

One combustion particle — an ember (bright, rises) or fleck (dark, curls).

### `kind`

0 = ember, 1 = char fleck.

### `rot`

Rotation for flecks (radians) + tumble speed.

### `phase`

Per-particle noise phase — keeps flicker/wobble desynced.

### (module scope)

Rebuild deposits only — the letter whose front this particle rains
onto. Undefined for burn particles, which simply rise and die.

### (module scope)

Card element carrying a parked burn session.
