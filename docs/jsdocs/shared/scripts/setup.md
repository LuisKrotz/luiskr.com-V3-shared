# `shared/scripts/setup.mjs`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/setup.mjs`                                            |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### (module scope)

Guided dev-environment installer — `yarn setup`. Cross-platform
(Node-only, no shell): verifies Node/Yarn/Git, initialises git
submodules, installs dependencies, wires git hooks, installs the CLI
toolchain (firebase-tools, Google Cloud SDK) and the media-convert
toolchain (ffmpeg/ImageMagick/mozjpeg), then prints the exact next
steps. Read-only checks never mutate; installs are the standard yarn +
package-manager operations for the detected platform.

yarn setup full guided setup — installs everything missing
yarn setup --check report only — no install/write side effects

### `probe`

Runs a command quietly; returns its trimmed stdout or null on failure.

### `runStep`

Runs one command inheriting stdio; resolves to its exit code.

### `passwordlessSudo`

True when `sudo` can run non-interactively (cached credentials or NOPASSWD).

### `runSudoIfAble`

Runs a `sudo …` manual command when the caller holds passwordless sudo;
returns true when the command actually ran. Otherwise returns false so
the caller can print the command for a manual root shell.

### `CLOUD_SDK_INSTALL`

Per-package-manager install command for the Google Cloud SDK — brew
ships it as a cask, winget/choco carry first-party IDs, and linux
distros need the google apt repo or snap (multi-step → manual).
