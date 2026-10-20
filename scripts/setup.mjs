#!/usr/bin/env node
/**
 * Guided dev-environment installer — `yarn setup`. Cross-platform
 * (Node-only, no shell): verifies Node/Yarn/Git, initialises git
 * submodules, installs dependencies, wires git hooks, installs the CLI
 * toolchain (firebase-tools, Google Cloud SDK) and the media-convert
 * toolchain (ffmpeg/ImageMagick/mozjpeg), then prints the exact next
 * steps. Read-only checks never mutate; installs are the standard yarn +
 * package-manager operations for the detected platform.
 *
 *   yarn setup            full guided setup — installs everything missing
 *   yarn setup --check    report only — no install/write side effects
 */
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const here = path.dirname(url.fileURLToPath(import.meta.url))
const root = path.resolve(here, '..', '..')
const checkOnly = process.argv.includes('--check')

const ok = (label) => console.log(`  ✓ ${label}`)
const warn = (label) => console.log(`  ⚠ ${label}`)
const fail = (label) => console.log(`  ✗ ${label}`)

// Windows resolves yarn/firebase-style CLIs as .cmd shims which libuv
// cannot exec directly — a cmd.exe shell is required there only.
const SHELL = process.platform === 'win32'

/** Runs a command quietly; returns its trimmed stdout or null on failure. */
const probe = (cmd, args) => {
  const r = spawnSync(cmd, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    shell: SHELL,
  })
  return r.status === 0 ? (r.stdout || '').trim() : null
}

/** Runs one command inheriting stdio; resolves to its exit code. */
const runStep = (cmd, args, cwd = root) =>
  new Promise((resolve) => {
    const p = spawn(cmd, args, { cwd, stdio: 'inherit', shell: SHELL })
    p.on('error', () => resolve(1))
    p.on('close', resolve)
  })

/** True when `sudo` can run non-interactively (cached credentials or NOPASSWD). */
const passwordlessSudo = () => probe('sudo', ['-n', 'true']) !== null

/**
 * Runs a `sudo …` manual command when the caller holds passwordless sudo;
 * returns true when the command actually ran. Otherwise returns false so
 * the caller can print the command for a manual root shell.
 */
const runSudoIfAble = (sudoCmd) => {
  if (process.platform === 'win32' || !passwordlessSudo()) return false

  const r = spawnSync('sudo', ['-n', 'sh', '-c', sudoCmd.replace(/^sudo\s+/, '')], {
    stdio: 'inherit',
  })
  return r.status === 0
}

// ── 1. Prerequisites ────────────────────────────────────────────────────
console.log(`\n[1/6] Prerequisites (${process.platform}/${process.arch})`)

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const minNode = Number((pkg.engines?.node || '0').match(/\d+/)?.[0] || 0)
const nodeMajor = Number(process.versions.node.split('.')[0])

if (nodeMajor >= Number(minNode)) ok(`node ${process.versions.node} (requires ${pkg.engines.node})`)
else fail(`node ${process.versions.node} — project requires ${pkg.engines.node}`)

const yarn = probe('yarn', ['--version'])
if (yarn) ok(`yarn ${yarn}`)
else fail('yarn not found — `corepack enable && corepack prepare yarn@1.22.22 --activate`')

const git = probe('git', ['--version'])
if (git) ok(git)
else fail('git not found — required for hooks and submodule work')

if (!yarn || !git) {
  console.log('\nSetup cannot continue without yarn and git.\n')
  process.exit(1)
}

// ── 2. Git submodules ───────────────────────────────────────────────────
console.log('\n[2/6] Git submodules')

const shallowStatus = spawnSync('git', ['submodule', 'status'], { cwd: root, encoding: 'utf8' })
const uninit = (shallowStatus.stdout || '').split('\n').some((l) => l.startsWith('-'))

if (!uninit) {
  ok('all submodules initialised')
} else if (checkOnly) {
  warn('uninitialised submodules — run `git submodule update --init --recursive`')
} else {
  const r = await runStep('git', ['submodule', 'update', '--init', '--recursive'])
  if (r === 0) ok('submodules initialised')
  else warn('submodule init failed — run `git submodule update --init --recursive` manually')
}

// ── 3. Dependencies ─────────────────────────────────────────────────────
console.log('\n[3/6] Dependencies')

if (checkOnly) {
  ok('skipped yarn install (--check)')
} else {
  const r = await runStep('yarn', ['install', '--non-interactive'])
  if (r === 0) ok('yarn install')
  else {
    fail('yarn install failed')
    process.exit(1)
  }
}

// ── 4. Git hooks ────────────────────────────────────────────────────────
console.log('\n[4/6] Git hooks')

if (checkOnly) {
  ok('skipped hooks install (--check)')
} else {
  const r = await runStep('node', [path.join(here, 'install-hooks.mjs')])
  if (r === 0) ok('hooks installed')
  else warn('hook install failed — run `yarn hooks:install` manually')
}

// ── 5. CLI toolchain ────────────────────────────────────────────────────
console.log('\n[5/6] CLI toolchain (firebase-tools · Google Cloud SDK · rust)')

