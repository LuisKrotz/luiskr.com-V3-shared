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

Interactive surfaces: earth playground, star field, animations.

### `PROJECT`

Portfolio project detail pages joined from the portfoliolist.

### `DOCS`

Docs-portal pages — the English-only manifest corpus.

### `ROUTE_SEARCH_LIMITS`

Frozen route-search limits — `MAX_HITS` is the page size: how many
ranked rows the listbox renders per results page. The catalog holds
thousands of entries; a one-letter query matched ~6.7k rows, and
patching them all into the DOM per keystroke cost ≈600ms first paint —
the pager walks the full hit list one slice at a time instead.

### `MAX_HITS`

Rows rendered per results page — one slice of the ranked hits.
