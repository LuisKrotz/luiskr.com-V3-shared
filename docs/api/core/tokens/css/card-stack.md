# `core\tokens\css\card-stack.ts`

Card-stack CSS custom-property names — grouped subset

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\css\card-stack.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CARD_STACK_TIMER_P`

The autoplay border light's progress — a 0–100% custom property
autoplay.ts writes per-frame on the host element; it inherits
through the shadow boundary into the active card's conic-gradient
border band and the transport's rim ring.
