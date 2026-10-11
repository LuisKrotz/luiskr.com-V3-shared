#!/usr/bin/env node
/**
 * Cross-platform port of install-hooks.sh — copies the versioned hooks
 * from shared/scripts/git-hooks/ into the repo's real hooks directory AND
 * into every initialised submodule's hooks dir. The same hook files serve
 * both contexts: they detect `--show-superproject-working-tree` and gate
 * only their own module when invoked inside one.
 *
 * Uses `git rev-parse --git-dir` so worktrees and submodule checkouts
 * resolve their true hooks dir (a `.git` file, not a directory).
 *
 * Run once after cloning (or after pulling when hooks change):
 *   yarn hooks:install
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const here = path.dirname(url.fileURLToPath(import.meta.url))
const root = path.resolve(here, '..', '..')
const srcDir = path.join(root, 'shared', 'scripts', 'git-hooks')

/** Copies every versioned hook into one repo's real hooks directory. */
const installInto = (worktree) => {
  const gitDir = execFileSync('git', ['rev-parse', '--git-dir'], {
    cwd: worktree,
    encoding: 'utf8',
  }).trim()

  // --git-dir may be relative to the worktree (`.git`) — resolve it.
  const hooksDir = path.join(
    path.isAbsolute(gitDir) ? gitDir : path.join(worktree, gitDir),
    'hooks'
  )

  for (const name of fs.readdirSync(srcDir)) {
    const from = path.join(srcDir, name)
    if (!fs.statSync(from).isFile()) continue

    const to = path.join(hooksDir, name)
    fs.copyFileSync(from, to)
    // chmod is a no-op on Windows (git-bash still executes the hook files).
    try {
      fs.chmodSync(to, 0o755)
    } catch {
      /* platform without POSIX modes — hook still runs via git's shim */
    }
    console.log(`installed ${path.relative(root, to)}`)
  }
}

installInto(root)

// Propagate to every initialised submodule — their hooks run the module's
// own gates on commit/push, which is what lets the superproject trust
// stored results instead of re-running suites.
try {
  const subs = execFileSync('git', ['config', '--file', '.gitmodules', '--get-regexp', 'path'], {
    cwd: root,
    encoding: 'utf8',
  })

  for (const line of subs.trim().split('\n')) {
    const sub = path.join(root, line.split(/\s+/)[1])

    if (!fs.existsSync(path.join(sub, '.git'))) continue

    try {
      installInto(sub)
    } catch {
      console.warn(`skipped ${path.relative(root, sub)} (no usable git dir)`)
    }
  }
} catch {
  /* no .gitmodules — standalone module checkout, nothing to propagate */
}
