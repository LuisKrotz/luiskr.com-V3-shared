# `core/locale/fallback.ts`

Build-time English translation snapshot. The Vite plugin

| | |
|---|---|
| **Source** | `src/core/locale/fallback.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Per-locale boot-loader copy inlined by the Vite plugin.

### `lines`

Legacy terminal-style spec lines (English tech log).

### `title`

Loader headline (brand mark, same across locales).

### `stages`

Localized boot-stage messages shown under the percent.

### (module scope)

Shape of the translations/<locale> DB node inlined by the Vite plugin.

### `loaderLocales`

locale → loader copy — inlined for ALL locales so the boot loader
 localizes before the per-locale i18n chunks resolve.

### `FALLBACK`

English UI copy snapshotted from database.json at build time.
Components read live translations from the store first and fall back to
this snapshot, so no user-visible string lives in JavaScript source.

### `FALLBACK_APP`

The APP subtree of the fallback snapshot — app-shell copy (actions,
carousel labels, loader lines) consumed before Firebase resolves.

### `FALLBACK_LOADERS`

Boot-loader copy keyed by locale — every language is inlined so the
intro loader can localize its stage messages at boot time, before the
async per-locale i18n chunks land.

### `FALLBACK_COMPONENTS`

The components subtree — per-component copy fallbacks keyed by component
token (e.g. aboutSection, siteToast).

### `FALLBACK_PAGES`

The pages subtree — per-page fallback nodes (home, about, legal…).
