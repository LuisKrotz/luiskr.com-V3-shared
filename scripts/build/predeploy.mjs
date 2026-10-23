#!/usr/bin/env node
/**
 * @file predeploy.mjs
 * @description Firebase Hosting predeploy chain — the quality gate that a
 * `firebase deploy` cannot pass without. Order matters:
 *
 *   1. stamp-content-signal   — stamps robots.txt variants for upload.
 *   2. lhci autorun           — builds `vite preview`, audits every route in
 *      lighthouserc.cjs, and FAILS THE DEPLOY when any assertion misses
 *      (perf ≥ 0.80, a11y/best-practices/seo = 1.0; image-delivery audits
 *      are warn-only by policy).
 *   3. deploy-info            — re-packages reports (now including the fresh
 *      Lighthouse summary) into dist/deploy-info/, so the shipped bundle —
 *      and the CMS "Build" tab — always carry this deploy's audit.
 */

import { execFileSync } from 'node:child_process'

const inherited = { cwd: process.cwd(), stdio: 'inherit' }

/**
 * Runs a local Node build script with inherited terminal output.
 * @param {string} script Script path relative to the repository root.
 * @param {string[]} args Optional script arguments.
 * @returns {Buffer | string | null} Child-process result.
 */
const runNode = (script, args = []) => execFileSync(process.execPath, [script, ...args], inherited)

/**
 * Runs a Yarn binary/script without passing through a shell.
 * @param {string[]} args Yarn command arguments.
 * @returns {Buffer | string | null} Child-process result.
 */
const runYarn = (args) => execFileSync('yarn', args, inherited)

runNode('shared/scripts/build/stamp-content-signal.mjs')
runYarn(['lhci', 'autorun'])
runNode('shared/scripts/build/deploy-info.mjs')
