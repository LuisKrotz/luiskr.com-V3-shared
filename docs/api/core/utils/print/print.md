# `core\utils\print\print.ts`

Print-mode DOM adapter. `beforeprint` (and the matchMedia

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\print\print.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `touched`

Elements whose attributes were mutated — restored verbatim on exit.

### `marked`

Live canvas/video elements marked `print-src` — class removed on exit.

### `copies`

Injected `.print-copy` stand-ins — removed on exit.

### `printing`

True while the printable form is applied — re-entry is a no-op.

### `darkWasOn`

Theme class state captured on entry so exit can put it back.

### `installed`

Module install guard — the boot path may run more than once in tests.

### `recordAttr`

Records an element's current attribute value exactly once — the first
write wins so repeated entry passes can't overwrite the true original.

- `@param` el Element being mutated.
- `@param` name Attribute name.

### `writeAttr`

Mutates an attribute while recording its original for restoration.

- `@param` el Element being mutated.
- `@param` name Attribute name.
- `@param` value New attribute value.

### (module scope)

Depth-first generator over the light DOM and every nested shadow root —
canvas/video/img surfaces live inside component shadows (docs scenes,
menu chrome, widgets), and `querySelectorAll` cannot reach them. Recursion
per the traversal rule (rule 20); shadow links form a tree so no visited
set is needed.

- `@param` root Document or shadow root to walk.

### `captureCanvas`

Asks the owning engine for a fresh frame, then falls back to reading the
preserved buffer. Engines that render-on-demand (docs arch-scene) listen
for `printcapture` and write detail.dataUrl after re-painting; engines
that keep the last frame (star-field, earth — preserveDrawingBuffer)
satisfy the direct toDataURL read.

- `@param` canvas Canvas to read.
- `@returns` PNG data URL, or '' when neither path produced pixels.

### `placeCopy`

Places a stand-in where it will actually print. Stand-ins for surfaces
inside the reader article replace in place; stand-ins for surfaces inside
the app chrome (which the print sheet hides) move into the article — or,
on routes without one, onto <body> so three.js pages still print their
scene still.

- `@param` src Live element being replaced.
- `@param` copy Injected stand-in element.

### `swapInCopy`

Injects a `.print-copy` stand-in after/alongside `src` and tags `src` so
the print sheet hides the live version.

- `@param` src Live element (canvas or video).
- `@param` url Image URL the stand-in renders.

### `upgradeImage`

Upgrades a lazy/deferred article image so it actually resolves before the
print snapshot: eager loading, high fetch priority, synchronous decode.

- `@param` img Article image element.

### `swapVideo`

Swaps a video for its poster still — printers rasterize neither the
element nor its first frame, so the poster is the highest-quality
printable representation the pipeline ships.

- `@param` video Video element.

### `enter`

The printable form: fires `printprepare` first so views can sync their
generated DOM (docs rendered diagrams) into the reader mirror, then drops
the dark theme for ink-friendly light tokens, then walks every media
surface — canvases become captured stills, poster-carrying videos become
images, and lazy article images upgrade to eager/high so they resolve in
time.

### `exit`

Tears the printable form down: stand-ins are removed, `print-src` tags
drop, every mutated attribute restores its recorded value (or removal),
and the dark theme returns if it was on.

### `initPrintSupport`

Installs the print hooks once: the native before/afterprint pair plus the
matchMedia('print') change channel — some engines skip the events but
always flip the media query, so both paths feed the same enter/exit.
