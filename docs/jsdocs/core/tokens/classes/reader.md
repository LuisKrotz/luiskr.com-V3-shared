# `core\tokens\classes\reader.ts`

Reader-mode content class tokens — the prerendered article

| | |
|---|---|
| **Source** | `src/core\tokens\classes\reader.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CONTENT`

Marks the prerendered <article> carrying the page's readable copy.

### `OFFSCREEN`

Post-mount modifier — the app shell replaces the article visually,
so it parks offscreen (still DOM-present for reader mode + AI agents).
