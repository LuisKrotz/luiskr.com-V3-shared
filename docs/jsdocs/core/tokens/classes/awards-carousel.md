# `core\tokens\classes\awards-carousel.ts`

Awards carousel (`aw-c-*` block) class tokens — grouped subset of

| | |
|---|---|
| **Source** | `src/core\tokens\classes\awards-carousel.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `AWC_CLASSES`

Frozen awc class-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.

### `AWC_CARD_ACTION`

Corner-bracket action button inside CMS card content (explore variant).

### `AWC_LABEL_ACTION`

Corner-bracket action button inside CMS card content (selected variant).

### `AWC_ACTION_CANVAS`

WebGPU overlay canvas for the corner-bracket widget.

### `AWC_VARIANTS`

<awards-carousel> render-mode names — awards strip vs selected work.
