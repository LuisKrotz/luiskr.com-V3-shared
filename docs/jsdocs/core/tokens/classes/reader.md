# `core\tokens\classes\reader.ts`

Reader-mode content class tokens — the prerendered article

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\reader.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CONTENT`

Marks the prerendered <article> carrying the page's readable copy.

### `OFFSCREEN`

Post-mount modifier — the app shell replaces the article visually,
so it parks offscreen (still DOM-present for reader mode + AI agents).

### `PAINTED`

Build-time modifier for media-less routes — with no LQIP to paint,
the article's own text is the only early-LCP candidate, so it stays
painted under the intro veil instead of parking offscreen at once.
