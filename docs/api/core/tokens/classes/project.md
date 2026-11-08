# `core\tokens\classes\project.ts`

Project/internal page class tokens (`internal-*` block) —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\project.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `INTERNAL_CLASSES`

Internals (project-detail) page classes on the `internal-*` block family:
`internal` root, `internal-main` item grid, `internal-description` prose
block, `internal-extra` scroll strip, `internal-footer` related/notes
area, `internal-expand` trigger. `ZTF_VIDEO` is a standalone modifier
(zoom-to-fill) applied alongside items, not an internal-* descendant.

### `INTERNAL_FOOTER_ITEMS_DIVIDER_CANVAS`

WebGPU overlay canvas for the divider sheen (`divider-sheen` widget).

### `INTERNAL_FOOTER_ITEMS_FEED`

RSS row under the legal links — wraps the locale feed anchor.

### `INTERNAL_FOOTER_ITEMS_FEED_LINK`

The feed anchor itself — the delegated SPA click handler skips it so
the browser fetches the XML file instead of routing.

### `INTERNAL_FOOTER_ITEMS_FEED_ICON`

Inline RSS glyph (dot + two broadcast arcs) inside the feed anchor.

### `INTERNAL_FOOTER_ITEMS_FEED_WAVE`

One broadcast arc of the RSS glyph — staggered pulse on hover/focus.

### `PROJECT_CLASSES`

Frozen project class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
