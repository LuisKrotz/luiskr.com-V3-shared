#!/usr/bin/env node
/**
 * @file stamp-content-signal.mjs
 * @description Firebase `predeploy` step — stamps the AI-usage opt-out
 * into every `dist` robots.txt before upload.
 *
 * The declaration lives at deploy time, not in source: the live site
 * opts out of AI training/answer-input while the local/preview artifact
 * stays minimal. The IETF-draft `Content-Signal` directive was the
 * original stamp, but Lighthouse's robots-txt audit scores unknown
 * directives as a parse error (SEO −8) — the deployed file now uses the
 * spec-valid equivalent: named User-agent groups with `Disallow: /`,
 * which actually *enforces* the opt-out for crawlers that respect
 * robots.txt. The intent mirrors `ai-train=no, ai-input=no` — search
 * crawlers (Googlebot, Bingbot, OAI-SearchBot…) stay allowed
 * (`search=yes`); the HTTP `Content-Signal` header in firebase.json
 * still carries the draft preference for agents that read headers.
 * Idempotent — repeated deploys leave files untouched; `--revert`
 * (postdeploy) removes the block so the tree stays clean.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Repo root — this file sits at shared/scripts/build/. */
const DIST = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)), 'dist')

/** Marker lines delimiting the stamped block — revert keys off these. */
const BLOCK_BEGIN = '# ai-opt-out:begin'
const BLOCK_END = '# ai-opt-out:end'

/**
 * AI training / AI-input crawlers — each becomes its own
 * `User-agent: X / Disallow: /` group. Deliberately excludes search
 * crawlers (Googlebot, Bingbot, OAI-SearchBot, DuckDuckBot): the signal
 * is `search=yes`, only training and AI-answer input are refused.
 */
const AI_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-User',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
  'Meta-ExternalAgent',
  'FacebookBot',
  'Amazonbot',
  'PerplexityBot',
  'YouBot',
  'Diffbot',
  'Omgilibot',
  'cohere-ai',
  'img2dataset',
  'ImagesiftBot',
  'TikTokSpider',
]

/** The stamped block — marker-delimited for idempotency + clean revert. */
const BLOCK = `${BLOCK_BEGIN}\n${AI_AGENTS.map((a) => `User-agent: ${a}\nDisallow: /`).join('\n\n')}\n${BLOCK_END}\n`

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

/** `--revert` (postdeploy) removes the block so the tree stays clean. */
const REVERT = process.argv.includes('--revert')

/** Revert pattern — the marker-delimited block plus its leading blank line. */
const BLOCK_RE = new RegExp(`\\n?${BLOCK_BEGIN}[\\s\\S]*?${BLOCK_END}\\n?`)

/** Count of files stamped or reverted this run — logged for diagnostics. */
let stamped = 0

for (const file of collectRobots(DIST)) {
  const text = fs.readFileSync(file, 'utf8')

  if (REVERT ? !text.includes(BLOCK_BEGIN) : text.includes(BLOCK_BEGIN)) continue

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
