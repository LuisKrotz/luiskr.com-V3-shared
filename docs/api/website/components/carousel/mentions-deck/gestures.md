# `website\components\carousel\mentions-deck\gestures.ts`

|                |                                                             |
| -------------- | ----------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\mentions-deck\gestures.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.     |

## Members

### `deckFromEvent`

The deck element a pointer event landed in, or null — pointer capture
targets it so the move stream retargets there (listeners stay scoped).

### `releaseGesture`

Clears the capture + listener bookkeeping left by a finished gesture.

### `onPointerDown`

Pointer-down on the deck — arms gesture bookkeeping and takes the
capture so the move/up stream keeps landing on the deck even when the
pointer leaves the card mid-swipe. Non-primary mouse buttons and
already-tracked pointers are ignored.

- `@param` host The MentionsDeck element.
- `@param` e The pointerdown event.

### `onPointerMove`

Pointer-move — consumes the coalesced sample stream (1000–8000Hz mice
deliver several per frame; only the last position matters). Before the
slop commits the gesture, a steeper vertical track yields to page
scroll; after it, `_dragX` updates and ONE rAF writes the strip. The first
committed frame also freezes autoplay so the dwell can't fire mid-drag.

- `@param` host The MentionsDeck element.
- `@param` e The pointermove event.

### `onPointerEnd`

Pointer-up/cancel — settles the gesture. Drag fraction + flick velocity
decide: advance one card in the drag direction or snap the strip back to
the current front. A committed drag also suppresses the trailing click
so it can't fire navigation, then hands the dwell back to autoplay.

- `@param` host The MentionsDeck element.
- `@param` e The pointerup/pointercancel event.
