# `core\tokens\strings\reader.ts`

Reader-mode content string tokens — the accessible label

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\strings\reader.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `STATIC_COPY_LABEL`

`aria-label` on the parked <article> — names the region landmark so
accessibility checkers accept it as self-contained (the label is
never announced: aria-hidden removes the subtree from the AT tree;
it exists only to satisfy landmark-labelling rules).
