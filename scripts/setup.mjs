#!/usr/bin/env node
/**
 * Guided dev-environment installer — `yarn setup`. Cross-platform
 * (Node-only, no shell): verifies Node/Yarn/Git, installs dependencies,
 * wires git hooks, probes the media-convert toolchain, and prints the
 * exact next steps. Read-only checks never mutate; installs are the
 * standard yarn + hook-copy operations.
 *
 *   yarn setup            full guided setup
 *   yarn setup --check    report only — no install/write side effects
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const here = path.dirname(url.fileURLToPath(import.meta.url))
const root = path.resolve(here, '..', '..')
const checkOnly = process.argv.includes('--check')

const ok = (label) => console.log(`  ✓ ${label}`)
const warn = (label) => console.log(`  ⚠ ${label}`)
const fail = (label) => console.log(`  ✗ ${label}`)

/** Runs a command quietly; returns its trimmed stdout or null on failure. */
const probe = (cmd, args) => {
  const r = spawnSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  return r.status === 0 ? (r.stdout || '').trim() : null
}

// ── 1. Prerequisites ────────────────────────────────────────────────────
console.log('\n[1/4] Prerequisites')

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const minNode = Number((pkg.engines?.node || '0').match(/\d+/)?.[0] || 0)
const nodeMajor = Number(process.versions.node.split('.')[0])

if (nodeMajor >= Number(minNode)) ok(`node ${process.versions.node} (requires ${pkg.engines.node})`)
else fail(`node ${process.versions.node} — project requires ${pkg.engines.node}`)

const yarn = probe('yarn', ['--version'])
if (yarn) ok(`yarn ${yarn}`)
else fail('yarn not found — install it: https://yarnpkg.com (yarn is the only package manager)')

const git = probe('git', ['--version'])
if (git) ok(git)
else fail('git not found — required for hooks and submodule work')

if (!yarn || !git) {
  console.log('\nSetup cannot continue without yarn and git.\n')
  process.exit(1)
}

// ── 2. Dependencies ─────────────────────────────────────────────────────
console.log('\n[2/4] Dependencies')

if (checkOnly) {
  ok(`skipped yarn install (--check)`)
} else {
  const r = spawnSync('yarn', ['install', '--non-interactive'], { cwd: root, stdio: 'inherit' })
  if (r.status === 0) ok('yarn install')
  else {
    fail('yarn install failed')
    process.exit(1)
  }
}

// ── 3. Git hooks ────────────────────────────────────────────────────────
console.log('\n[3/4] Git hooks')

if (checkOnly) {
  ok(`skipped hooks install (--check)`)
} else {
  const r = spawnSync('node', [path.join(here, 'install-hooks.mjs')], {
    cwd: root,
    stdio: 'inherit',
  })
  if (r.status === 0) ok('hooks installed')
  else warn('hook install failed — run `yarn hooks:install` manually')
}

// ── 4. Media toolchain ──────────────────────────────────────────────────
console.log('\n[4/4] Media-convert toolchain (optional — CMS batch converter)')

const { toolsReport } = await import('./media-convert/install.js')
const report = await toolsReport()

ok(`ffmpeg: ${report.tools.ffmpeg ? 'found' : 'missing'}`)
ok(`ffprobe: ${report.tools.ffprobe ? 'found' : 'missing'}`)
ok(`imagemagick: ${report.tools.magick || report.tools.convert ? 'found' : 'missing (optional)'}`)
ok(`mozjpeg cjpeg: ${report.tools.cjpeg ? 'found' : 'missing (optional)'}`)

if (report.plan.manual.length) {
  console.log('')
  for (const cmd of report.plan.manual) console.log(`    → ${cmd}`)
  console.log('')
  warn('install the tools above (or use the CMS converter panel on localhost)')
} else {
  ok('all conversion tools present')
}

// ── Done ────────────────────────────────────────────────────────────────
console.log('\nSetup complete. Next steps:')
console.log('  yarn dev        — start the site + CMS on localhost (real Firebase)')
console.log('  yarn dev:cms    — start with the explicit CMS mock (no production data)')
console.log('  yarn verify     — full gate: format/type/lint/test/coverage/security')
console.log('  yarn build      — production build (12 browser targets)\n')
