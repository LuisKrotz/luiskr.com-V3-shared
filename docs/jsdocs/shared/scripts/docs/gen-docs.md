# `shared\scripts\docs\gen-docs.mjs`

Generates docs/api/*.md from the JSDoc across the workspace —

| | |
|---|---|
| **Source** | `src/shared\scripts\docs\gen-docs.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `walk`

Recursively collects .ts/.tsx/.js/.mjs sources under dir (skipping .d.ts).

### `jsdocBlocks`

Extracts every `/** … *\/` block with the line that follows it.

### `docLines`

Cleans a JSDoc body into lines of text without the leading `*`.

### `parseDoc`

Splits a doc body into { desc, tags } where tags = [{tag, text}].

### `memberName`

Guesses a member name from the line after the JSDoc block.

### `short`

First sentence of a doc description, trimmed to ~110 chars.

### `esc`

Escapes angle brackets so <element-name> isn't swallowed as raw HTML.

### `areaMeta`

Longest-prefix AREA_META lookup so deeper module dirs inherit their parent's UX note.
