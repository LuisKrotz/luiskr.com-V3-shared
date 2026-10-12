# `shared/scripts/docs/sassdoc-vars.mjs`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/docs/sassdoc-vars.mjs`                                |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### (module scope)

sassdoc-vars.mjs — inserts `///` sassdoc comments above every `$var:`
declaration in a Sass variables file. Trailing `// note` comments are
folded into the doc line; the description falls back to a per-prefix
template derived from the token name.

Usage: node scripts/docs/sassdoc-vars.mjs <file.scss>
Idempotent: vars already preceded by `///` are skipped.

### `describe`

Per-prefix description templates — keep the why, not just the what.
