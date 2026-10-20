# `core/tokens/elements/html.ts`

Native HTML tag-name tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/elements/html.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `HTML_TAGS`

Frozen html element tag-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `HTML_PHRASING_TAGS`

Frozen phrasing/text-bearing host map — elements whose textContent
would absorb an injected sibling text node, polluting the host's
accessible name and visible-text extraction. Sole declaration site
for these tags; strings shared with `HTML_TAGS` are referenced, not
redeclared (zero-hardcoding rules 4–5).
