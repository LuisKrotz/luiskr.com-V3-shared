/**
 * Guided tool installation for the media-convert pipeline — per-platform
 * package-manager detection, install plans, and the actual `spawn` run for
 * managers that can execute without an interactive privilege prompt.
 *
 * The GUI surfaces `plan()` output as a setup card; managers that need a
 * root shell (apt/dnf/zypper…) mark the plan needsRoot so the API returns
 * copyable commands instead of spawning into a tty-less sudo prompt.
 */
import { spawn } from 'node:child_process'
import { detectTools, hasTool } from './pipeline.js'

/** Package managers probed per platform, in preference order. */
const MANAGER_CANDIDATES = {
  darwin: ['brew'],
  win32: ['winget', 'choco'],
  linux: ['apt-get', 'dnf', 'pacman', 'zypper', 'apk'],
}

/**
 * Tool → package names per manager. `ffmpeg` bundles `ffprobe` on every
 * platform; ImageMagick ships as `magick`/`convert`; `cjpeg` comes from
 * mozjpeg (brew/pacman) or libjpeg-turbo's utils package elsewhere.
 */
const PKGS = {
  brew: { ffmpeg: 'ffmpeg', imagemagick: 'imagemagick', cjpeg: 'mozjpeg' },
  apt: { ffmpeg: 'ffmpeg', imagemagick: 'imagemagick', cjpeg: 'libjpeg-turbo-progs' },
  dnf: { ffmpeg: 'ffmpeg', imagemagick: 'ImageMagick', cjpeg: 'libjpeg-turbo-utils' },
  pacman: { ffmpeg: 'ffmpeg', imagemagick: 'imagemagick', cjpeg: 'libjpeg-turbo' },
  zypper: { ffmpeg: 'ffmpeg', imagemagick: 'ImageMagick', cjpeg: 'libjpeg-turbo-utils' },
  apk: { ffmpeg: 'ffmpeg', imagemagick: 'imagemagick', cjpeg: 'libjpeg-turbo-utils' },
  choco: { ffmpeg: 'ffmpeg', imagemagick: 'imagemagick' },
}

/** Maps the raw tool map onto the three installable groups. */
const needs = (t) => ({
  ffmpeg: !t.ffmpeg || !t.ffprobe,
  imagemagick: !t.magick && !t.convert,
  cjpeg: !t.cjpeg,
})

/**
 * First package manager found on PATH for this platform, or null.
 * @returns {Promise<string|null>} e.g. 'brew', 'winget', 'apt-get'.
 */
export async function detectManager() {
  const candidates = MANAGER_CANDIDATES[process.platform] || MANAGER_CANDIDATES.linux

  // Package managers take --version (apt-get -version exits 100).
  for (const m of candidates) if (await hasTool(m, ['--version'])) return m

  return null
}

/** Shell-quoted display string for a [cmd, args] pair. */
const display = (cmd, args) => [cmd, ...args].join(' ')

/**
 * Builds the install plan for the current platform: which manager, which
 * package commands, whether they can run without a root shell.
 * @param t Tool map from detectTools().
 * @param manager Detected package manager name (or null).
 * @returns {{manager:string|null, needsRoot:boolean, commands:Array, manual:string[]}}
 */
