#!/usr/bin/env node
/**
 * @file submit-indexnow.mjs
 * @description IndexNow submission — pushes the entire canonical crawl
 * surface to the IndexNow endpoint in BOTH protocol forms:
 *
 *   json  — `POST {host, key, keyLocation, urlList}` bodies chunked to the
 *           protocol's 10,000-URL-per-request cap;
 *   param — a per-URL `GET ?url=<u>&key=<k>&keyLocation=<loc>` ping for
 *           every route in the inventory.
 *
 * Flags: `--json` / `--param` select a single form (no flag runs both —
 * every route goes out in json AND param), `--dry-run` builds the full
 * report without sending a single request.
 *
 * The URL inventory is the shipped `dist/meta/urllist.txt` (fallback:
 * `website/public/meta/urllist.txt`) — the same final-canonical list
 * generate-sitemap.js emits, so redirect sources and noindex surfaces can
 * never be submitted. Before submitting, the script verifies the root
 * key file is live and contains the key; a negative check only warns —
 * the endpoint is the final arbiter.
 *
 * Wired as the firebase hosting `postdeploy` step (after the robots
 * revert) so every deploy re-notifies engines once the new build — and
 * the root key file — is actually live. Results land in
 * `reports/indexnow.json` for the deploy-info bundle / CMS Build tab.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { INDEXNOW } from '../../../core/tokens/indexnow.ts'

/** Repo root — this file sits at shared/scripts/build/. */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

/** Canonical URL inventory — the shipped artifact first, then its source. */
const URL_LIST_CANDIDATES = Object.freeze([
  path.join(REPO_ROOT, 'dist', 'meta', 'urllist.txt'),
  path.join(REPO_ROOT, 'website', 'public', 'meta', 'urllist.txt'),
])

/** Submission report destination — bundled into dist/deploy-info/. */
const REPORT_PATH = path.join(REPO_ROOT, 'reports', 'indexnow.json')

/** Protocol cap on urlList entries per JSON POST. */
const JSON_BATCH_MAX = 10000

/** In-flight GET pings — keeps the 11k+ param pass bounded but quick. */
const PARAM_CONCURRENCY = 8

/** Hard socket timeout so a hung connection can't stall postdeploy. */
const REQUEST_TIMEOUT_MS = 15000

/** Backoff before the single retry after a 429 / transport error. */
const RETRY_DELAY_MS = 5000

const FLAG_JSON = '--json'
const FLAG_PARAM = '--param'
const FLAG_DRY_RUN = '--dry-run'

const DRY_STATUS = 'dry-run'

/** `setTimeout` as a promise — the retry backoff. */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetch wrapper enforcing the timeout and refusing redirects — IndexNow
 * answers 200/202/4xx directly; a redirecting endpoint would mask a
 * misconfiguration, so it is recorded rather than followed.
 */
const request = (url, init = {}) =>
  fetch(url, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS), redirect: 'manual' })

/**
 * Loads the canonical URL inventory — prefers the shipped dist copy so
 * the submission always mirrors the live deploy. Only URLs that parse
 * and belong to the declared host survive; the endpoint would 422 the
 * batch on a foreign URL.
 */
const loadUrlList = () => {
  for (const file of URL_LIST_CANDIDATES) {
    if (!fs.existsSync(file)) continue

    const urls = fs
      .readFileSync(file, 'utf-8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => {
        try {
          return new URL(line).host === INDEXNOW.HOST
        } catch {
          return false
        }
      })

    if (urls.length) return { file, urls }
  }

  return { file: null, urls: [] }
}

/**
 * Verifies the root key file is live and carries the key — the protocol's
 * ownership check the endpoint performs on every submission.
 */
const verifyKeyFile = async () => {
  try {
    const res = await request(INDEXNOW.KEY_LOCATION)

    return res.ok && (await res.text()).trim() === INDEXNOW.KEY
  } catch {
    return false
  }
}

/**
 * JSON form — chunks the inventory into ≤10,000-URL urlList bodies and
 * POSTs each to the endpoint. Returns one result row per batch.
 */
const submitJson = async (urls, dryRun) => {
  const results = []

  for (let i = 0; i < urls.length; i += JSON_BATCH_MAX) {
    const urlList = urls.slice(i, i + JSON_BATCH_MAX)

    if (dryRun) {
      results.push({ urls: urlList.length, status: DRY_STATUS })
      continue
    }

    const body = JSON.stringify({
      host: INDEXNOW.HOST,
      key: INDEXNOW.KEY,
      keyLocation: INDEXNOW.KEY_LOCATION,
      urlList,
    })

    try {
      const res = await request(INDEXNOW.API, {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body,
      })

      results.push({ urls: urlList.length, status: res.status })
    } catch (error) {
      results.push({
        urls: urlList.length,
        status: 'error',
        error: String(error?.message || error),
      })
    }
  }

  return results
}

