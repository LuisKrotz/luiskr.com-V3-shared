/**
 * @file push-untranslated-fixes.js
 * @description Pushes the corrected (newly translated) leaves of
 * database.json to live RTDB — the complement of
 * upload-missing-translations.js.
 *
 * That script only fills keys ABSENT from live; it reports differing
 * leaves but never overwrites them. This script handles the other half
 * of the untranslated-strings problem: leaves where live still holds
 * the ENGLISH value verbatim (a stale untranslated copy) while the
 * local mirror now carries a real translation — localized route links
 * (APP/about/link, contact.line2, legal-footer.links), a11y labels
 * (a11y.carousel, vignette, not-found.link), preference labels and
 * project media labels/searchThemes fixed in the mirror.
 *
 * Push rule per leaf: live[loc] === live[en] AND local[loc] !== live[en]
 * → the locale node is provably stale English and the mirror has a
 * correction. Anything already localized in live is never touched —
 * live CMS edits stay authoritative. `--parity` drops that safeguard:
 * every differing leaf pushes the mirror value (and differing arrays
 * replace wholesale so a longer live tail can't survive) — live
 * becomes an exact copy of the mirror.
 *
 * Usage:
 *   node shared/scripts/i18n/push-untranslated-fixes.js           # stale-EN pushes
 *   node shared/scripts/i18n/push-untranslated-fixes.js --parity  # full mirror parity
 *   node shared/scripts/i18n/push-untranslated-fixes.js --dry     # plan only
 *
 * Auth: prefers a Google OAuth2 token (`--token=<tok>` or
 * `GCLOUD_ACCESS_TOKEN`, e.g. `gcloud auth print-access-token`) and
 * PUTs each node through the RTDB REST API; falls back to
 * `firebase database:set <path> <file> -f` when no token is given.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Repo root — script lives three levels down (shared/scripts/i18n).
const rootDir = path.resolve(__dirname, '..', '..', '..')

// The local RTDB mirror — source of the corrected values.
const db = JSON.parse(fs.readFileSync(path.join(rootDir, 'database.json'), 'utf8'))

const RTDB_URL = 'https://luiskr-com.firebaseio.com'

// --dry prints the push list without executing — the plan review.
const DRY_RUN = process.argv.includes('--dry')

// --parity drops the stale-English safeguard: every leaf where live
// differs from the mirror pushes the mirror value — the user asked
// for live to become an exact copy of database.json.
const PARITY = process.argv.includes('--parity')

// OAuth2 token for REST writes — `--token=` flag wins over the env var
// so a short-lived `gcloud auth print-access-token` can be injected.
const tokenArg = process.argv.find((a) => a.startsWith('--token='))

const TOKEN = tokenArg?.slice('--token='.length) || process.env.GCLOUD_ACCESS_TOKEN

// Every locale the mirror carries, en included: for en itself the
// stale-English test degenerates to live!==local, which is precisely
// mirror-wins reconciliation — filling en's missing subtrees and
// updating its stale migration remnants (old slugs, <q> markup,
// media src/size updates) so all 16 dictionaries stay consistent.
const locales = Object.keys(db.translations || {})

/** GETs a public RTDB node as JSON (translations are world-readable). */
const fetchLive = async (rtdbPath) => {
  const res = await fetch(`${RTDB_URL}${rtdbPath}.json`)

  if (!res.ok) throw new Error(`GET ${rtdbPath} → ${res.status}`)

  return res.json()
}

/**
 * Writes `data` to `rtdbPath`. With an OAuth2 token this PUTs through
 * the RTDB REST API directly (equivalent to database:set — replaces
 * exactly the node); otherwise it falls back to the Firebase CLI via a
 * temp file (database:set takes a file path, not stdin).
 */
