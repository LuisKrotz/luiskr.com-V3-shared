# `shared\scripts\media\a11y\translate.mjs`

Cloud Translation (v2 REST) layer for the a11y pipeline —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\translate.mjs`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `BATCH_Q`

v2 accepts up to 128 `q` segments per request.

### `MEMORY_PATH`

Persistent translation memory — survives runs; identical segments re-bill zero.

### `memory`

`${target}\n${text}` → translated text.

### `usage`

Characters billed this run — reported at the end.

### `loadMemory`

Loads the persisted translation memory (best-effort).

### `persistMemory`

Persists the memory — reports/ first, OS-temp mirror as backup.

### `callTranslate`

Translates one batch of strings for a single MT target.

- `@param` {string[]} texts Source strings (≤ BATCH_Q).
- `@param` {string} target Google target code.
- `@returns` {Promise<string[]>} Same-length translated array.

### (module scope)

Translates every segment for one MT target — memory-first, batching the
misses, memoizing the results back.

- `@param` {string[]} segments Source strings.
- `@param` {string} target Google target code ('en' short-circuits).
- `@returns` {Promise<string[]>} Same-length result array.

### (module scope)

Full locale routing — MT-target languages translate directly; dialect
locales first produce their base translation (shared with the base
locale's call — the memory makes the reuse free) then pass through the
corpus transform.

- `@param` {string[]} segments Source strings.
- `@param` {string} locale Site locale code (must exist in LOCALE_TRANSLATE).
- `@param` {Map<string, Map<string, string>>} dialectTables From buildDialectTables.
- `@returns` {Promise<string[]>} Localized strings.

### `OUTPUT_LOCALES`

The 16 routable locales in emission order — English first.
