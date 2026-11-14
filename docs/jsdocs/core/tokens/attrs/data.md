# `core\tokens\attrs\data.ts`

`data-*` attribute tokens — token group. Every name is

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\attrs\data.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `DATA_ATTRS`

Frozen data attribute-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `DATA_INDEX`

`data-index` — generic positional index (lists, slides).

### `DATA_LANG`

`data-lang` — locale marker stamped by language UI rows.

### `DATA_FLAG`

`data-flag` — marks flag-canvas nodes inside language rows.

### `DATA_SWITCH`

`data-switch` — marks toggle-switch rows in preferences.

### `DATA_TAB`

`data-tab` — tab identifier for tabbed surfaces (CMS panels).

### `DATA_IDX`

`data-idx` — compact index variant used where `index` would collide.

### `DATA_SEC`

`data-sec` — section index for nav/scroll bookkeeping.

### `DATA_TIDX`

`data-tidx` — tab index variant for nested tab groups.

### `DATA_COL`

`data-col` — column index for grid/mosaic cell bookkeeping.

### `DATA_MIDX`

`data-midx` — media index inside a figure's media list.

### `DATA_SIZE`

`data-size` — size variant marker on sized media items.

### `DATA_ACTION`

`data-action` — action name bound by CMS/editor buttons.

### `DATA_FIELD`

`data-field` — field binding name in CMS editor inputs.

### `DATA_DIM_IDX`

`data-dim-idx` — dimension index for multi-size media entries.

### `DATA_PROP`

`data-prop` — property binding name in CMS property editors.

### `DATA_THEME`

`data-theme` — theme value marker on theme picker buttons.

### `DATA_CONTENT`

`data-content` — marker stamped on BaseComponent's persistent shadow content wrapper; reused to find the wrapper across re-mounts.

### `DATA_CAROUSEL_IDX`

`data-carousel-idx` — slide index inside carousel tracks.

### `DATA_SEC_IDX`

`data-sec-idx` — section index variant for multi-section views.

### `DATA_PARAM`

`data-param` — parameter name bound by playground controls.

### `DATA_CHECK`

`data-check` — checkbox binding marker in preference editors.

### `DATA_APP_WRAPPER`

`data-app-wrapper` — marks the top-level app wrapper element.

### `DATA_PATH`

`data-path` — manifest path stamped on docs tree/grid buttons.

### `DATA_BODY`

`data-body` — star-field body id bound by navigator rows + pick meshes.

### `DATA_WIRED`

Marks a docs-content box whose delegated link handler is attached.

### `DATA_ANIM_LABEL`

`data-anim-label` — the alt the animation-desc helper last stamped;
lets locale re-applies refresh only helper-owned names (an author
name that diverges from the stamp is never clobbered).

### `DATA_ANIM_DESC`

`data-anim-desc` — marks canvas fallback text owned by the
animation-desc helper (value = the ANIMATION_IDS entry, so the
marker doubles as the element's animation identity).

### `PRINT_CAPTURE`

`data-print-capture` — opt-in marker on a canvas that must print its
painted frame even though it is aria-hidden/role-button (animation
demos, playground scenes). The print adapter still requests a fresh
frame via `printcapture` before the preserved-buffer read.

### `PRINT_SKIP`

`data-print-skip` — opt-out marker on a canvas that must never print
(docs landing background scene): the adapter retires the element and
injects no still.

### `PRINT_LINK`

`data-print-link` — marks an anchor that earns a `.print-qr-link`
code beside itself in print (sitemap route rows — every printed
route scans open). Locale/leaf chips stay QR-free: the marker is
per-anchor, not per-region.

### `PRINT_DOC`

`data-print-doc` — marks the `article.reader-content` mirror a route
populated for the print pass (docs renders the selected page into
it): the print sheet unparks the article and drops #app regardless
of the mirror's child shape — unlike the `> div` heuristic, which
only recognises unprepared prerendered mirrors.

### `PRINT_LANDSCAPE`

`data-print-landscape` — marker on a surface whose print output must
paginate landscape (the Earth scene is wider than tall): the adapter
stamps `html.print-landscape` and the print sheet's named `@page`
flips the whole job to landscape sheets.

### `PRINT_NO_CAPTION`

`data-print-no-caption` — opt-out marker on a media surface that must
print WITHOUT its `.print-caption` source line (the about portrait —
a personal photo needs no asset attribution on paper). The element
itself still prints; only the credit line is suppressed.

### `DOCS_MERMAID_SRC`

`data-mermaid-src` — the raw diagram source stashed on a rendered
`.docs-mermaid` block at render time: the block's textContent is
replaced by the SVG, so the print pass re-renders from this attr
with the paper theme instead of inheriting the screen palette.

### `PRINT_ROTATE`

`data-print-rotate` — stamped at print-render time on a docs
diagram block whose drawn aspect is wider than the portrait content
box: the print sheet quarter-turns the diagram inside a full-page
slot instead of shrinking it to illegibility (the "turn the
magazine" move the bleed plates use, applied to vector content).
