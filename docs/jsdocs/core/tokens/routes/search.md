# `core\tokens\routes\search.ts`

Route-search vocabulary — the entry-kind discriminants the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\routes\search.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `PAGE`

Static site pages: home, about, contact.

### `LEGAL`

Statutory pages: privacy, GDPR, terms, license.

### `EXPERIMENT`

Interactive surfaces: earth playground, star field, animations, docs.

### `PROJECT`

Portfolio project detail pages joined from the portfoliolist.

### `ROUTE_SEARCH_LIMITS`

Frozen route-search limits — `MAX_HITS` caps how many ranked rows the
listbox renders per query. The catalog holds thousands of entries; a
one-letter query matched ~6.7k rows, all patched into the DOM each
keystroke (≈600ms first paint, multi-hundred-ms long tasks). Ranking
already puts the best matches first, so the tail is never browsed.

### `MAX_HITS`

Rows rendered per query — top-ranked hits only.
