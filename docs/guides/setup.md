# Setup & Platform Guide

One-command quick start (after cloning):

```bash
yarn setup   # guided installer — deps, hooks, toolchain check
yarn dev     # public site + CMS against real Firebase
```

For a report-only check of your environment:

```bash
yarn setup --check
```

---

## Required programs

- **Node.js** ≥ 24 (LTS recommended)
- **Yarn** 1.22.x classic (`yarn`)
- **Git** ≥ 2.34
- A **C++ toolchain** for native optional dependencies (`better-sqlite3`, `sharp`, `electron`, etc.)

Optional (for CMS media conversion):

- **ffmpeg** + **ffprobe**
- **ImageMagick** (`magick` on Windows; `convert` on macOS/Linux)
- **mozjpeg** / `cjpeg` (sharper JPEG re-encode)

`yarn setup` detects missing tools and prints the exact install command for your platform. The CMS media converter exposes the same detector at `/api/media-convert/tools` and can run the install for you when no `sudo` password is required.

---

## Per-platform installation

### Debian / Ubuntu / Mint / Pop!_OS

```bash
# Node 24 LTS from NodeSource (replace _lts with the latest major if needed)
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs

# Yarn classic
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn

# Build toolchain
sudo apt-get install -y build-essential python3 git

# Media toolchain (optional, used by CMS converter)
sudo apt-get install -y ffmpeg imagemagick libjpeg-turbo-progs

# Clone and run
git clone --recurse-submodules git@github.com:LuisKrotz/luiskr.com-V3.git
cd luiskr.com-V3
yarn setup
yarn dev
```

### Red Hat / Fedora / CentOS Stream / Alma / Rocky

```bash
# Node 24 LTS via Nodesource
curl -fsSL https://rpm.nodesource.com/setup_24.x | sudo bash -

# Yarn
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo

sudo dnf install -y nodejs yarn git gcc-c++ make python3

# Media toolchain (optional)
sudo dnf install -y ffmpeg ImageMagick libjpeg-turbo-utils

# Clone and run
git clone --recurse-submodules git@github.com:LuisKrotz/luiskr.com-V3.git
cd luiskr.com-V3
yarn setup
yarn dev
```

### macOS (Intel + Apple Silicon) with Homebrew

```bash
# Homebrew (skip if installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Core tools
brew install node@24 yarn git

# Media toolchain (optional)
brew install ffmpeg imagemagick mozjpeg

# Make the tools available on Apple Silicon Macs
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Clone and run
git clone --recurse-submodules git@github.com:LuisKrotz/luiskr.com-V3.git
cd luiskr.com-V3
yarn setup
yarn dev
```

> Apple Silicon note: `yarn setup` adds an `arm64` architecture flag for optional native packages when `process.arch === 'arm64'`, so Rosetta is not required for the dev toolchain. Electron's `electron-builder` produces both `arm64` and `x64` macOS archives.

### Windows (x64 + ARM64)

Run these in **PowerShell as Administrator**:

```powershell
# winget is available on Windows 10 20H2+ and Windows 11
winget install -e --id OpenJS.NodeJS.LTS
winget install -e --id Yarn.Yarn
winget install -e --id Git.Git

# Optional media toolchain (run in a new PowerShell window after the above)
winget install -e --id Gyan.FFmpeg
# ImageMagick on Windows exposes `magick`, not `convert`:
winget install -e --id ImageMagick.ImageMagick

# Clone and run (in a regular terminal, PowerShell or CMD)
git clone --recurse-submodules git@github.com:LuisKrotz/luiskr.com-V3.git
cd luiskr.com-V3
yarn setup
yarn dev
```

If `winget` is unavailable, use Chocolatey:

```powershell
# Install Chocolatey first (https://chocolatey.org/install)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

choco install -y nodejs-lts yarn git ffmpeg imagemagick
```

> Windows ARM64: the Node LTS installer from winget ships an arm64 binary on compatible devices. `yarn setup` sets `npm_config_arch=arm64` and `npm_config_target_arch=arm64` for native optional dependencies. Electron builder produces an `arm64` NSIS target when invoked on an ARM64 machine.

---

## Useful one-liners

| Task                           | Command                          |
| ------------------------------ | -------------------------------- |
| Setup / re-check               | `yarn setup`                     |
| Run public site + real CMS     | `yarn dev`                       |
| Run CMS with Firebase mock     | `yarn dev:cms`                   |
| Full verification gate         | `yarn verify`                    |
| Production build               | `yarn build`                     |
| Build with Lighthouse audit    | `yarn build --verify-lighthouse` |
| Open built site as desktop app | `yarn desktop:dev`               |
| Build desktop installers       | `yarn desktop:build`             |
| Open setup/run GUI             | `yarn setup:gui`                 |

---

## GUI setup & project launcher

A small Electron launcher is included in `desktop/launcher.mjs`. It provides buttons for the most common operations and streams their output into the window, so you do not need to remember the CLI commands.

```bash
yarn setup:gui
```

The launcher runs `yarn setup --check` on open, then lets you:

- **Run setup** — dependencies + hooks + toolchain
- **Run dev server** — public site + CMS
- **Run verify** — full quality gate
- **Run build** — production build
- **Open desktop preview** — `yarn desktop:dev`

The launcher re-uses the existing `desktop/main.mjs` Electron host but loads the launcher HTML instead of the built site.

---

## Troubleshooting

- **`yarn setup` says Node < 24**: install the LTS version linked above; do not use the system package if it is older.
- **`yarn` not found after install on macOS**: run `eval "$(/opt/homebrew/bin/brew shellenv)"` or restart the terminal.
- **`yarn install` fails on native modules**: ensure `build-essential` / Xcode CLI tools / Visual Studio Build Tools are installed.
- **CMS login loops**: make sure you open `http://localhost:5173/cms/` (with trailing slash) and allow popups / third-party cookies. `yarn dev` already routes `/cms/` to the CMS bundle.
- **`/api/media-convert/tools` reports missing tools**: run the copy/paste command printed by `yarn setup` for your OS, or use the install button in the CMS media converter panel.
- **Submodules look empty**: run `git submodule update --init --recursive`.
