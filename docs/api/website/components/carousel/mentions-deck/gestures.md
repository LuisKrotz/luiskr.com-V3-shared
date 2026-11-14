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

Pointer-down on the deck — arms gesture bookkeeping only. Pointer
capture is deliberately NOT taken here: capturing on down retargets
the synthesized click to the capture element, so plain taps on cards
would never reach the outbound anchors. Capture arms the moment the
drag commits past slop (onPointerMove) — committed drags suppress
the trailing click anyway. A fresh gesture also clears a stale
`_suppressClick`: when a swipe or pointercancel synthesizes no
trailing click (touch), an unconsumed flag would otherwise swallow
the next real link click — the browser's own trailing click after a
drag is never preceded by a new pointerdown. Non-primary mouse
buttons and already-tracked pointers are ignored.

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
