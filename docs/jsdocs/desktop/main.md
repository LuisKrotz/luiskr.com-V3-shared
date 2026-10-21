# `desktop\main.mjs`

| | |
|---|---|
| **Source** | `src/desktop\main.mjs` |
| **UX surface** | Electron main/launcher/preload — wraps dist/ as an installable app. |

## Members

### (module scope)

Electron main process — wraps the built site+CMS as an installable
desktop app. The app serves dist/ over an ephemeral 127.0.0.1 port
rather than file:// so service workers, module preloads, and Firebase
OAuth keep working on a real http origin.

The media-convert API is not proxied — it exists only under `yarn
dev`'s vite middleware, so the converter panel behaves exactly like a
non-dev browser: the localhost gate hides it unless the dev server
runs alongside.

  yarn desktop:dev    — serve dist/ in an Electron window (build first)
  yarn desktop:build  — per-OS installers via electron-builder (release/)

### `MIME`

Extension → Content-Type for every asset class dist/ emits.

### `safeJoin`

Resolves a request path inside dist/ — null when it escapes the root.

### `fallbackFor`

Picks the fallback document: /cms/* → cms/index.html, else index.html.

### `createWindow`

Opens the single app window on the internal server's URL.
