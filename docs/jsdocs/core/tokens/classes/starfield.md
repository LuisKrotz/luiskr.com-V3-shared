# `core/tokens/classes/starfield.ts`

Star-field experiment class tokens (`sf-*` block) —

| | |
|---|---|
| **Source** | `src/core/tokens/classes/starfield.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SF_CLASSES`

Frozen sf class-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
