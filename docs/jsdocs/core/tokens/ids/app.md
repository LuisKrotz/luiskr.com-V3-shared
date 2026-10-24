# `core\tokens\ids\app.ts`

App shell element id tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\ids\app.ts`                              |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `APP_IDS`

Frozen app element-id map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.

### `SF_NAV_PANEL`

Star-field navigator drawer — aria-controls target for its toggle.

### `SF_INSTRUCTIONS_PANEL`

Star-field mobile instructions drawer — aria-controls target for its toggle.

### `SF_PANEL_TITLE`

Star-field dossier panel title — aria-labelledby target for the aside landmark.

### `SF_NAV_DESC`

Star-field navigator description node — aria-describedby target for
the drawer landmark and its toggle button.

### `SF_PANEL_TAGLINE`

Star-field dossier tagline — aria-describedby target for the panel.

### `SF_INSTRUCTIONS_HINT`

Star-field instructions hint — aria-describedby target for the dialog.

### `SF_ITEM_DESC_PREFIX`

Star-field navigator item description id PREFIX — the per-body
describedby target is `<prefix><body-id>` inside each row button.

### `SF_MUSIC_LIST`

Star-field playlist track list — aria-controls target for the
card's collapse toggle.

### `NAV_MENU_PANEL`

Nav menu overlay — aria-controls target for the burger toggles.

### `NAV_MENU_TITLE`

Nav menu overlay title — aria-labelledby target for the open menu
navigation landmark.
