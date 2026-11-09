# `shared\scripts\setup.mjs`

Guided dev-environment installer — `yarn setup`. Cross-platform

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\setup.mjs`                          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

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
