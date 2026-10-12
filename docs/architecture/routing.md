# Routing

`core/router/router.ts` — the router facade lives inside the `core/`
module alongside its helpers (`parse-path.ts`, `navigate.ts`,
`types.ts`); each page view is a self-contained folder under
`website/views/<page>/` holding the `.tsx` facade, its `.scss`, and its
helper modules. The docs portal view lives in `experiments/docs/` and the
playground in `experiments/earth-playground/` — both mounted lazily by
the app shell, never imported eagerly.

## Route table

Views are lazily `import()`ed by the router so each route ships its own chunk:

| Path pattern                                    | View                                               | Chunk                  |
| ----------------------------------------------- | -------------------------------------------------- | ---------------------- |
| `/`                                             | `website/views/home/Home.tsx`                      | `Home-*.js`            |
| `/portfolio/:slug` (project slugs + aliases)    | `website/views/project/Project.tsx`                | `Project-*.js`         |
| `/privacy-policy`, `/gdpr`, `/terms-of-use`     | `website/views/legal/Legal.tsx`                    | `Legal-*.js`           |
| `/earth-playground` (alias `/space-playground`) | `experiments/earth-playground/SpacePlayground.tsx` | `SpacePlayground-*.js` |
| `/docs[/*]` (English-only; `*` = manifest path) | `experiments/docs/Docs.tsx`                        | `Docs-*.js`            |
| anything else                                   | `website/views/not-found/NotFound.tsx`             | `NotFound-*.js`        |
| `/cms*`                                         | handled by the CMS bundle, not this table          | —                      |

The `/docs/*` wildcard resolves a node in the build-time docs manifest —
every publishable file is a crawlable URL listed in `public/sitemap.xml`
with a per-route JSON-LD graph (see `core/utils/schema.ts` →
`generateDocsSchema`).

`PROJECT_ALIASES` maps legacy/external slugs to canonical project keys so old
links keep working.

## Locale prefixes

```
/en/portfolio/melissa      → lang=en, route=/portfolio/melissa
/portfolio/melissa         → default lang (en)
/br                        → lang=br, route=/
```

`detectLangFromPath()` (`core/i18n.ts`) reads the first path segment against
`VALID_LANGS`. `App.tsx` resolves the locale _before_ the router mounts, so the
view's translation bundle (`APP`, `components`, `pages`, `slugs`) is already in
the store.

## Locale-specific slugs

Route slugs themselves are localizable. Resolution order:

```
translations/<locale>/slugs   (Firebase + snapshot, CMS-editable)
        ↓ merged over
LANG_SLUGS defaults           (core/locale/lang-slugs.ts)
        ↓
store.state.lang.slugs        (set by App.tsx during locale load)
```

- **Inbound**: `router.parse` compares incoming segments to the active locale's
  slugs first, then to defaults — a `/de/datenschutz` URL resolves to the same
  legal route as `/privacy-policy`.
- **Outbound**: `LangDialog` calls `routeSlugs(newLang)` so switching language
  rewrites the current path into the target locale's slug, not just the prefix.
- `src/main.ts` uses `LANG_SLUGS` directly because it runs before the store
  exists — intentional, don't "fix" it.

## View lifecycle

```mermaid
sequenceDiagram
    participant R as router.ts
    participant S as store
    participant V as View element
    participant P as Previous view

    R->>R: navigate(path) → parse locale + route
    R->>S: commit(SET_ROUTE)
    R->>R: dynamic import(view chunk)
    R->>V: new + append to &lt;main&gt;
    V->>V: constructor → skeleton placeholders
    V->>V: fetch DB node (pages/*, projects/*)
    V->>V: render() → resolve() → skeleton fade + content-in
    R->>P: disconnected → BaseComponent teardown
    Note over P: scoped listeners removed,<br/>WebGL contexts released
```

Locale-prefixed inbound paths resolve through `detectLangFromPath()`
first, then the active locale's `slugs` table falls back to
`LANG_SLUGS` defaults — outbound, `LangDialog` rewrites the current
path into the target locale's slug via `routeSlugs(newLang)`.

## UX mapping

- **Instant nav**: route chunks are preloaded by the service worker after
  first load; navigation is effectively local.
- **Skeletons**: each view renders layout-accurate skeletons immediately, so
  route changes never flash an empty page.
- **Title/meta**: the router sets `document.title` from `TRANSLATION_KEYS` +
  `BASE_TITLE` after the view resolves.
