# shared/

The shared module is the monorepo's **heart**: it owns the application shell that every
visitor lands on, the workspace orchestrator that keeps seven modules moving together,
the build machinery that turns one source tree into twelve browser-tier bundles, and
the documentation/test/verification pipelines that hold the whole project honest.

If `core/` is the platform (the primitives a UI is made of), `shared/` is the
**operation** — how the site boots, builds, verifies, documents itself, and stays clean.

---

## What's inside

| Path             | Role                                                                               |
| ---------------- | ---------------------------------------------------------------------------------- |
| `src/`           | The application shell — `<app-root>`, the entry point, service-worker registration |
| `build/`         | Vite plugin machinery shared by every module build                                 |
| `scripts/`       | The workspace toolchain — build, test, verify, docs, i18n, media, setup, scaffold  |
| `docs/`          | The published documentation tree (what you see at `/docs`)                         |
| `tests/`         | Cross-cutting suites — governance scans, test fixtures, coverage sweeps            |
| `local-modules/` | Security-hardened vendored dependency replacements                                 |
| `reports/`       | Shared coverage reports consumed by the docs portal                                |

---

## `src/` — the application shell

`shared/src` is the smallest source tree in the workspace (~10 files) and the most
important one: it's the thing that actually mounts. `main.ts` is the public-site
entry point — the file the browser's loader chain ultimately imports — and `App.tsx`
renders `<app-root>`, the persistent chrome around every routed view.

The boot sequence, in order:

1. **Side-effect imports** — service-worker registration, global stylesheet, router,
   store, the `<app-root>` custom-element definition, WASM CSS hooks.
2. **Parallel warm-up** — the locale's baked data snapshot and the likely route chunk
   start fetching _before_ mount, so first paint never waits on network.
3. **`App.boot`** — preferences init, data load, lazy dialog/HUD chunk imports,
   router subscription with progress bar, scroll/resize/theme listeners, intro loader.

### Source map

| File                           | What it does                                                                                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/App.tsx`                  | `<app-root>` — the shell custom element. Owns the persistent chrome: `<app-nav>`, `<preferences-modal>`, `<lang-dialog>`, `<cookie-banner>`, `<stats-hud>`, progress bar, and `#view-outlet` hosting routed views. |
| `src/main.ts`                  | Public-site entry point (modern ESM bundle) — boot order above.                                                                                                                                                    |
| `src/registerServiceWorker.ts` | Registers the Workbox-generated service worker in production; an available update triggers a hard reload so users never run a stale shell.                                                                         |
| `src/app/boot.ts`              | Shell bootstrap — preferences, data load, lazy dialog/HUD imports, router subscription, listeners, intro loader.                                                                                                   |
| `src/app/data.ts`              | Locale data loading — fetches the `APP` translation node per locale, fans it out, caches the loaded lang.                                                                                                          |
| `src/app/input.ts`             | Global input listeners — keyboard shortcuts, pointer handlers, preference triggers.                                                                                                                                |
| `src/app/modal.ts`             | Modal-state DOM sync — `modal-open` on html/body, modifier class mirror, iOS fixed-position scroll lock.                                                                                                           |
| `src/app/scroll.ts`            | Scroll tracking — `#about`/`#contact` section tops, `activeSection`/`onBottom` in sync.                                                                                                                            |
| `src/app/types.ts`             | Shared structural types — the `APP` translation dictionary plus augmented element types.                                                                                                                           |
| `src/app/view.ts`              | View-outlet reconciliation — same-tag routes delegate to `onRouteParamChange`; new views lazy-import their chunk then cross-fade.                                                                                  |
| `src/globals.d.ts`             | Global type declarations.                                                                                                                                                                                          |
| `src/modules.d.ts`             | Module-specifier type declarations (virtual modules, CSS imports, etc.).                                                                                                                                           |

---

## `build/` — the Vite plugin machinery

Every module's `vite.config.js` is a thin shim over these shared plugins. This is
where the "one repo, many modules" build model actually lives:

