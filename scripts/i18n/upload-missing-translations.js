/**
 * @file upload-missing-translations.js
 * @description Reconciliation push: fills keys the local
 * database.json mirror carries that live RTDB lacks — the *shallowest*
 * missing subtree uploads in one write. Differing (not missing)
 * leaves are reported but never overwritten: live CMS edits stay
 * authoritative over the repo snapshot.
 *
 * Usage:
 *   node shared/scripts/i18n/upload-missing-translations.js          # pushes
 *   node shared/scripts/i18n/upload-missing-translations.js --dry    # plan only
 * Requires: authenticated `firebase` CLI.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Repo root — script lives three levels down (shared/scripts/i18n).
const rootDir = path.resolve(__dirname, '..', '..', '..')

// The local RTDB mirror — the push's source.
const dbPath = path.join(rootDir, 'database.json')

// The live database — reads go through its public REST endpoint.
const RTDB_URL = 'https://luiskr-com.firebaseio.com'

/**
 * upload-missing-translations.js — fills every key that exists in the
 * build-time `database.json` snapshot but is absent from live Firebase RTDB,
 * for all 16 locales. The diff walks each locale tree and pushes the
 * *shallowest* missing subtree (a whole absent node uploads in one write;
 * partially-present nodes descend until the missing leaf). Leaf values that
 * differ from live are reported but NEVER overwritten — live CMS edits stay
 * authoritative.
 *
 * Usage:
 *   node shared/scripts/i18n/upload-missing-translations.js          # pushes
 *   node shared/scripts/i18n/upload-missing-translations.js --dry    # plan only
 *
 * Requires: firebase CLI logged in (same convention as
 * upload-search-themes-firebase.js — `firebase database:set <path> <file> -f`).
 */

// --dry prints the push list without executing — the plan review.
const DRY_RUN = process.argv.includes('--dry')

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

// Whatever locales the mirror carries — the push set follows the
// snapshot, not a hardcoded list (new locales flow through).
const locales = Object.keys(db.translations || {})

/** GETs a public RTDB node as JSON (translations are world-readable). */
const fetchLive = async (rtdbPath) => {
  const res = await fetch(`${RTDB_URL}${rtdbPath}.json`)

  if (!res.ok) throw new Error(`GET ${rtdbPath} → ${res.status}`)

  return res.json()
}

/**
 * Writes `data` to `rtdbPath` via the Firebase CLI, through a temp
 * file (database:set takes a file path, not stdin). `tag` names the
 * scratch file so per-locale pushes can't collide.
 */
const push = (rtdbPath, data, tag) => {
  const tmp = path.join(rootDir, `tmp-i18n-${tag}.json`)

  fs.writeFileSync(tmp, JSON.stringify(data), 'utf8')

  try {
    // database:set replaces exactly this subtree — siblings stay.
    execSync(`firebase database:set ${rtdbPath} ${tmp} -f`, {
      encoding: 'utf8',
      stdio: 'pipe',
    })

    console.log(`✅ ${rtdbPath}`)
  } catch (err) {
    // Per-node failure logs and continues — report every miss.
    console.error(`❌ ${rtdbPath} failed:`, err.message)
  } finally {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  }
}

/**
 * Recursively collects the missing subtrees and differing leaves of `snap`
 * against `live`. A subtree missing at `live` lands in `missing` whole —
 * its children are never enumerated. A present-but-different scalar/array
 * lands in `differs` (reported, never written).
 */
const diff = (snap, live, pre, missing, differs) => {
  // Absent live → record the WHOLE snapshot subtree as one write —
  // descending would push dozens of leaf writes instead of one.
  if (live === undefined || live === null) {
    missing.push([pre, snap])

    return
  }

  // Leaf reached (scalar or array) → compare; differing values are
  // reported but never written (live CMS edits stay authoritative).
  if (typeof snap !== 'object' || snap === null || Array.isArray(snap)) {
    if (JSON.stringify(snap) !== JSON.stringify(live)) differs.push(pre)

    return
  }

  // Both are objects → descend key by key.
  for (const [key, value] of Object.entries(snap)) {
    diff(value, live?.[key], `${pre}/${key}`, missing, differs)
  }
}

// Run counters for the summary line.
let pushed = 0

let differCount = 0

for (const loc of locales) {
  const snap = db.translations[loc]

  if (!snap) continue

  console.log(`\n[${loc}] fetching live translations…`)

  // One GET per locale — the whole subtree diffs client-side.
  const live = await fetchLive(`/translations/${loc}`)

  const missing = []

  const differs = []

  diff(snap, live || {}, '', missing, differs)

  console.log(`[${loc}] ${missing.length} missing node(s), ${differs.length} differing leaf(s)`)

  // ── Push each missing subtree (or list it under --dry) ────────
  for (const [rtdbPath, data] of missing) {
    const full = `/translations/${loc}${rtdbPath}`

    if (DRY_RUN) {
      console.log(`  DRY ${full}`)
    } else {
      push(full, data, `${loc}${rtdbPath.replace(/\//g, '-')}`)
    }

    pushed++
  }

  // ── Report differing leaves — live wins, no writes ────────────
  for (const pre of differs) {
    console.log(`  ≠ kept live /translations/${loc}${pre}`)
  }

  differCount += differs.length
}

console.log(
  `\n🎉 ${DRY_RUN ? 'DRY — would push' : 'Finished uploading'} ${pushed} missing ` +
    `node(s); ${differCount} differing leaf(s) left untouched.`
)
