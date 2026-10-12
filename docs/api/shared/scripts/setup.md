# `shared/scripts/setup.mjs`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/setup.mjs`                                            |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### (module scope)

Guided dev-environment installer — `yarn setup`. Cross-platform
(Node-only, no shell): verifies Node/Yarn/Git, installs dependencies,
wires git hooks, probes the media-convert toolchain, and prints the
exact next steps. Read-only checks never mutate; installs are the
standard yarn + hook-copy operations.

yarn setup full guided setup
yarn setup --check report only — no install/write side effects

### `probe`

Runs a command quietly; returns its trimmed stdout or null on failure.
