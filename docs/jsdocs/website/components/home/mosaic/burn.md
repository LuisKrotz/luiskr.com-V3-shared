# `website/components/home/mosaic/burn.ts`

| | |
|---|---|
| **Source** | `src/website/components/home/mosaic/burn.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_DPR_CAP`

Device-pixel cap on the burn canvas — glow beyond 2× is invisible.

### `_PAD_X`

Side/vertical bleed (css px) around the title box — embers need room.

### `_JAG_RATIO`

Jagged-edge amplitude as a fraction of the paper height — a small
 organic waver on top of the per-letter speed spread.

### `_COL_SPEED_MIN`

Per-letter burn-speed range — each glyph bucket burns between ~55%
and ~145% of the base rate, so letters vanish at visibly different
moments while all still finish inside the description's draw time.

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

### `_DESC_CHAR_MS`

Per-char desc draw estimate (ms) — mirrors the 8ms char delay + draw.

### `_P_MAX`

Particle budget — hard cap on live embers + flecks.

### `_SPAWN_PER_S`

Ember spawn per second along the front while it burns.

### `_CHAR_FRACTION`

Fraction of spawns that are dark char flecks (rest are embers).

### `_EMBER_LIFE_MIN`

Particle lifetime bounds (seconds).

### `_EMBER_VY_MIN`

Ember upward velocity bounds (canvas px/s).

### `_FLECK_VY`

Fleck launch velocity + gravity pull (canvas px/s, px/s²).

### `_EMBER_SIZE`

Particle size bounds in device px.

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

### (module scope)

A live combustion session, keyed by card element in `_sessions`.

### `canvas`

Overlay canvas absolutely positioned over the title box.

### `paper`

Pre-rasterized "paper" — the title text as a drawable image.

### `w`

Canvas box in device px.

### `paperX`

Paper (title box) offset inside the canvas — the pad bleeds embers.

### `t`

Seconds elapsed / total burn duration.

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

Last measured title box in canvas-space device px — change detector.

### (module scope)

Combustion ink ramp — resolved from `--burn-*` CSS custom properties
(dark theme: cyan-blue plasma fire on the accent ramp; light theme:
airy paper-fire). Falls back to the fixed canvas inks where a runtime
lacks the custom properties.

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

Card element carrying a parked burn session.

### `edgeNoise`

Deterministic smooth edge noise — three detuned sines read as an
organic flame line rather than static noise. `ph` (seconds) animates
the jag so the burn boundary itself licks sideways as it descends.

### `rasterizeTitle`

Rasterizes the h2 text into the paper canvas. Canvas can't line-wrap,
so words are measured and packed into lines matching the DOM box, then
drawn bottom-anchored like the overlay's `align-items: flex-end`.

### `letterProgress`

A letter's own burn progress — global progress scaled by the letter's
speed, shifted by its ignition delay. Letters ignite at different
moments and race at different rates, so one glyph can be ash while a
neighbour is untouched.

### `letterFrontY`

Per-column burn front inside one letter — the paper-space y of the
live edge at column x. The front climbs BOTTOM→TOP through the
letter's own ink extent (y1 → y0), so a descender's stem burns up from
the baseline, not from the paper's bottom edge.

### `spawn`

Spawns particles along live letter fronts. `rate` is fractional — the
accumulator pattern (spawn whole particles, keep the remainder in
`t`-space implicitly by probabilistic gating) keeps density steady
without a second counter. Emissions come only from columns that
carry glyph ink and whose letter front is mid-flight, so embers pour
off burning edges — never out of the spaces between letters.

### `readBurnInk`

Resolves the burn palette from the root CSS custom properties — dark
theme publishes a cyan-blue plasma ramp, light theme an airy
paper-fire ramp. Falls back to the fixed canvas inks when the
properties are absent (older stylesheet, non-themed host).

### `syncPaper`

Re-anchors the canvas + re-rasterizes the paper whenever the title's
DOM box moves — the card's expand ease animates `cqw` font-size and
the flex-end pin for ~0.42s after hover, so a static snapshot burns a
stale ghost beside glyphs that already moved. Runs every frame; the
`lastBox` signature skips all work when nothing moved.

### `analyzePaper`

Reads the rasterized paper's alpha channel to locate each glyph:
columns that carry ink form runs — a space leaves a transparent gap,
so each contiguous run IS one letter (kerned pairs may fuse, which
just makes them burn as a unit). Builds:

 - `colInk`: 1 where a paper-x column has any glyph pixel — ember
   spawning and the char band use it so nothing glows in the spaces.
 - `letters`: per-run ink bounds (x0..x1, y0..y1) plus a random burn
   speed and ignition delay. Speeds spread 0.55..1.45×, delays up to
   22% of total progress — letters catch at different moments and
   burn at different paces.
 - `colLetter`: paper-x → owning letter index; gap columns bind to
   the nearest run so the erase polygon stays coherent across spaces.

Finally every letter's speed is normalized so the SLOWEST ignitor
finishes at ~98% progress — the burn ends with the description's
typing, never after.

### `drawParticles`

Advances + draws particles: embers flicker upward, flecks tumble down.

### `burnPaper`

Rebuilds the burning title inside the work canvas for this frame.

Layers, per letter (paper-space coords, i.e. 0..paperW / 0..paperH):

 1. `paper` — the pristine glyph raster.
 2. Scorch — a `source-atop` band painted only over the letter's own
    span just above its live front; `source-atop` composites onto ink
    pixels only, so the glyph visibly chars dark before it erodes and
    the gaps between letters stay untouched.
 3. Ember glow — a soft `lighter` wash hugging the front, ink-clipped
    the same way: the glyph's still-alive lower edge smoulders.
 4. Consume — a `destination-out` polygon below each letter's jagged
    front erases the raster bottom-up at that letter's own pace.

The composite then blits to the display canvas — the DOM ink is long
hidden, so what the user reads IS this raster burning through itself.

### `frame`

One combustion frame: rebuild the burned paper (char → glow → consume,
per letter), blit it, spawn + draw particles. When every letter's front
has passed its ink top the title is ash; the loop idles until the last
particle dies.

### `insertTitleSlot`

Inserts the rewrite slot above the description: an aria-hidden spacer
holds the layout space (zero reflow when the clone animates) and a
<draw-text> replays the title. The whole slot is aria-hidden — the
original h2 remains the single a11y source for the title.

### (module scope)

Arms the burn on card `i`: hides the h2 ink, mounts the combustion
canvas over it, and inserts the rewrite slot above the description.
The burn length follows the description draw time so the last ember
dies as the description finishes writing. Reduced motion skips the
canvas entirely — the title swap happens instantly.

The canvas work is deferred until the card's expand transition settles:
measuring the h2 mid-ease anchors the burn to a box the title has
already left (its flex-end pin and cqw font-size both move during the
0.42s height transition), which left the flame edge burning empty air
beside the real glyphs.

### `armCardBurn`

Arms the burn on card `i`: inserts the rewrite slot, then mounts the
combustion canvas IMMEDIATELY — the user expects the dissolve the
moment the pointer lands, not after the card's expand ease. The
canvas is measured against the title's hover-instant box and plays
the burn where the glyphs stood while the card grows behind it (the
h2's ink is hidden as soon as the canvas takes over, so the moving
DOM title never shows through). Reduced motion skips the canvas
entirely — the title swap happens instantly.

### `disarmCardBurn`

Tears the burn down: kills the raf, removes the canvas + rewrite slot,
and restores the h2's ink. Safe to call on a card that never burned.