/**
 * One param-form ping — `GET ?url=&key=&keyLocation=` with a single retry
 * after the backoff when the endpoint throttles (429) or the transport
 * fails. Every other status is final and recorded.
 */
const submitParamOne = async (url) => {
  const endpoint =
    `${INDEXNOW.API}?url=${encodeURIComponent(url)}` +
    `&key=${INDEXNOW.KEY}&keyLocation=${encodeURIComponent(INDEXNOW.KEY_LOCATION)}`

  let last = null

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await request(endpoint)

      if (res.status !== 429) return { url, status: res.status }

      last = { url, status: res.status }
    } catch (error) {
      last = { url, status: 'error', error: String(error?.message || error) }
    }

    await sleep(RETRY_DELAY_MS)
  }

  return last
}

/**
 * Param form — pings every URL through the GET param endpoint.
 * The concurrency pool is intentionally iterative, not a traversal:
 * it drains a flat inventory in bounded batches (legitimate per rule 20).
 */
const submitParam = async (urls, dryRun) => {
  const results = []

  if (dryRun) return urls.map((url) => ({ url, status: DRY_STATUS }))

  // Bounded batches of PARAM_CONCURRENCY — every batch resolves
  // before the next launches (one big Promise.all would open
  // thousands of sockets at once).
  for (let i = 0; i < urls.length; i += PARAM_CONCURRENCY) {
    results.push(...(await Promise.all(urls.slice(i, i + PARAM_CONCURRENCY).map(submitParamOne))))

    // Progress heartbeat every 50 batches — the param pass is the
    // long pole (11k+ pings).
    if ((i / PARAM_CONCURRENCY) % 50 === 0) {
      console.log(`IndexNow param: ${Math.min(i + PARAM_CONCURRENCY, urls.length)}/${urls.length}`)
    }
  }

  return results
}

/**
 * `run` — the submission pipeline: resolve flags → load inventory →
 * verify the key file → run the selected form(s) → write the report.
 * No flag = both forms (json AND param for every route).
 */
async function run() {
  const argv = process.argv.slice(2)

  const dryRun = argv.includes(FLAG_DRY_RUN)

  // Form selection — a lone flag runs only that form; no flag or
  // both flags runs both.
  const runJson = argv.includes(FLAG_JSON) || !argv.includes(FLAG_PARAM)

  const runParam = argv.includes(FLAG_PARAM) || !argv.includes(FLAG_JSON)

  const { file, urls } = loadUrlList()

  if (!urls.length) {
    // No inventory = no submission — a missing artifact fails the
    // step so the deploy can't silently skip notification.
    console.error('IndexNow: no canonical URL inventory found (dist/meta/urllist.txt missing)')

    process.exitCode = 1

    return
  }

  console.log(
    `IndexNow: ${urls.length} routes from ${path.relative(REPO_ROOT, file)}${dryRun ? ' (dry run)' : ''}`
  )

  // Key-file preflight — skipped under --dry-run (no network at all).
  const keyFileLive = dryRun ? null : await verifyKeyFile()

  if (keyFileLive === false) {
    // A failed check only warns — the endpoint is the final arbiter.
    console.error(`IndexNow: key check failed at ${INDEXNOW.KEY_LOCATION} — submitting anyway`)
  }

  const json = runJson ? await submitJson(urls, dryRun) : null

  const paramRows = runParam ? await submitParam(urls, dryRun) : null

  // Param failures = anything that isn't 200/202/dry-run.
  const failures = (paramRows || []).filter(
    (r) => r.status !== 200 && r.status !== 202 && r.status !== DRY_STATUS
  )

  const report = {
    submittedAt: new Date().toISOString(),
    dryRun,
    source: file && path.relative(REPO_ROOT, file),
    host: INDEXNOW.HOST,
    keyLocation: INDEXNOW.KEY_LOCATION,
    keyFileLive,
    total: urls.length,
    json,
    param: paramRows && {
      submitted: paramRows.length,
      accepted: paramRows.length - failures.length,
      failures,
    },
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true })

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`)

  console.log(
    `IndexNow: ${json ? `json ${json.map((b) => b.status).join(',')} — ` : ''}` +
      `${paramRows ? `param ${paramRows.length - failures.length}/${paramRows.length} accepted` : ''}` +
      ` → ${path.relative(REPO_ROOT, REPORT_PATH)}`
  )
}

run()