/**
 * Per-package-manager install command for the Google Cloud SDK — brew
 * ships it as a cask, winget/choco carry first-party IDs, and linux
 * distros need the google apt repo or snap (multi-step → manual).
 */
const CLOUD_SDK_INSTALL = {
  brew: { cmd: 'brew', args: ['install', '--cask', 'google-cloud-sdk'] },
  winget: {
    cmd: 'winget',
    args: [
      'install',
      '-e',
      '--id',
      'Google.CloudSDK',
      '--accept-package-agreements',
      '--accept-source-agreements',
    ],
  },
  choco: { cmd: 'choco', args: ['install', '-y', 'gcloudsdk'] },
}

const { detectManager, installTools, toolsReport } = await import('./media-convert/install.js')
const manager = await detectManager()

// firebase-tools — global yarn package, installs without a root shell on
// every platform; powers `yarn deploy` and the RTDB media scripts.
const firebase = probe('firebase', ['--version'])

if (firebase) {
  ok(`firebase-tools ${firebase.match(/\d[\d.]*/)?.[0] || ''}`)
} else if (checkOnly) {
  warn('firebase not found — `yarn global add firebase-tools`')
} else {
  const r = await runStep('yarn', ['global', 'add', 'firebase-tools'])
  if (r === 0 && probe('firebase', ['--version'])) ok('firebase-tools installed (yarn global)')
  else
    warn(
      'firebase-tools install failed — run `yarn global add firebase-tools`, then `firebase login`'
    )
}

// gcloud + gsutil — used by shared/scripts/media/* to reach the CDN bucket
// and for `gcloud auth application-default login`.
const gcloud = probe('gcloud', ['--version'])

if (gcloud) {
  ok('google cloud sdk (gcloud + gsutil)')
} else if (checkOnly) {
  warn('gcloud/gsutil not found — needed by the media upload/validate scripts')
} else {
  const spec = CLOUD_SDK_INSTALL[manager]

  if (spec) {
    const r = await runStep(spec.cmd, spec.args)
    if (r === 0) ok('google cloud sdk installed')
    else warn(`cloud sdk install failed — run \`${spec.cmd} ${spec.args.join(' ')}\` manually`)
  } else if (
    process.platform === 'linux' &&
    probe('snap', ['--version']) &&
    runSudoIfAble('sudo snap install google-cloud-cli --classic')
  ) {
    ok('google cloud sdk installed (snap)')
  } else {
    warn('gcloud/gsutil not installed — linux: https://cloud.google.com/sdk/docs/install')
  }
}

// Rust toolchain — only needed to REBUILD the wasm crates under rust/*/;
// every crate ships a prebuilt pkg/ artifact committed to the repo.
const cargo = probe('cargo', ['--version'])
const wasm32 = probe('rustup', ['target', 'list', '--installed'])?.includes(
  'wasm32-unknown-unknown'
)
const wasmPack = probe('wasm-pack', ['--version'])

if (cargo && wasm32 && wasmPack) {
  ok('rust toolchain (cargo + wasm32 target + wasm-pack)')
} else if (cargo || wasmPack) {
  warn(
    'partial rust toolchain — rebuild crates needs: rustup target add wasm32-unknown-unknown && cargo install wasm-pack'
  )
} else {
  warn(
    'rust toolchain absent (optional — crates ship prebuilt wasm; install rustup + wasm-pack to rebuild)'
  )
}

// ── 6. Media toolchain ──────────────────────────────────────────────────
console.log('\n[6/6] Media-convert toolchain (optional — CMS batch converter)')

const report = await toolsReport()

ok(`ffmpeg: ${report.tools.ffmpeg ? 'found' : 'missing'}`)
ok(`ffprobe: ${report.tools.ffprobe ? 'found' : 'missing'}`)
ok(`imagemagick: ${report.tools.magick || report.tools.convert ? 'found' : 'missing (optional)'}`)
ok(`mozjpeg cjpeg: ${report.tools.cjpeg ? 'found' : 'missing (optional)'}`)

if (checkOnly || !report.plan.manual.length) {
  if (report.plan.manual.length) {
    for (const cmd of report.plan.manual) console.log(`    → ${cmd}`)
    warn('install the tools above (or use the CMS converter panel on localhost)')
  } else {
    ok('all conversion tools present')
  }
} else {
  // brew/winget/choco plans run without a root shell; linux sudo plans run
  // only when sudo is non-interactive, else print for a manual shell.
  let installed = false

  if (report.plan.commands.length) {
    const r = await installTools()
    installed = r.ok
  } else if (report.plan.needsRoot) {
    installed = report.plan.manual.every(runSudoIfAble)
  }

  if (installed) {
    ok('media toolchain installed')
  } else {
    for (const cmd of report.plan.manual) console.log(`    → ${cmd}`)
    warn('run the commands above in a root shell (sudo needs a password)')
  }
}

// ── Done ────────────────────────────────────────────────────────────────
console.log('\nSetup complete. Next steps:')
console.log('  yarn dev        — start the site + CMS on localhost (real Firebase)')
console.log('  yarn dev:cms    — start with the explicit CMS mock (no production data)')
console.log('  yarn verify     — full gate: format/type/lint/test/coverage/security')
console.log('  yarn build      — production build (12 browser targets)\n')
