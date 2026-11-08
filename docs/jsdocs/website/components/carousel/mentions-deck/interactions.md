# `website\components\carousel\mentions-deck\interactions.ts`

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\mentions-deck\interactions.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.         |

## Members

### `cardIdxFromEvent`

Resolves the deck card element + its deck index from a DOM event, or
null when the event didn't land on a card.

- `@param` e The DOM event.
- `@returns` {el, idx} for the containing card.

### `goTo`

Moves the strip's virtual front to `idx` — ring-normalized, so out-of-range
indices wrap like a carousel loop does. The pose write runs with CSS
transitions enabled (the --dragging class is absent outside a live
gesture) so every card glides along the strip to its new slot. Any
running autoplay dwell re-bases so a manual nav always gets a full dwell.

- `@param` host The MentionsDeck element.
- `@param` idx Target deck index — wraps via modulo.

### `onDotClick`

Dot-nav click — jumps straight to the picked card.

### `onCardClick`

Card activation — a side card click brings it to the front (the strip
affordance); the front card needs no handling — its anchor navigates
outbound natively.

- `@param` host The MentionsDeck element.
- `@param` _item The clicked card's data row (unused — outbound links are native).
- `@param` idx The clicked card's deck index.

### `onKeyDown`

ArrowLeft/ArrowRight step the strip. Other keys pass through — Enter lands
on the card anchors as a native click handled by the click path.

- `@param` host The MentionsDeck element.
- `@param` e The keydown event.