const push = async (rtdbPath, data, tag) => {
  if (TOKEN) {
    try {
      const res = await fetch(`${RTDB_URL}${rtdbPath}.json?access_token=${TOKEN}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error(`PUT ${rtdbPath} → ${res.status}: ${await res.text()}`)

      console.log(`✅ ${rtdbPath}`)

      return true
    } catch (err) {
      console.error(`❌ ${rtdbPath} failed:`, err.message)

      return false
    }
  }

  const tmp = path.join(rootDir, `tmp-i18n-${tag}.json`)

  fs.writeFileSync(tmp, JSON.stringify(data), 'utf8')

  try {
    execSync(`firebase database:set ${rtdbPath} ${tmp} -f`, {
      encoding: 'utf8',
      stdio: 'pipe',
    })

    console.log(`✅ ${rtdbPath}`)

    return true
  } catch (err) {
    console.error(`❌ ${rtdbPath} failed:`, err.message)

    return false
  } finally {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  }
}

/**
 * Recursively collects the pushes for one locale. Two cases write:
 *
 * 1. `liveLoc` absent → the WHOLE local subtree pushes at `pre` in a
 *    single write (shallowest missing node, same convention as
 *    upload-missing-translations.js — descending would multiply leaf
 *    writes for nothing).
 * 2. Scalar leaf where `liveLoc === liveEn` (the live locale still
 *    holds the English string verbatim — a provably stale untranslated
 *    copy) but `local !== liveEn` → the corrected mirror value pushes.
 *
 * Arrays walk by index — live and local lists are position-aligned
 * (verified against portfoliolist/links/line2), so a stale field inside
 * an item pushes alone and a missing tail index uploads whole. Anything
 * already diverging from English in live is never touched — live CMS
 * edits stay authoritative. Under `--parity` that safeguard lifts: a
 * differing array replaces wholesale (element-wise writes can't drop a
 * longer live tail) and any differing scalar pushes the mirror value.
 */
const collect = (local, liveLoc, liveEn, pre, out) => {
  // Missing local → nothing to push (absent mirror values delete nothing).
  if (local === undefined || local === null) return

  // Missing live → one write for the whole local subtree.
  if (liveLoc === undefined || liveLoc === null) {
    out.push([pre, local])

    return
  }

  // Parity: arrays (and any type mismatch) replace whole — index writes
  // would leave a longer live tail or stale shape behind.
  if (
    PARITY &&
    (Array.isArray(local) || Array.isArray(liveLoc) || typeof local !== typeof liveLoc)
  ) {
    if (JSON.stringify(local) !== JSON.stringify(liveLoc)) out.push([pre, local])

    return
  }

  // Object/array → descend key by key (index by index for arrays).
  if (typeof local === 'object') {
    for (const [key, value] of Object.entries(local)) {
      collect(value, liveLoc?.[key], liveEn?.[key], `${pre}/${key}`, out)
    }

    return
  }

  // Scalar leaf: parity → any difference pushes; otherwise only a
  // provably stale English copy (live === liveEn) with a correction.
  if (PARITY ? local !== liveLoc : liveLoc === liveEn && local !== liveEn) {
    out.push([pre, local])
  }
}

const live = {}

let pushed = 0

let skipped = 0

for (const loc of locales) {
  const snap = db.translations[loc]

  if (!snap) continue

  live[loc] = await fetchLive(`/translations/${loc}`)
  live.en = live.en || (await fetchLive(`/translations/en`))

  const plan = []

  collect(snap, live[loc] || {}, live.en || {}, '', plan)

  console.log(`\n[${loc}] ${plan.length} corrected leaves to push`)

  for (const [rtdbPath, value] of plan) {
    const full = `/translations/${loc}${rtdbPath}`

    if (DRY_RUN) {
      console.log(`  ${full} = ${JSON.stringify(value).slice(0, 90)}`)
    } else if (await push(full, value, `${loc}-${rtdbPath.replace(/\//g, '_')}`)) {
      pushed++
    } else {
      skipped++
    }
  }
}

console.log(`\n${DRY_RUN ? 'DRY — nothing written' : `done: ${pushed} pushed, ${skipped} failed`}`)
