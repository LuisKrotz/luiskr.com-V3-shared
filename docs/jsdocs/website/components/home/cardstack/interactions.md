# `website\components\home\cardstack\interactions.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\cardstack\interactions.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Re-exported — the card links and the text column share one builder.

### `cardIdxFromEvent`

Resolves the deck card element + its deck index from a DOM event, or
null when the event didn't land on a card.

- `@param` e The DOM event.
- `@returns` {el, idx} for the containing card.

### `navigateTo`

SPA-navigates to a card's project route — no-op without a slug.

### `goTo`

Moves the fan's virtual front to `idx` — ring-normalized, so out-of-range
indices wrap like the carousel's clone loop does. The pose write runs
with CSS transitions enabled (the --dragging class is absent outside a
live gesture) so every card glides along the fan curve to its new slot.

- `@param` host The CardStack element.
- `@param` idx Target deck index — wraps via modulo.

### `onPrevClick`

Prev control — one step back along the ring; a manual step kills autoplay.

### `onNextClick`

Next control — one step forward along the ring; a manual step kills autoplay.

### `onDotClick`

Dot-nav click — jumps straight to the picked card; a manual pick kills autoplay.

### `onCardClick`

Card activation — a side card click brings it to the front (the fan
affordance), the front card navigates to its project route.

### `applyIndexState`

Publishes indexOpen into the DOM without a re-render — the --index-open
class on the section drives the deck dim + panel reveal, the panel's
aria-hidden + inert and the toggle's aria-expanded track the state for
AT and tab order (aria-hidden alone leaves the panel's buttons/links
focusable inside a hidden subtree).

- `@param` host The CardStack element.

### `scrollIndexRail`

`scrollIndexRail` — the index list is a horizontal rail on desktop and
a vertical sheet on mobile, so the arrows scroll whichever axis is
actually overflowing: one viewport-length hop per click, smoothed.

- `@param` host The CardStack element.
- `@param` dir Scroll direction (+1 forward, -1 backward).

### `toggleIndex`

Toggles the all-projects index overlay; the view-all interaction kills autoplay.

### `closeIndex`

Closes the index overlay — a no-op when already closed.

### `onKeyDown`

ArrowLeft/ArrowRight step the fan; Escape dismisses the index overlay.
Other keys pass through — Enter lands on the card anchors as a native
click handled by the click path.

- `@param` host The CardStack element.
- `@param` e The keydown event.
