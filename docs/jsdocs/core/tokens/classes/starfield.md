# `core\tokens\classes\starfield.ts`

Star-field experiment class tokens (`sf-*` block) —

| | |
|---|---|
| **Source** | `src/core\tokens\classes\starfield.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SF_CLASSES`

Frozen sf class-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.

### `SF_DISCLAIMER`

Bottom-edge scale disclaimer strip (localized per locale node).

### `SF_TIP_EDGE`

Edge-hint mode — marker clamped to the canvas edge; line rotates to point.

### `SF_TIP_FLIPX`

Label flips left of the marker — right-edge clamps keep it readable.

### `SF_TIP_FLIPY`

Label drops below the marker — top-edge clamps keep it on-canvas.

### `SF_NAV_PIN`

Sticky pinned strip inside the scrolling panel (head + search).

### `SF_NAV_DISCLAIMER`

In-drawer scale disclaimer — mobile home for the honesty note.
