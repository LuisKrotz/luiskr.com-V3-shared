# `core\utils\motion\genie.ts`

"Genie" dialog transition shared by the preferences modal,

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\motion\genie.ts`                          |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Any component exposing the shadow-scoped `$` selector helper.

### (module scope)

Class contract a genie host must satisfy: the element the enter/leave
modifier lands on (the backdrop), the two modifiers themselves, and the
dialog panel that scales from the recorded origin.

### `backdrop`

Selector for the element that carries the enter/leave modifier.

### `backdropEnter`

Modifier applied while the dialog flies in (collapsed start state).

### `backdropLeave`

Modifier applied while the dialog collapses back to the origin.

### `dialog`

Selector for the dialog panel the genie transforms.

### `PREF_GENIE_CLASSES`

The default contract — the preferences + language dialogs' classes.

### `genieEnter`

Genie open/close shared by the preferences, language and search dialogs.
The dialog scales from the control that opened it (store.modalOrigin) and
zooms back into it on close. Honors reduced motion (instant).

- `@param` component host exposing the shadow-scoped `$` helper
- `@param` classes class contract — defaults to the preferences dialog set

### `genieLeave`

Plays the collapse-back-to-origin animation, then runs done() so the
caller can finish unmounting. Instant (done() immediately) under reduced
motion or when the backdrop isn't in the DOM.

- `@param` component host exposing the shadow-scoped `$` helper
- `@param` done callback run once the collapse has finished (or instantly)
- `@param` classes class contract — defaults to the preferences dialog set
