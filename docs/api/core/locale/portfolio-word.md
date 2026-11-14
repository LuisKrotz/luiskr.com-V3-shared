# `core\locale\portfolio-word.ts`

The print title-cover's second line — the single display

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\locale\portfolio-word.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `PORTFOLIO_WORD`

Locale code → the localized "Portfolio" word as printed on the title
cover — the routable codes plus the legacy aliases (pt/hrx/tli)
pinned to their sibling language's word.

### `portfolioWord`

Resolves the cover's "Portfolio" word for a locale code — unknown codes
and the legacy aliases fall back to English (the canonical form).

- `@param` lang Route locale code, e.g. 'br'.
- `@returns` The localized word.
