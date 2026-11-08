# `core\utils\wasm\wasm-search.ts`

Route-search scorer — the 404 autocomplete ranks its

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\wasm\wasm-search.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

A scorable catalog row — the fields the matcher reads.

### `title`

Display title (strongest match field).

### `path`

URL path — matched so typing "/port" filters to the portfolio.

### `preview`

Preview/description text (weakest field).

### `keywords`

Search keywords (the DB searchThemes lists).

### (module scope)

One ranked hit — `index` addresses the caller's catalog array.

### `SCORE_TITLE_EXACT`

Score weights — title beats keywords beats path beats preview.

### `normalizeSearchText`

Diacritic-folding lowercaser shared by query and field normalization.

### `scoreRoutesJs`

`scoreRoutesJs` — the synchronous scorer. Every query term must hit at
least one field (AND semantics so "dell design" can intersect title
words); an empty query returns the whole catalog in declaration order
(predict mode lists every route on focus).

- `@param` items Catalog rows to rank.
- `@param` query Raw input text.
- `@returns` Hits sorted by score desc, stable on catalog order.

### (module scope)

Worker payload row — trimmed to the scorable fields.

### (module scope)

Worker reply row — mirrors the postMessage body in wasm-worker.js.

### (module scope)

`searchRoutes` — batch-dispatches the scoring to the wasm pool and
resolves the ranked hits; resolves the identical JS result when the
pool can't answer (no workers, timeout, wiped pool).

- `@param` items Catalog rows.
- `@param` query Raw input text.
- `@returns` Ranked hits; never rejects.
