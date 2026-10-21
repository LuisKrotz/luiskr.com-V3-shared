# `core\locale\reader-content.ts`

Keeps the reader-content &lt;article&gt; in sync with SPA

| | |
|---|---|
| **Source** | `src/core\locale\reader-content.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `cache`

Extracted article inner markup per path — pages rarely exceed ~30 KB.

### `holder`

The hoisted <article> element (may hold stale content between navs).

### `generation`

Monotonic counter so a slow earlier fetch never overwrites a newer one.

### `ensureHolder`

Locates or creates the offscreen article holder. Emitted pages hoist
theirs via main.ts; when none exists (first paint on a non-emitted
route) an empty one is appended so later navigations can fill it.

### `updateReaderContent`

Replaces the reader article's markup with the prerendered article of
`path`'s static page. Responses are cached per path; fetches race
safely via the generation counter. A page without a reader article
clears the holder (reader mode then correctly finds nothing to offer).
- `@param` path URL path to mirror (e.g. window.location.pathname).
