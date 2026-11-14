#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/gcp.mjs
 * @description GCP REST plumbing for the a11y pipeline — ADC access-token
 * acquisition/caching via the gcloud CLI, the shared `x-goog-user-project`
 * quota header every Vision/VideoIntelligence/Translate call needs, and a
 * retry-with-backoff fetch wrapper (429/5xx get re-queued, 4xx surfaces
 * immediately).
 */

import { execFile } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

const run = promisify(execFile)

/** gcloud ships as a `.cmd` shim on Windows — execFile can't run shims
 *  without the shell, so the binary name is platform-resolved once. */
const GCLOUD_BIN = process.platform === 'win32' ? 'gcloud.cmd' : 'gcloud'

/** OAuth token endpoint for the authorized_user ADC refresh flow. */
const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token'

/** Well-known ADC file locations (gcloud's own credential store). */
const ADC_PATHS = [
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
  process.platform === 'win32' && process.env.APPDATA
    ? path.join(process.env.APPDATA, 'gcloud', 'application_default_credentials.json')
    : '',
  process.env.HOME
    ? path.join(process.env.HOME, '.config', 'gcloud', 'application_default_credentials.json')
    : '',
].filter(Boolean)

/** Project the quota/billing charges land on. */
export const GCP_PROJECT = 'luiskr-com'

/** Retry ceiling for transient failures (429, 5xx, network errors). */
const MAX_RETRIES = 5

/** Base backoff — doubles per retry (1s, 2s, 4s, 8s, 16s). */
const RETRY_BASE_MS = 1000

/** ADC tokens last 60 min; refresh 10 min early so a mint never expires mid-call. */
const TOKEN_TTL_MS = 50 * 60 * 1000

let tokenCache = { value: '', expiresAt: 0 }

/**
 * Refreshes an access token straight from the ADC JSON file — the
 * `authorized_user` credential is a standard OAuth refresh_token flow,
 * so no subprocess or shell shim is involved (gcloud's `.cmd` wrapper
 * can't be execFile'd on Windows).
 * @returns {Promise<string>} Fresh OAuth access token.
 */
const refreshAdcToken = async () => {
  for (const p of ADC_PATHS) {
    let cred

    try {
      cred = JSON.parse(fs.readFileSync(p, 'utf-8'))
    } catch {
      continue
    }

    if (cred.type !== 'authorized_user' || !cred.refresh_token) continue

    const res = await fetch(OAUTH_TOKEN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: cred.client_id,
        client_secret: cred.client_secret,
        refresh_token: cred.refresh_token,
        grant_type: 'refresh_token',
      }),
    })

    const body = await res.json().catch(() => ({}))

    if (body.access_token) return body.access_token
  }

  return ''
}

/**
 * Mints (or reuses) an Application Default Credentials access token —
 * direct refresh_token exchange first, `gcloud` CLI as the fallback for
 * credential types the file flow can't cover (e.g. external_account).
 * @returns {Promise<string>} OAuth access token.
 */
export async function gcpToken() {
  if (tokenCache.value && Date.now() < tokenCache.expiresAt) return tokenCache.value

  let value = await refreshAdcToken().catch(() => '')

  if (!value) {
    const { stdout } = await run(GCLOUD_BIN, [
      'auth',
      'application-default',
      'print-access-token',
    ]).catch(() => ({ stdout: '' }))

    value = stdout.trim()
  }

  if (!value) throw new Error('no usable GCP credentials (ADC file + gcloud CLI both failed)')

  tokenCache = { value, expiresAt: Date.now() + TOKEN_TTL_MS }

  return value
}

/** Sleep helper — retry backoff. */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Authenticated fetch against a Google API — adds the Bearer token and
 * the `x-goog-user-project` quota header ADC flows require, then retries
 * transient statuses (429, 5xx) and network throws with exponential
 * backoff. Non-retryable statuses return their response as-is for the
 * caller to inspect.
 * @param {string} url Absolute API URL.
 * @param {object} [opts] fetch options (`body` may be an object — JSON-ified).
 * @returns {Promise<Response>}
 */
export async function gcpFetch(url, opts = {}) {
  const token = await gcpToken()

  const headers = {
    authorization: `Bearer ${token}`,
    'x-goog-user-project': GCP_PROJECT,
    ...(opts.body !== undefined ? { 'content-type': 'application/json' } : {}),
    ...(opts.headers || {}),
  }

  const init = {
    method: opts.method || 'GET',
    headers,
    // String/Buffer bodies pass through raw (upload endpoints); objects
    // are JSON-ified for the REST APIs.
    body:
      opts.body !== undefined
        ? typeof opts.body === 'string' || Buffer.isBuffer(opts.body)
          ? opts.body
          : JSON.stringify(opts.body)
        : undefined,
  }

  let lastErr = null

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, init)

      // 401/403 with a stale token → drop the cache once and retry fresh.
      if (res.status === 401 && attempt < MAX_RETRIES - 1) {
        tokenCache = { value: '', expiresAt: 0 }

        init.headers = { ...headers, authorization: `Bearer ${await gcpToken()}` }

        continue
      }

      if (res.status === 429 || res.status >= 500) {
        await sleep(RETRY_BASE_MS * 2 ** attempt)

        continue
      }

      return res
    } catch (err) {
      lastErr = err

      await sleep(RETRY_BASE_MS * 2 ** attempt)
    }
  }

  throw lastErr || new Error(`gcpFetch exhausted retries: ${url}`)
}

/**
 * JSON-body convenience wrapper — throws a descriptive error carrying
 * Google's `error.message` on non-2xx so logs name the real failure.
 * @param {string} url Absolute API URL.
 * @param {object} [opts] gcpFetch options.
 * @returns {Promise<object>} Parsed response JSON.
 */
export async function gcpJson(url, opts = {}) {
  const res = await gcpFetch(url, opts)

  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    const msg = body?.error?.message || `HTTP ${res.status}`

    const err = new Error(`${opts.method || 'GET'} ${url} → ${msg}`)

    err.status = res.status

    err.body = body

    throw err
  }

  return body
}
