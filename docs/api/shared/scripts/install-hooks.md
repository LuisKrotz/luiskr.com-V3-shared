# `shared/scripts/install-hooks.mjs`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/install-hooks.mjs`                                    |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### (module scope)

Cross-platform port of install-hooks.sh — copies the versioned hooks
from shared/scripts/git-hooks/ into the repo's real hooks directory AND
into every initialised submodule's hooks dir. The same hook files serve
both contexts: they detect `--show-superproject-working-tree` and gate
only their own module when invoked inside one.

Uses `git rev-parse --git-dir` so worktrees and submodule checkouts
resolve their true hooks dir (a `.git` file, not a directory).

Run once after cloning (or after pulling when hooks change):
yarn hooks:install

### `installInto`

Copies every versioned hook into one repo's real hooks directory.
