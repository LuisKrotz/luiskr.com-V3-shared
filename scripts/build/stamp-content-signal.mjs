#!/usr/bin/env node
/**
 * @file stamp-content-signal.mjs
 * @description Firebase `predeploy` step — stamps the AI-usage declaration
 * into every `dist` robots.txt before upload.
 *
 * The declaration lives at deploy time, not in source: the live site
 * explicitly ALLOWS AI training, search and agent input — the HTTP
 * `Content-Signal` header in firebase.json carries the draft-signal
 * `ai-train=yes, search=yes, ai-input=yes`, and the build emits a
 * full-content replica surface under `/llm/` (generate-llm-pages.mjs)
 * plus `<route>.md`/`.json` siblings so agents can consume every page
 * without executing the SPA.
 *
 * The stamp is a spec-safe comment block (robots.txt has no allow
 * directive — absence of Disallow IS the allow), and it doubles as the
 * cleanup pass: any legacy `# ai-opt-out:*` block list stamped by an
 * earlier revision is removed so re-deploys can never republish the old
 * GPTBot/ClaudeBot/CCBot Disallow groups. Idempotent — repeated deploys
 * leave files untouched; `--revert` (postdeploy) removes the marker so
 * the tree stays clean.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Repo root — this file sits at shared/scripts/build/. */
const DIST = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)), 'dist')

/** Marker lines delimiting the stamped allow block — revert keys off these. */
const BLOCK_BEGIN = '# ai-usage:begin'
const BLOCK_END = '# ai-usage:end'

/** Markers of the retired opt-out revision — always stripped, never restamped. */
const LEGACY_BEGIN = '# ai-opt-out:begin'
const LEGACY_END = '# ai-opt-out:end'

/** The stamped block — marker-delimited for idempotency + clean revert. */
const BLOCK = `${BLOCK_BEGIN}\n# Content-Signal: ai-train=yes, search=yes, ai-input=yes\n# Full-content Markdown + JSON replicas of every page live under /llm/\n# (and as <route>.md / <route>.json siblings); see /llms.txt for the index.\n${BLOCK_END}\n`

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

/** `--revert` (postdeploy) removes the marker so the tree stays clean. */
const REVERT = process.argv.includes('--revert')

/** Revert pattern — the marker-delimited block plus its leading blank line. */
const BLOCK_RE = new RegExp(`\\n?${BLOCK_BEGIN}[\\s\\S]*?${BLOCK_END}\\n?`)

/** Legacy opt-out block — removed unconditionally, regardless of --revert. */
const LEGACY_RE = new RegExp(`\\n?${LEGACY_BEGIN}[\\s\\S]*?${LEGACY_END}\\n?`)

/** Count of files stamped or reverted this run — logged for diagnostics. */
let stamped = 0

for (const file of collectRobots(DIST)) {
  let text = fs.readFileSync(file, 'utf8')

  // The retired opt-out list is always stripped first — an old dist must
  // never republish Disallow groups for AI crawlers under the allow policy.
  text = text.replace(LEGACY_RE, '')

  const alreadyStamped = text.includes(BLOCK_BEGIN)

  if (REVERT ? !alreadyStamped : alreadyStamped) {
    fs.writeFileSync(file, text, 'utf8')
    continue
  }

  // Insert before the Sitemap line when present (keeps the non-group
  // directive last), else append — groups may sit anywhere in the file.
  const next = REVERT
    ? text.replace(BLOCK_RE, '')
    : /^Sitemap:/m.test(text)
      ? text.replace(/^Sitemap:/m, `${BLOCK}\nSitemap:`)
      : `${text.replace(/\n?$/, '\n\n')}${BLOCK}`

  fs.writeFileSync(file, next, 'utf8')
  stamped += 1
}

console.log(`[content-signal] ${REVERT ? 'reverted' : 'stamped'} ${stamped} robots.txt file(s)`)
