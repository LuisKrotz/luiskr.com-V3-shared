# `shared/scripts/build/deploy-info.mjs`

Assembles `dist/deploy-info/` — the "last deploy" bundle the CMS

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/build/deploy-info.mjs`                                |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### `COVERAGE_MODULES`

Module workspaces that publish a coverage report — mirrors the
run-modules.mjs runner order.
