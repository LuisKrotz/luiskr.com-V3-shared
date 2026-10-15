#!/usr/bin/env node
/**
 * @file stamp-content-signal.mjs
 * @description Firebase `predeploy` step — stamps the IETF-draft
 * `Content-Signal` directive into every `dist` robots.txt before upload.
 * The directive is intentionally kept out of source robots.txt files:
 * Lighthouse's robots-txt audit flags it as an unknown directive and the
 * SEO gate requires 100%. Stamping at deploy time keeps the local/preview
 * artifact spec-clean while the live site still declares the AI-usage
 * preference. Idempotent — repeated deploys leave files untouched.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Repo root — this file sits at shared/scripts/build/. */
const DIST = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)), 'dist')

/** Directive line inserted directly under `User-agent: *` per the spec. */
const DIRECTIVE = 'Content-Signal: ai-train=no, search=yes, ai-input=no'

/**
 * Recursively collects every robots.txt under a directory.
 * @param {string} dir directory to walk
 * @returns {string[]} absolute robots.txt paths
 */
const collectRobots = (dir) =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap((e) =>
          e.isDirectory()
            ? collectRobots(path.join(dir, e.name))
            : e.name === 'robots.txt'
              ? [path.join(dir, e.name)]
              : []
        )
    : []

/** Count of files stamped this run — logged for deploy diagnostics. */
/** `--revert` (postdeploy) removes the directive so the tree stays clean. */
const REVERT = process.argv.includes('--revert')

/** Count of files stamped or reverted this run — logged for diagnostics. */
let stamped = 0

for (const file of collectRobots(DIST)) {
  const text = fs.readFileSync(file, 'utf8')

  if (REVERT ? !text.includes(DIRECTIVE) : text.includes(DIRECTIVE)) continue

  const next = REVERT
    ? text.replace(`\n${DIRECTIVE}`, '')
    : text.replace(/^User-agent: \*$/m, `User-agent: *\n${DIRECTIVE}`)

  fs.writeFileSync(file, next, 'utf8')
  stamped += 1
}

console.log(`[content-signal] ${REVERT ? 'reverted' : 'stamped'} ${stamped} robots.txt file(s)`)
