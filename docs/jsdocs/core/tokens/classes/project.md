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

### `INTERNAL_TITLE_MARQUEE_MOD`

Modifier on the project title <h1> — switches the heading to the
uppercase marquee strip (project view only; legal/animations keep
the plain title).

### `INTERNAL_TITLE_STRIP`

The endlessly translating marquee strip inside the marquee title.

### `INTERNAL_TITLE_COPY`

One half of the strip — N title units wide (N sized to the viewport)
so the -50% translateX loop always lands on an identical seam.

### `INTERNAL_TITLE_UNIT`

One "TITLE |" repetition inside a half — the measured unit that
sizes how many repetitions fill the viewport.

### `INTERNAL_TITLE_SEP`

The pipe separator trailing each title unit.

### `INTERNAL_DESCRIPTION_XL`

Modifier on .internal-description — set by fitDescriptionSizes when the
block holds a single paragraph that renders on one line at the base
body size: the sentence is promoted to the TTL_XL display ramp.

### `INTERNAL_DESCRIPTION_MD`

Modifier on .internal-description — single paragraph that wraps past
one line at the base body size: promoted to the TXT_LG ramp.

### `INTERNAL_FOOTER_ITEMS_DIVIDER_CANVAS`

WebGPU overlay canvas for the divider sheen (`divider-sheen` widget).

### `INTERNAL_FOOTER_ITEMS_PAIR`

Atomic separator+link unit — nowrap so a line break can only land
BEFORE the pair: the dot always opens the wrapped line instead of
dangling at the previous line's end.

### `INTERNAL_FOOTER_ITEMS_PAIR_LEAD`

Modifier toggled on a pair that leads a wrapped line — its
separator hides so the line opens on the label, not a dot.

### `INTERNAL_FOOTER_ITEMS_VERSION`

Release stamp under the copyright line — package version + rolling
build id baked in by stamp-version.mjs at build time.

### `INTERNAL_FOOTER_ITEMS_FEED`

RSS row under the legal links — wraps the locale feed anchor.

### `INTERNAL_FOOTER_ITEMS_FEED_LINK`

The feed anchor itself — the delegated SPA click handler skips it so
the browser fetches the XML file instead of routing.

### `INTERNAL_FOOTER_ITEMS_FEED_ICON`

Inline RSS glyph (dot + two broadcast arcs) inside the feed anchor.

### `INTERNAL_FOOTER_ITEMS_FEED_WAVE`

One broadcast arc of the RSS glyph — staggered pulse on hover/focus.

### `INTERNAL_FOOTER_DOCS_ARROW`

The '→' glyph span inside the docs link.

### `INTERNAL_FOOTER_TOP`

Unified-footer top row — legal nav left, source pill + socials right.

### `INTERNAL_FOOTER_LEGAL`

Left nav wrapping the legal links + the locale RSS feed item.

### `INTERNAL_FOOTER_SIDE`

Right column of the top row — source-code pill above the socials row.

### `INTERNAL_FOOTER_SOURCE`

The 'PROJECT SOURCE CODE: GIT' capsule in the right column.

### `INTERNAL_FOOTER_SOCIALS`

The home + social-channels row under the source pill.

### `PROJECT_CLASSES`

Frozen project class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
