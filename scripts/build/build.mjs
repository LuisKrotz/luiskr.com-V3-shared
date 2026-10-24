#!/usr/bin/env node
/**
 * @file build.mjs
 * @description Production build orchestrator. The package lifecycle runs the
 * complete verification/coverage gate in `prebuild`; this script then emits
 * all browser targets, packages deploy diagnostics, and generates JSDoc.
 * Passing `--verify-lighthouse` runs LHCI only after those build artifacts are
 * complete, then re-packages deploy diagnostics with the fresh audit output.
 */

import { execFileSync, execFile } from 'node:child_process'

const VERIFY_LIGHTHOUSE_FLAG = '--verify-lighthouse'
const verifyLighthouse = process.argv.includes(VERIFY_LIGHTHOUSE_FLAG)
const inherited = { cwd: process.cwd(), stdio: 'inherit' }

/**
 * Runs a local Node build script with inherited terminal output.
 * @param {string} script script path relative to the repository root
 * @param {string[]} args optional script arguments
 * @returns {Buffer | string | null} child-process result
 */
const runNode = (script, args = []) => execFileSync(process.execPath, [script, ...args], inherited)

/**
 * Runs a Yarn binary/script without passing through a shell.
 * @param {string[]} args Yarn command arguments
 * @returns {Buffer | string | null} child-process result
 */
const runYarn = (args) => execFileSync('yarn', args, inherited)

/**
 * Async variant of runNode — lets independent post-build steps overlap.
 * @param {string[]} argv executable + arguments
 * @returns {Promise<void>} resolves on exit 0
 */
const runAsync = (argv) =>
  new Promise((resolve, reject) =>
    execFile(argv[0], argv.slice(1), inherited, (err) => (err ? reject(err) : resolve()))
  )

runNode('shared/scripts/build/build-targets.mjs')

// deploy-info reads dist/reports, jsdocs scans sources — independent of
// each other, so they run concurrently.
await Promise.all([
  runAsync([process.execPath, 'shared/scripts/build/deploy-info.mjs']),
  runAsync(['yarn', 'docs:jsdocs']),
])

if (verifyLighthouse) {
  // Parallel collect across all routes × runs (lhci autorun is serial);
  // lhci assert then applies the configured gates to the fresh LHRs.
  runNode('shared/scripts/test/lighthouse-parallel.mjs')
  runYarn(['lhci', 'assert'])
  runNode('shared/scripts/build/deploy-info.mjs')
}
