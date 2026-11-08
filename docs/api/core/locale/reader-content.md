# `core\locale\reader-content.ts`

Keeps the reader-content &lt;article&gt; in sync with SPA

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\locale\reader-content.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `cache`

Extracted article inner markup per path — pages rarely exceed ~30 KB.

### `holder`

The hoisted <article> element (may hold stale content between navs).

### `generation`

Monotonic counter so a slow earlier fetch never overwrites a newer one.

### `demoteReaderH1`

Demotes every <h1> inside the parked mirror to <h2>. Emitted markup
ships a real <h1> for no-JS documents, crawlers and reader modes, but
once JS mounts the routed view supplies the document's level-one
heading — an <h1> left in the mirror would double it in the live DOM
for every JS-rendering agent. Idempotent: a no-op when no <h1> remains.

- `@param` root Element whose descendant <h1>s are rewritten in place.

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
