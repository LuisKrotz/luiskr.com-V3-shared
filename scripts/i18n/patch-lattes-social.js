/**
 * @file patch-lattes-social.js
 * @description One-shot migration: appends the Lattes CV channel to the
 * two footer channel lists — `components/contact.line1` (the contact
 * footer's links row) and `components/related.socials` (the shared
 * legal-footer's socials row) — in every locale of the local
 * database.json mirror.
 *
 * Run: node shared/scripts/i18n/patch-lattes-social.js          (mirror only)
 *      node shared/scripts/i18n/patch-lattes-social.js --push   (mirror + live RTDB)
 *
 * --push requires .firebase-admin-key.json at repo root — service-account
 * credentials mint an OAuth2 access token (JWT → oauth2 token endpoint)
 * and the writes go through the RTDB REST API, so no firebase-admin
 * install is needed (the workspace dep graph may be uninstallable mid
 * version bump).
 */
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Repo root — script lives three levels down (shared/scripts/i18n).
const rootDir = path.resolve(__dirname, '..', '..', '..')

// The local RTDB mirror — patched in place, written back at end.
const dbPath = path.join(rootDir, 'database.json')

/**
 * The Lattes CV channel. "Lattes" is the platform's proper name so the
 * label stays identical across all 16 locales (same convention as
 * Linkedin/Github). Property order mirrors each list's row shape:
 * line1 rows are {description, link}, socials rows are {link, network}.
 */
const LATTES_URL = 'http://lattes.cnpq.br/9485721962607600'

const LATTES_LINE1 = { description: 'Lattes', link: LATTES_URL }

const LATTES_SOCIAL = { link: LATTES_URL, network: 'Lattes' }

/**
 * Appends a channel row to a list unless a row with the same link is
 * already present — keeps the script idempotent. Firebase may deliver
 * list nodes as keyed objects, so non-array values are ignored (the
 * caller treats them as unpatched rather than destroying them).
 */
const appendChannel = (list, item) => {
  if (!Array.isArray(list)) return false

  if (list.some((entry) => entry?.link === LATTES_URL)) return false

  list.push(item)

  return true
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

/** Locales whose channel lists actually gained the row this run. */
const patched = []

for (const [locale, dict] of Object.entries(db.translations || {})) {
  const components = dict?.components

  if (!components?.contact || !components?.related) {
    console.warn(`⚠ ${locale}: missing contact/related components — skipped`)

    continue
  }

  const line1Hit = appendChannel(components.contact.line1, { ...LATTES_LINE1 })

  const socialsHit = appendChannel(components.related.socials, { ...LATTES_SOCIAL })

  if (line1Hit || socialsHit) patched.push(locale)
}

// Write the mirror back — trailing newline matches the file's format.
fs.writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`, 'utf8')

console.log(
  patched.length
    ? `✅ database.json patched — Lattes added to contact.line1 + related.socials in ${patched.length} locales.`
    : '✅ database.json already carries Lattes in every locale — nothing to patch.'
)

// ── Optional Firebase push ────────────────────────────────────────────────
// --push mirrors the same two writes to live RTDB after the local write —
// opt-in so routine mirror patches never touch production.
if (process.argv.includes('--push')) {
  const keyPath = path.join(rootDir, '.firebase-admin-key.json')

  // Missing service-account key → warn and exit 0 (the mirror write
  // already succeeded; a skipped push isn't a failure).
  if (!fs.existsSync(keyPath)) {
    console.error(
      '⚠️  .firebase-admin-key.json missing — database.json written, Firebase push skipped'
    )

    process.exit(0)
  }

  // ── Zero-dep service-account auth ─────────────────────────────────────
  // A service-account OAuth2 access token grants admin RTDB access over
  // REST — the same privilege level the Admin SDK gets, with no package
  // install. JWT: RS256 signature over iss/scope/aud/iat/exp claims.
  const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'))

  const now = Math.floor(Date.now() / 1000)

  const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url')

  const unsignedJwt = `${b64url({ alg: 'RS256', typ: 'JWT' })}.${b64url({
    iss: serviceAccount.client_email,
    scope:
      'https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`

  const signature = crypto
    .createSign('RSA-SHA256')
    .update(unsignedJwt)
    .sign(serviceAccount.private_key, 'base64url')

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${unsignedJwt}.${signature}`,
  })

  const tokenBody = await tokenRes.json()

  if (!tokenBody.access_token) {
    console.error('⚠️  OAuth token exchange failed:', JSON.stringify(tokenBody))

    process.exit(1)
  }

  const authQuery = `access_token=${tokenBody.access_token}`

  const DB_ROOT = 'https://luiskr-com.firebaseio.com'

  /** Reads one RTDB path over REST; null on any non-OK response. */
  const restGet = async (p) => {
    const res = await fetch(`${DB_ROOT}/${p}.json?${authQuery}`)

    return res.ok ? res.json() : null
  }

  /** Replaces one RTDB path over REST; logs and returns false on failure. */
  const restPut = async (p, data) => {
    const res = await fetch(`${DB_ROOT}/${p}.json?${authQuery}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) console.error(`⚠️  PUT ${p} → ${res.status}: ${await res.text()}`)

    return res.ok
  }

  /**
   * Firebase returns populated arrays as real arrays, but a list node
   * can also arrive as a keyed object — normalize to a plain array
   * before appending (same contract as the website renderers).
   */
  const asList = (val) => (Array.isArray(val) ? val : val ? Object.values(val) : [])

  for (const locale of Object.keys(db.translations || {})) {
    const line1Path = `translations/${locale}/components/contact/line1`

    const socialsPath = `translations/${locale}/components/related/socials`

    const [line1Raw, socialsRaw] = await Promise.all([restGet(line1Path), restGet(socialsPath)])

    // Read-modify-write per list — the live arrays win on drift; the
    // Lattes row is only appended when absent (idempotent re-runs).
    const line1 = asList(line1Raw)

    const socials = asList(socialsRaw)

    const writes = []

    if (appendChannel(line1, { ...LATTES_LINE1 })) writes.push(restPut(line1Path, line1))

    if (appendChannel(socials, { ...LATTES_SOCIAL })) writes.push(restPut(socialsPath, socials))

    await Promise.all(writes)

    console.log(
      `🔥 ${locale}: ${writes.length ? 'Lattes pushed to contact/line1 + related/socials' : 'already present — skipped'}`
    )
  }
}
