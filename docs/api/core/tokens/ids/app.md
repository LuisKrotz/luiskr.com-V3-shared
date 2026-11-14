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

### `PAGE_BACKDROP`

Fullscreen WebGL field canvas parked behind #app (body's first child).

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

### `COOKIES_INFO`

Cookie-banner message text — aria-labelledby target giving the
consent aside a _visible_ label (aria-label alone is invisible).

### `ROUTE_SEARCH_LIST`

Route-search listbox — the combobox's aria-controls target.

### `ROUTE_SEARCH_OPTION_PREFIX`

Route-search option id PREFIX — aria-activedescendant points at
`<prefix><n>` rows inside the listbox.

### `READER_CONTENT`

Parked reader article — the light-DOM skip link's static target.
Deliberately different from MAIN_CONTENT (which lives inside the
app-root shadow tree): identical ids across trees are legal, but
DOM-wide uniqueness checkers count the composed tree. At runtime a
delegated handler re-aims the link at the shadow #main-content.

### `SITEMAP_GROUP_PREFIX`

Sitemap collapsible-group region id PREFIX — the toggle's
aria-controls points at `<prefix><group-key>` (the wall container
that mounts the group's children on first open).

### `NAV_SEARCH_IDS`

Gradient ids for the nav search magnifier SVG.

### `GLASS`

Radial glass ramp — the lens face's soft convex fill.

### `RIM`

Linear rim ramp — top-lit metal ring edge.

### `HANDLE`

Linear handle ramp — the machined grip's edge shading.

### `CHEV`

Prompt chevron silver gradient (search glyph).

### `STREAK`

Motion streak gradient (search glyph).

### `SHAFT`

Brush shaft gradient.

### `FERRULE`

Chrome ferrule gradient.

### `TIP`

Bristle tip gradient.

### `SWOOSH`

Paint swoosh gradient.

### `GLOBE`

Globe outline gradient (language glyph).

### `GRID`

Grid outline gradient (menu glyph).
