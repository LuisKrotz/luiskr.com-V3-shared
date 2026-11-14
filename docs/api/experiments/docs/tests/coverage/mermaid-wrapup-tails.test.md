# `experiments\docs\tests\coverage\mermaid-wrapup-tails.test.js`

Wrap-up coverage tails for docs/mermaid.ts — the

|                |                                                                    |
| -------------- | ------------------------------------------------------------------ |
| **Source**     | `src/experiments\docs\tests\coverage\mermaid-wrapup-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.            |

## Members

### `ATTR_VIEWBOX`

The `viewBox` attribute name — one-off fixture vocabulary the fake svg stubs key on.

### `VIEWBOX_WIDE`

A wide viewBox — w/h 2.0 clears the 1.15 rotate ratio, stamping the rotated slot.

### `VIEWBOX_TALL`

A tall viewBox — w/h 0.5 stays portrait; the else arm strips a stale rotate stamp.

### `STUB_STYLE`

Computed-style fixture values for the paper-theme font arms.

### `mkBlock`

Builds a `.docs-mermaid` mirror clone — `src` seats the stashed-source attr.

### `stubSvg`

Forces a clone's post-render `querySelector('svg')` to a fake svg carrying `viewBox`.

### `mkBox`

Wraps blocks in a detached mirror container — the pass's `container` argument.
