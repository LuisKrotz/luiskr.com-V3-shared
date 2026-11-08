# `core\tokens\classes\search-modal.ts`

BEM class tokens for &lt;search-modal&gt; — the nav search

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\search-modal.ts`                 |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SEARCH_MODAL_CLASSES`

Frozen class-name map — sole declaration site for these tokens; consumers
read members and never re-declare the strings (zero-hardcoding rules 4–5).

### `SEARCH_MODAL`

Root wrapper — always rendered; content mounts only while open.

### `SEARCH_MODAL_OPEN`

`-open` modifier — the dialog is visible.

### `SEARCH_MODAL_BACKDROP`

Fullscreen backdrop — click-away dismisses the dialog.

### `SEARCH_MODAL_BACKDROP_ENTER`

`--enter` modifier — genie fly-in: backdrop + panel start collapsed.

### `SEARCH_MODAL_BACKDROP_LEAVE`

`--leave` modifier — genie collapse back into the trigger control.

### `SEARCH_MODAL_PANEL`

The centered dialog panel.

### `SEARCH_MODAL_TITLE`

The dialog's sr-only heading (landmark for AT).

### `SEARCH_MODAL_CLOSE_BTN`

Close button in the panel header — hosts the WebGL liquid-×.

### `SEARCH_MODAL_CLOSE_CANVAS`

The liquid-fill ✕ canvas inside the close button.

### `SEARCH_MODAL_BODY`

The hosted search surface wrapper.
