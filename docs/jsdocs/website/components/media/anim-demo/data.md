# `website\components\media\anim-demo\data.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\data.ts`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

The demo payload — the pages/HOME node (portfoliolist + deck copy),
the pages/ABOUT node (mention_items + profilePicture) and the
components/related node (canonical featured flags) — the raw locale
objects the real components consume, matching the home view's three
data sources.

### `home`

pages/<locale>/HOME — portfoliolist, deckHint, home copy.

### `about`

pages/<locale>/ABOUT — mention_items + profilePicture + bio.

### `related`

components/<locale>/related — the canonical featured project flags.

### `_cache`

Per-locale memoized fetch — keyed so a locale swap re-resolves.

### `loadDemoData`

Loads (once per locale) the HOME + ABOUT page nodes the demo
elements read. Mirrors the home view's path grammar
(`lang.database + locale + lang.pagesPath + key`); a missing node
resolves null rather than rejecting so a demo still mounts with
whatever slice arrived.

- `@returns` The shared data promise for the current locale.
