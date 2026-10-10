#!/usr/bin/env node
/**
 * Cross-platform port of install-hooks.sh — copies the versioned hooks
 * from shared/scripts/git-hooks/ into the repo's real hooks directory.
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

const gitDir = execFileSync('git', ['rev-parse', '--git-dir'], {
  cwd: root,
  encoding: 'utf8',
}).trim()

// --git-dir may be relative to the repo root (`.git`) — resolve it.
const hooksDir = path.join(path.isAbsolute(gitDir) ? gitDir : path.join(root, gitDir), 'hooks')
const srcDir = path.join(root, 'shared', 'scripts', 'git-hooks')

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
