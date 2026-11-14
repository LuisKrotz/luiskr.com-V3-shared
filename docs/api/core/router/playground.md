# `core\router\playground.ts`

Playground-experiment route predicates — earth-playground

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\router\playground.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_EARTH_SLUGS`

Pre-computed set of every locale's localized earth-playground slug —
O(1) membership tests on the last URL segment (the route resolver may
not have run when a consumer first checks), so all locales' slugs are
flattened once at module load rather than re-built per call.

### `_STAR_SLUGS`

Same slug set for the star-field experiment — a separate key so each
playground surface can be told apart (nav suppresses only the current
experiment's own menu item).

### `lastPathSegment`

Last non-empty URL path segment — shared by the playground checks.

- `@param` pathname Raw location pathname (a pre-extracted bare segment
- `@returns` The trailing segment.

### `livePath`

The live pathname — window-free callers (SSR, tests without a DOM)
resolve to '', which never matches a playground slug.

- `@returns` `window.location.pathname`, or '' off-DOM.

### `isEarthPlaygroundRoute`

True on the earth-playground route (or its space-playground alias).
The resolved route name is checked first — the fast path covers the
window before the URL's last segment re-resolves — then the last
segment falls back through canonical segments and every locale's
localized slug.

- `@param` routeName Resolved route descriptor name, when the caller has one.
- `@param` pathname Path to check; defaults to the live `location.pathname`.
- `@returns` Whether the route is the earth playground.

### `isStarFieldRoute`

True on the star-field experiment route — same resolution order as
{@link isEarthPlaygroundRoute}.

- `@param` routeName Resolved route descriptor name, when the caller has one.
- `@param` pathname Path to check; defaults to the live `location.pathname`.
- `@returns` Whether the route is the star-field experiment.

### `isPlaygroundRoute`

True on either playground-experiment route — the "force dark, no theme
switching" surface test the theme resolver and preferences dialog use.

- `@param` routeName Resolved route descriptor name, when the caller has one.
- `@param` pathname Path to check; defaults to the live `location.pathname`.
- `@returns` Whether the route is a playground experiment.
