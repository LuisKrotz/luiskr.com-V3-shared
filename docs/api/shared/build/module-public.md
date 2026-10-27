# `shared\build\module-public.mjs`

Multi-source public-asset merge for the modular workspace.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\build\module-public.mjs`                    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `REPO`

Repo root — this file sits at shared/build/.

### `MODULE_PUBLIC_MOUNTS`

Module public mounts: `{ dir }` (repo-relative source) → `{ at }` (URL
prefix it answers under). Order is irrelevant — the longest prefixes are
just connect routes; `'/'` mounts fall through to `next()` on misses.

### `firebaseRewrites`

firebase.json hosting rewrites — `/robots.txt` → `/meta/robots.txt`
and friends. Firebase evaluates these at hosting level, so plain
`vite dev`/`vite preview` never saw them (Lighthouse fetched the SPA
index.html as robots.txt). Reading the config keeps the rewrite
table single-sourced; glob sources (`/**` SPA catch-alls) are
excluded — the SPA fallback already owns those.

- `@returns` {{ source: string, destination: string }[]} Plain path rewrites.

### `rewriteMount`

Connect middleware applying the firebase rewrites — rewrites
`req.url` to the destination so a later `serveMount` answers the
mapped file. Registered before the mounts.

- `@returns` {import('connect').NextHandleFunction} Rewrite handler.

### `MIME`

Minimal content-type table for the dev middleware (build copies need none).

### `serveMount`

Connect middleware serving one module `public/` dir at a mount prefix.
Misses and path-traversal attempts fall through to `next()`.
Implements single-range byte serving (`Accept-Ranges` + `206`) — media
elements probe ranges to discover stream duration and to seek; without
them Chrome shows only the buffered seconds and never seeks.

- `@param` {string} dirAbs Absolute source directory.
- `@returns` {import('connect').NextHandleFunction} Static-file handler.

### `copyMount`

Recursively copies one mount tree into outDir. `.json` payloads are
re-serialized without whitespace on the way out — sources stay
human-readable for review while dist ships the minified form the
dossier/i18n fetches actually download. Anything unparseable is copied
verbatim so a hand-tuned fixture can never break the build. Binary and
text assets pass through untouched.

- `@param` {string} src Absolute source directory.
- `@param` {string} dest Absolute destination directory.

### `modulePublicPlugin`

Vite plugin merging every module `public/` into the served/built site.

- `@param` {object} [opts] Options.
- `@param` {boolean} [opts.copy] Force-copy into outDir on build (default: only
- `@returns` {import('vite').Plugin} The plugin instance.
