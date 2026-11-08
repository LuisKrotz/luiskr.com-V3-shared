# `core\tokens\classes\awards.ts`

Awards footer class tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\awards.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `AWARDS_CLASSES`

Frozen awards class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `AWARDS_FOOTER_TOP`

Top row of the legal band — legal nav left, source-code pill right.

### `AWARDS_FOOTER_PAIR`

Separator+item atomic pair — nowrap box so a wrapped line can only
break before the unit; the dot can never orphan at a line's end.

### `AWARDS_FOOTER_PAIR_LEAD`

Modifier toggled on a pair that leads a wrapped line — its
separator hides so the line opens on the label, not a dot.

### `AWARDS_FOOTER_FEED`

RSS feed anchor — last legal-nav entry; the delegated SPA click
handler skips it so the browser fetches the XML file natively.

### `AWARDS_FOOTER_FEED_ICON`

Inline RSS glyph (dot + two broadcast arcs) inside the feed anchor.

### `AWARDS_FOOTER_FEED_WAVE`

One broadcast arc of the RSS glyph — staggered pulse on hover/focus.
