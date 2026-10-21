# `core\tokens\motion\frame-budget.ts`

Animation frame-budget constants — the per-frame work

| | |
|---|---|
| **Source** | `src/core\tokens\motion\frame-budget.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MOBILE_MS`

Mobile floor — 120Hz ⇒ ~8.33ms per frame.

### `DESKTOP_MS`

Desktop floor — 240Hz ⇒ ~4.17ms per frame.

### `MOBILE_HZ`

Mobile refresh floor the animation gate enforces, in Hz.

### `DESKTOP_HZ`

Desktop refresh floor the animation gate enforces, in Hz.
