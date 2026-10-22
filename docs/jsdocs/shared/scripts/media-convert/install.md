# `shared\scripts\media-convert\install.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media-convert\install.js`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Guided tool installation for the media-convert pipeline — per-platform
package-manager detection, install plans, and the actual `spawn` run for
managers that can execute without an interactive privilege prompt.

The GUI surfaces `plan()` output as a setup card; managers that need a
root shell (apt/dnf/zypper…) mark the plan needsRoot so the API returns
copyable commands instead of spawning into a tty-less sudo prompt.

### `MANAGER_CANDIDATES`

Package managers probed per platform, in preference order.

### `PKGS`

Tool → package names per manager. `ffmpeg` bundles `ffprobe` on every
platform; ImageMagick ships as `magick`/`convert`; `cjpeg` comes from
mozjpeg (brew/pacman) or libjpeg-turbo's utils package elsewhere.

### `WIN_CJPEG_HINT`

Windows cjpeg guidance — no winget/choco mozjpeg package exists, so the
npm binary wrapper is the manager-free path (it drops a prebuilt
cjpeg.exe into npm's global bin dir, which is already on PATH for any
Node user). vcpkg (`vcpkg install mozjpeg`) or the GitHub release zip
are the alternatives.

### `needs`

Maps the raw tool map onto the three installable groups.

### (module scope)

First package manager found on PATH for this platform, or null.

- `@returns` {Promise<string|null>} e.g. 'brew', 'winget', 'apt-get'.

### `display`

Shell-quoted display string for a [cmd, args] pair.

### `plan`

Builds the install plan for the current platform: which manager, which
package commands, whether they can run without a root shell.

- `@param` t Tool map from detectTools().
- `@param` manager Detected package manager name (or null).
- `@returns` {{manager:string|null, needsRoot:boolean, commands:Array, manual:string[]}}

### (module scope)

Full tools status for the GUI: platform, per-tool presence, detected
package manager, and the install plan for missing tools.

- `@param` {boolean} [force] Re-probe instead of using the cached map.
- `@returns` {Promise<object>} serializable status report.

### (module scope)

Runs every command in the install plan sequentially, collecting output
for the GUI log. Skips needsRoot plans — those are manual-only.

- `@returns` {Promise<{ok:boolean, log:string, report:object}>}