| File                      | What it does                                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build/vite-lib.mjs`      | Shared factory for per-module Vite library builds. Each module's `vite.config.js` calls `moduleConfig()` so every library emits with identical resolve/external/dev settings.                                    |
| `build/es-targets.mjs`    | The multi-engine build matrix — every ES tier the site ships (es2016 IIFE → esnext module), its esbuild/terser/lightningcss knobs, and the runtime feature probes the inline browser loader walks newest→oldest. |
| `build/module-public.mjs` | Public-asset merge — every module owns its own `public/` folder (website SEO files, core workers, earth-playground textures); this plugin merges them into one `dist/` tree at build time.                       |
| `build/i18n-virtual.mjs`  | `virtual:i18n-*` modules — the baked translation snapshot. `core/utils/data/db.ts` imports these virtual specifiers, so every Vite pipeline (root, module, docs) resolves the same SWR seed data.                |
| `build/jsx-in-js.mjs`     | JSX transform for `.js` files — legacy sources that keep a `.js` extension while returning JSX get esbuild's JSX loader anyway.                                                                                  |
| `build/docs-portal.mjs`   | Docs-portal pipeline — `virtual:docs-manifest` carries the scanned docs/reports/coverage/src tree; every publishable file is also emitted as a lazy `docs-content/<root>/<path>.json` payload.                   |

### `build/docs/` — the docs-portal pipeline

| File                    | What it does                                                                                                                                                                                                                                                                             |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build/docs/scan.mjs`   | Filesystem → manifest tree. Scans the publishable roots (`docs`, `reports`, `src`, `core`, `website`, `cms`, `earth`, `docs-exp`, `local-modules`, coverage dirs) into one manifest; files are addressed by stable ids `root:path` that double as `/docs-content/<id>.json` fetch paths. |
| `build/docs/render.mjs` | Build-time file → HTML renderers: markdown via `marked`, JSON pretty-print, source files syntax-highlighted, coverage HTML sandboxed.                                                                                                                                                    |
| `build/docs/redact.mjs` | Secret scrubbing for the public source viewer — strips API keys, tokens, and sensitive-looking literals before any source line reaches a published payload.                                                                                                                              |

---

## `scripts/` — the workspace toolchain

These scripts are the verbs of the repo. `yarn verify`, `yarn build`, `yarn test`,
`yarn docs` — each resolves into one of these files.

### Build pipeline (`scripts/build/`)