export function plan(t, manager) {
  const missing = needs(t)

  if (!missing.ffmpeg && !missing.imagemagick && !missing.cjpeg) {
    return { manager, needsRoot: false, commands: [], manual: [] }
  }

  if (!manager) {
    return {
      manager,
      needsRoot: false,
      commands: [],
      manual: [
        process.platform === 'darwin'
          ? 'Install Homebrew (https://brew.sh), then: brew install ffmpeg imagemagick mozjpeg'
          : 'Install ffmpeg (and optionally ImageMagick) with your system package manager',
      ],
    }
  }

  // winget/choco and brew run without a root shell — winget elevates via
  // its own UAC when the package requires it. Linux managers need sudo,
  // which cannot take a password without a tty → manual commands.
  switch (manager) {
    case 'brew': {
      const p = PKGS.brew
      const pkgs = [
        missing.ffmpeg && p.ffmpeg,
        missing.imagemagick && p.imagemagick,
        missing.cjpeg && p.cjpeg,
      ].filter(Boolean)
      return {
        manager,
        needsRoot: false,
        commands: [['brew', ['install', ...pkgs]]],
        manual: [display('brew', ['install', ...pkgs])],
      }
    }
    case 'winget': {
      const args = ['install', '-e', '--accept-package-agreements', '--accept-source-agreements']
      const commands = []

      if (missing.ffmpeg) commands.push(['winget', [...args, '--id', 'Gyan.FFmpeg']])
      if (missing.imagemagick)
        commands.push(['winget', [...args, '--id', 'ImageMagick.ImageMagick']])

      return {
        manager,
        needsRoot: false,
        commands,
        manual: commands.map(([c, a]) => display(c, a)),
      }
    }
    case 'choco': {
      const p = PKGS.choco
      const pkgs = [missing.ffmpeg && p.ffmpeg, missing.imagemagick && p.imagemagick].filter(
        Boolean
      )

      return {
        manager,
        needsRoot: false,
        commands: pkgs.length ? [['choco', ['install', '-y', ...pkgs]]] : [],
        manual: pkgs.length ? [display('choco', ['install', '-y', ...pkgs])] : [],
      }
    }
    default: {
      // apt-get / dnf / pacman / zypper / apk — sudo without a tty can't
      // take a password, so these are guidance strings only.
      const key = manager === 'apt-get' ? 'apt' : manager
      const p = PKGS[key] || PKGS.apt
      const pkgs = [
        missing.ffmpeg && p.ffmpeg,
        missing.imagemagick && p.imagemagick,
        missing.cjpeg && p.cjpeg,
      ].filter(Boolean)
      // Each manager has its own verb/flags — no common 'install -y' form.
      const sudo = {
        'apt-get': ['sudo', 'apt-get', 'install', '-y', ...pkgs],
        dnf: ['sudo', 'dnf', 'install', '-y', ...pkgs],
        pacman: ['sudo', 'pacman', '-S', '--noconfirm', '--needed', ...pkgs],
        zypper: ['sudo', 'zypper', '--non-interactive', 'install', ...pkgs],
        apk: ['sudo', 'apk', 'add', ...pkgs],
      }[manager] || ['sudo', manager, 'install', ...pkgs]

      return { manager, needsRoot: true, commands: [], manual: [sudo.join(' ')] }
    }
  }
}

/**
 * Full tools status for the GUI: platform, per-tool presence, detected
 * package manager, and the install plan for missing tools.
 * @param {boolean} [force] Re-probe instead of using the cached map.
 * @returns {Promise<object>} serializable status report.
 */
export async function toolsReport(force = false) {
  const t = await detectTools(force)
  const manager = await detectManager()

  return {
    platform: process.platform,
    tools: t,
    missing: needs(t),
    manager,
    plan: plan(t, manager),
  }
}

/**
 * Runs every command in the install plan sequentially, collecting output
 * for the GUI log. Skips needsRoot plans — those are manual-only.
 * @returns {Promise<{ok:boolean, log:string, report:object}>}
 */
export async function installTools() {
  const report = await toolsReport()

  if (report.plan.needsRoot || !report.plan.commands.length) {
    return { ok: false, log: '', report }
  }

  let log = ''
  let ok = true

  for (const [cmd, args] of report.plan.commands) {
    log += `$ ${display(cmd, args)}\n`

    // Sequential by design: package managers cannot run two transactions
    // concurrently.
    const code = await new Promise((resolve) => {
      const p = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] })
      p.stdout.on('data', (d) => (log += d))
      p.stderr.on('data', (d) => (log += d))
      p.on('error', (e) => {
        log += `${e.message}\n`
        resolve(1)
      })
      p.on('close', resolve)
    })

    if (code !== 0) {
      ok = false
      break
    }
  }

  const after = await toolsReport(true)

  return { ok: ok && !after.missing.ffmpeg, log, report: after }
}
