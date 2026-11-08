# `website\components\carousel\mentions-deck\events.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\mentions-deck\events.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.   |

## Members

### `onDeckClick`

Click delegation for the whole shadow root — dots first, then cards.
Side-card clicks reposition the strip (the anchor's outbound navigation
is suppressed); front-card clicks fall through to the real anchor so
the award link opens natively — plain clicks only, modified/middle
clicks keep anchor semantics either way.

- `@param` host The MentionsDeck element.
- `@param` e The click event.

### `bindEvents`

Binds every listener the deck needs — shadowRoot delegation covers
re-renders (nodes swap per _updateDom, listeners don't); the pointer
stream is deck-gated so the dots and heading can't drag the strip.

- `@param` host The MentionsDeck element.