| File                           | What it does                                                                                                                                                                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build/build.mjs`              | Production build orchestrator — `prebuild` runs the complete verify gate first, then this emits all browser targets, packages deploy diagnostics, and generates locale pages.                                                                                                               |
| `build/build-targets.mjs`      | Multi-target build runner — `vite build` once per tier in `es-targets.mjs`; each tier emits `dist/v/<tier>/assets/{js,css,misc}/` (module) or a self-contained IIFE (legacy). Supports `LK_ONLY`/`LK_KEEP_DIST` for single-tier iteration.                                                  |
| `build/build-locale-pages.mjs` | Per-locale static `index.html` files into `dist/` — crawlers and no-JS visitors get translated `<title>`, meta, canonical, og/twitter, per-route hreflang alternates and localized JSON-LD; covers home/legal/about/contact, playground + star-field slugs, and localized portfolio routes. |
| `build/browser-loader.js`      | Runtime bundle dispatcher inlined into `dist/index.html` — strict ES5 so it parses on the oldest engines it detects; walks the ES feature ladder newest→oldest and loads the best supported tier.                                                                                           |
| `build/build-wasm.js`          | WASM build step for the `engine.wasm` shared by layout/motion math.                                                                                                                                                                                                                         |
| `build/deploy-info.mjs`        | Assembles `dist/deploy-info/` — the "last build" bundle the CMS Build tab renders (Lighthouse, coverage, axe, Snyk/audit, console-scan).                                                                                                                                                    |
| `build/generate-sitemap.js`    | Emits the sitemap index + per-locale `sitemap-<loc>.xml`, `urllist.txt`, and localized robots/llms/ai-catalog files — the full route surface: English canonicals, localized slugs, localized portfolio, star-field catalog deep links, and the English-only `/docs/**` manifest.            |

### Verification (`scripts/verify/`)

| File                        | What it does                                                                                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verify/verify.mjs`         | The single quality gate shared by `prebuild` and the git pre-commit hook: console-scan, typecheck, eslint, stylelint, unit tests, coverage gate, security scan.         |
| `verify/console-scan.mjs`   | Zero-console policy enforcement — every `console.*` call is a violation; diagnostics route through `core/devlog` instead.                                               |
| `verify/coverage-gate.mjs`  | Per-file 100% coverage enforcement — Jest's threshold checks aggregates; this gate requires every authored source file to hit 100% statements/branches/functions/lines. |
| `verify/coverage-gaps.mjs`  | Reports uncovered statements/branches/functions for a file, with `--source-map` decode for the JSX transformer's coordinate shift.                                      |
| `verify/scope-gates.mjs`    | Scoped quality gates — hooks/CI run only the modules a change touches (scoped tsc, eslint, stylelint, tests).                                                           |
| `verify/security-scan.mjs`  | Dependency vulnerability scan — Snyk primary (`SNYK_TOKEN`), `yarn audit` fallback.                                                                                     |
| `verify/uncov.mjs`          | Uncovered-lines reporter.                                                                                                                                               |
| `verify/test-lighthouse.js` | Backward-compatible Lighthouse entry — defers to the post-build audit so Lighthouse never runs before verified artifacts exist.                                         |

### Tests (`scripts/test/`)

| File                      | What it does                                                                                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test/run-modules.mjs`    | Runs every module's Jest suite **sequentially** — shared, core, website, cms, earth-playground, docs — each with its own `jest.config.mjs` and reports output.                                                    |
| `test/merge-coverage.mjs` | Unions the raw coverage maps from each module run, then re-emits per-module reports filtered to that module's authored source roots. The cross-module union is why each module can claim "100% of its own files." |

### Docs generation (`scripts/docs/`)

| File                    | What it does                                                                                                                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/gen-docs.mjs`     | JSDoc → markdown pipeline — extracts `@file`/`@description`/`@param`/`@returns` from every `.ts/.tsx/.js`, writes one md page per file grouped by directory into `docs/api/` (published under the docs portal). |
| `docs/sassdoc-lite.mjs` | Security-focused replacement for the unmaintained `sassdoc` package — parses `///` Sass comments into the same JSON shape.                                                                                      |
| `docs/sassdoc-vars.mjs` | Inserts `///` sassdoc stubs above `$var:` declarations so the sassdoc pass has comments to parse.                                                                                                               |

### i18n & media (`scripts/i18n/`, `scripts/media-convert/`)

| File                                          | What it does                                                                                                                                                                |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18n/ast-string-extract.js`                  | AST static analysis — detects repeated non-syntactic string literals across the codebase (UI labels, dict keys, API routes) while preserving engine-level syntactic tokens. |
| `i18n/seed-translations.js`                   | Pushes new i18n keys to Firebase RTDB (requires `.firebase-admin-key.json`).                                                                                                |
| `i18n/patch-earth-playground-translations.js` | Backfills the earth-playground translation node.                                                                                                                            |
| `i18n/upload-earth-playground-firebase.js`    | Uploads the earth-playground defaults to Firebase.                                                                                                                          |
| `media-convert/index.js`                      | Localhost-only media converter API — a Vite plugin exposing upload → convert → zip-download endpoints on the dev server; never part of the built bundle.                    |
| `media-convert/pipeline.js`                   | The conversion pipeline — images → mozjpeg q100/q75/q50 + MSSIM-tuned blur-up variants, videos → mp4 scaled tiers, all in the site's exact CDN naming.                      |
| `media-convert/install.js`                    | Guided toolchain installer — per-platform package-manager detection and install plans surfaced in the CMS UI.                                                               |
| `media-convert/zip.js`                        | Minimal dependency-free ZIP writer (DEFLATE via `node:zlib`) for result bundles.                                                                                            |

### Workspace orchestration

| File                          | What it does                                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `modules.mjs`                 | The module registry — fixed core modules plus dynamic discovery of any `experiments/<name>/` with a `package.json`.               |
| `module.mjs`                  | Lifecycle fan-out — runs `install`/`dev`/`build`/`test`/`preview`/`test:coverage` in one or every module that defines the script. |
| `scaffold/new-experiment.mjs` | Scaffolds `experiments/<name>/` following the established pattern (package.json, vite config, entry, tests).                      |
| `setup.mjs`                   | `yarn setup` — guided dev-environment installer: Node/Yarn/Git checks, dependency install, git hooks, media toolchain probe.      |
| `install-hooks.mjs`           | Copies versioned hooks from `git-hooks/` into the repo's real hooks dir and every initialized submodule's.                        |

---

## `local-modules/` — security-hardened vendored deps

Some npm dependencies are unmaintained and carry unresolved advisories. Rather than
wait upstream (or accept the risk), the repo vendors replacements under
`shared/local-modules/`, wired in via `package.json` `resolutions`.

| Module                       | Why it's vendored                                                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `local-modules/braces/`      | GHSA on `braces <=3.0.3` — recursive `{{{{…}}}}` nesting exhausted the call stack before range/limit checks ran. Patched so parse/expand iterates safely.    |
| `local-modules/extract-zip/` | Unmaintained; two advisories — unvalidated symlink path traversal and an overwrite vulnerability. This drop-in validates every entry against the target dir. |
| `local-modules/sprintf-js/`  | Vendored utility with its own helpers.                                                                                                                       |

---

## `docs/` — the published documentation tree

`shared/docs/` is the **`docs:` root** the portal scans — everything here is what you
browse at `/docs`. `README.md` inside is the documentation index; `architecture/`
and `guides/` hold the curated prose; `api/` is generated by `gen-docs.mjs`.

See **[shared/docs/README.md](docs/README.md)** for the full reading map.

---

## `tests/` — cross-cutting suites

`shared/tests/` hosts the suites that don't belong to any single module: governance
scans (the zero-hardcoding/zero-console/token-ownership guards), test fixtures, the
coverage sweeps spanning modules, and the shared Jest preset (`jest.preset.mjs`) +
resolver + setup every module config extends.

---

## Commands

```bash
yarn setup        # guided environment install (node/yarn/git/hooks/media tools)
yarn dev          # dev server for the full site (all modules mounted)
yarn verify       # the complete quality gate — format, scans, type, lint, tests, coverage, security
yarn build        # production build — verify first, then all browser tiers into dist/
yarn preview      # serve dist/ exactly like production
yarn test         # run every module's Jest suite sequentially + merge coverage
yarn docs         # regenerate docs/api + sassdoc + typedoc
```

The module-level commands (`yarn dev` inside `core/`, `website/`, etc.) run through
`scripts/module.mjs` — see each module's README for its own workspace.
