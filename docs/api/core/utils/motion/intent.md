# `core\utils\motion\intent.ts`

User-intent gate for warm-path work. Non-critical chunk

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\motion\intent.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `INTENT_EVENTS`

Input modalities that prove a human is engaging with the page.

### `onUserIntent`

Runs `cb` on the first user-interaction signal (pointer, key, touch,
scroll) or after `PREFETCH_CONFIG.INTENT_FALLBACK` ms of quiet —
whichever arrives first, exactly once. Listeners are passive so the
gate never delays an input.

- `@param` cb Warm work to release on intent.
