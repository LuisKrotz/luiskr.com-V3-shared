# `core\utils\canvas\loaders\intro-loader.ts`

Boot loader overlay — same visual language as the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\loaders\intro-loader.ts`           |
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

### `retireVeil`

Parks the veil in the DOM instead of detaching it. Chrome retracts a
painted element's LCP candidacy on disconnect, so removeChild() after
the fade would hand the metric back to the mount-gated hero — on
media routes the runtime img/video lands ~6s later under throttle.
The retired node swaps its whole class list for the --retired
modifier (parked offscreen at left:100vw — rendered but out of view
and the hit path, since content-visibility:hidden also retracts the
LCP candidacy), gains aria-hidden, and drops off `.intro-loader`
selectors so post-boot adoption can never re-find a dead veil. Same
contract the parked reader-content article uses to keep its painted
text the recorded LCP on media-less routes.

- `@param` veil the intro-loader container to retire; null-safe.

### `IntroLoader`

Experiments-style intro loader — spinner ring + percent + stage readout

- progress bar over a glow veil. The stage text steps through the
  locale's `loader.stages` (site assets/pages copy) as progress climbs.

### `init`

Builds or adopts the overlay DOM + starts the progress sequence.

### `buildOverlay`

Builds the overlay DOM from scratch — used when the document did not
ship the static loader markup (dev server, non-prerendered shells).

### `runAnimation`

Steps percent + the localized stage line across the boot budget.

### `finish`

Completes the loader: fades the overlay, retires it, calls onComplete.

### `destroy`

Releases the rAF handle and retires the overlay (kept connected so a
painted LQIP's LCP candidacy survives teardown — see retireVeil).
