# `website\components\home\cardstack\events.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\cardstack\events.ts`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `onDeckClick`

Click delegation for the whole shadow root — controls first (toggle,
close, prev, next, dots), the text column's "Check out" link, then
index items, then cards. Plain
clicks SPA-navigate (or reposition the fan); modified clicks fall
through to the real anchors so new-tab gestures keep working.

### `bindEvents`

Binds every listener the deck needs — shadowRoot delegation covers
re-renders (nodes swap per _updateDom, listeners don't); the pointer
stream is deck-gated so the index panel and chrome can't drag the fan.

- `@param` host The CardStack element.
