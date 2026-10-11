# `core/utils/canvas/loaders/intro-loader.ts`

Boot loader overlay — same visual language as the

| | |
|---|---|
| **Source** | `src/core/utils/canvas/loaders/intro-loader.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_DURATION_MS`

Total boot animation budget (ms) — long enough for stages to read.

### `_HOLD_MS`

Post-100% hold before the veil lifts (ms).

### `_FADE_MS`

Veil fade-to-remove delay — matches the SCSS exit transition.

### `loaderCopy`

Resolves the loader copy for the active locale, English as backstop.

### `IntroLoader`

Experiments-style intro loader — spinner ring + percent + stage readout
+ progress bar over a glow veil. The stage text steps through the
locale's `loader.stages` (site assets/pages copy) as progress climbs.

### `init`

Builds the overlay DOM + starts the progress sequence.

### `runAnimation`

Steps percent + the localized stage line across the boot budget.

### `finish`

Completes the loader: fades the overlay and calls onComplete.

### `destroy`

Releases the rAF handle and removes the overlay so it can be GC'd.
