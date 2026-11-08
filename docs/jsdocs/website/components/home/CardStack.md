# `website\components\home\CardStack.tsx`

&lt;card-stack&gt; — the "Selected work" coverflow on the home

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\CardStack.tsx`             |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `CardStack`

The CardStack — stacked featured-project deck.

### (module scope)

Pre-render sizing pass — measure() runs once before the very first
render so the skeleton pile (and the real cards' first paint) draw
at their measured dimensions instead of the CARD_W_FALLBACK guess:
without it the skeleton paints ~40% taller than the settled card
box and pops smaller when items land. The deck element doesn't
exist yet, so the read is viewport-based — close enough that the
first fit's correction is a few px, not a visible reflow.

### `_dragTick`

The one-rAF-per-frame pose write armed by the drag path — a bound
field so the gesture loop allocates zero closures per frame.

### `processedItems`

Setter/getter — portfolio items pushed by the view.

### `translations`

Setter/getter — locale strings for the section labels.

### `deckItems`

The featured subset the deck fans (whole list when none flagged).

### `storage`

CDN base URL for card media.

### `_t`

Resolved copy — live translations over the build-time English
snapshot, so every label renders text before Firebase resolves.

### (module scope)

Re-caches card nodes + re-measures after every render, then republishes
poses/chrome/index state against the fresh DOM.

### `_observeDeck`

Re-points the deck ResizeObserver at a (re-rendered) deck node. The
stylesheet owns the deck box — a grid row that grows/shrinks with
the text column, fonts, and orientation — so a box change re-runs
measure + applyPoses even when the window itself never resized.
The callback fires after layout, so its rect read never forces a
reflow; card writes are absolutely positioned and can't resize the
deck, so the observer never feeds itself.

- `@param` deck The fresh deck element (null on skeleton-less renders).

### `measure`

Deck measurement — see cardstack/deck.ts.

### `applyPoses`

Fan pose write — see cardstack/deck.ts.

### `updateChrome`

Counter/dots/a11y refresh — see cardstack/deck.ts.

### `goTo`

Navigate the fan to a deck index — see cardstack/interactions.ts.

### `onPrevClick`

Prev control.

### `onNextClick`

Next control.

### `onDotClick`

Dot-nav click.

### `onCardClick`

Card activation — side cards reposition, front card navigates.

### `toggleIndex`

Toggles the all-projects index overlay.

### `closeIndex`

Closes the index overlay.

### `onKeyDown`

Delegated keydown — arrows step the fan, Escape closes the index.

### `onPointerDown`

Pointer-down drag arm — see cardstack/gestures.ts.

### `onPointerMove`

Pointer-move drag tracking — see cardstack/gestures.ts.

### `onPointerEnd`

Pointer-up/cancel settle — see cardstack/gestures.ts.

### (module scope)

JSX template for the component's shadow DOM.
