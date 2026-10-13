# The modules — how the whole thing fits

luiskr.com V3 is a monorepo of eight workspace modules — each a git submodule
with its own repository, package.json, tsconfig, vite config and Jest suite.
This page is the map of the whole: what each module is for, how a request
travels through them, and how the codebase documents itself.

## The cast

```text
                 ┌────────────────────────────────────────────┐
                 │                 shared/                     │
                 │  app shell · orchestrator · build matrix    │
                 │  verify/test/docs pipelines · vendored deps │
                 └───────────────────┬────────────────────────┘
                                     │ mounts & wires
        ┌──────────────┬────────────┼────────────┬──────────────────┐
        ▼              ▼            ▼            ▼                  ▼
     website/       cms/     experiments/    experiments/      desktop/
   public site    admin      docs portal   earth + star-field   Electron
        └──────────────┴────────────┴────────────┴──────────────────┘
                                     │ built on
                                     ▼
                              ┌─────────────┐
                              │    core/    │
                              │ the platform│
                              └─────────────┘
```

| Module                         | Role                                                                                                             | Story                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `shared/`                      | **The operation** — `<app-root>` shell, workspace registry, 12-tier build matrix, the verify/test/docs toolchain | [README](../README.md) · [portal](/docs/shared/README.md)                                |
| `core/`                        | **The platform** — JSX runtime, component base, store, router, i18n, tokens, WebGL widgets, WASM pool            | [README](../../core/README.md) · [portal](/docs/core/README.md)                          |
| `website/`                     | **The public site** — home/project/legal/404 views + every component and effect                                  | [README](../../website/README.md) · [portal](/docs/website/README.md)                    |
| `cms/`                         | **The admin** — Firebase editors per content node, localhost media converter, deploy-info viewer                 | [README](../../cms/README.md) · [portal](/docs/cms/README.md)                            |
| `experiments/docs`             | **The docs portal** — browsable docs/reports/coverage/source via a lazy manifest                                 | [README](../../experiments/docs/README.md) · [portal](/docs/docs-exp/README.md)          |
| `experiments/earth-playground` | **Earth Playground** — WebGPU Earth, atmosphere, moon, post chain, live panel                                    | [README](../../experiments/earth-playground/README.md) · [portal](/docs/earth/README.md) |
| `experiments/star-field`       | **Star Field** — Solar System → Milky Way → observable universe; 134 bodies + 139k-record catalog                | [README](../../experiments/star-field/README.md) · [portal](/docs/starfield/README.md)   |
| `desktop/`                     | **The shell** — Electron wrapper serving `dist/` on a local port; per-OS installers                              | [README](../../desktop/README.md) · [portal](/docs/desktop/README.md)                    |

## The shape of a request

1. `index.html` boots `shared/scripts/build/browser-loader.js` — an ES5
   script that walks the ES feature ladder newest→oldest and loads the best
   bundle tier (`esnext` down to the `es2016` IIFE).
2. The tier's entry runs `shared/src/main.ts`: side-effect imports (service
   worker, global styles, router, store, `<app-root>`), then parallel warm-up
   — the locale's baked snapshot + the likely route chunk fetch before mount.
3. The `core/` router resolves the localized slug; `shared/src/app/view.ts`
   lazy-imports the view chunk — `website/views/*` for pages,
   `experiments/*/…` for the docs portal, playground, or star field.
4. The view fetches its `translations/<locale>/` nodes via the SWR data layer
   — instant from the bundled snapshot, then a silent Firebase revalidate —
   renders JSX into its shadow root, mounts children, publishes JSON-LD.
5. Those same translation nodes are **written** by `cms/` — a separate bundle
   behind Google OAuth — so content travels CMS → RTDB → site with no deploy.

## How crawlers see it

The app is an SPA, but the crawl surface is fully enumerated at build time:

- `generate-sitemap.js` mirrors the runtime router + `LANG_SLUGS` into a
  sitemap index, per-locale `sitemap-<loc>.xml` files, `urllist.txt`, and
  localized `robots.txt` / `llms.txt` / `ai-catalog.json` — every canonical
  route, localized slug, portfolio project, and star-field body deep link.
  Docs routes stay English-only.
- `build-locale-pages.mjs` pre-renders each localized route into
  `dist/langs/<loc>/<route>/` — translated `<title>`/meta/canonical,
  per-route `hreflang` alternates, localized JSON-LD — with Firebase
  rewrites mapping public paths to those documents.
- `shared/tests/governance/seo-route-parity.test.js` pins the committed
  artifacts, `firebase.json` rewrites, and slug table in sync.

## How the docs are made

The repository documents itself in three layers, all browsable at `/docs`:

- **Curated** — the architecture and guide pages you're reading
  (`shared/docs/`), plus each module's `README.md` (published under its
  source root: `/docs/core/README.md`, `/docs/starfield/README.md`, …).
- **Generated** — `shared/scripts/docs/gen-docs.mjs` extracts the
  `@file`/`@description`/`@param` JSDoc from **every source file** (1163
  pages and counting) — `shared/src`, `shared/build`, `shared/scripts`,
  `core`, `website`, `cms`, `experiments`, `shared/local-modules`,
  `desktop` — into per-file markdown under `docs/api/` and `docs/jsdocs/`
  (plus `typedoc/` and `sassdoc/`).
- **Source** — the docs portal also publishes the raw source trees as
  syntax-highlighted, comment-bearing pages (the `src:`, `shared:`, `core:`,
  `website:`, `cms:`, `earth:`, `starfield:`, `docs-exp:`, `desktop:` and
  `local-modules:` roots), lazily fetched per file via `docs-content/*.json`
  — with per-module Istanbul coverage reports under `coverage-*:`.

So the story is: **code comments → generated pages → one lazy portal.**
The comments live in the source; `gen-docs.mjs` turns them into the API
tree; `shared/build/docs/` (scan → render → redact) turns the whole
repo surface — docs, source, reports, coverage — into the manifest the
portal browses.

## Ownership rules

- `core/` imports nothing from `website/`, `cms/` or `experiments/`.
- `website/` and `cms/` import from `core/` only — never each other.
- `experiments/` may import `core/`; nothing imports them except the app
  shell's lazy route loader.
- `shared/` orchestrates all of it and owns the tooling every module's
  hooks, gates and builds run through.
- Cross-area imports resolve through the path aliases (`@core/…`,
  `@website/…`, `@cms/…`, `@earth/…`, `@docs/…`).

See [architecture.md](architecture/architecture.md) for the deep dive.
