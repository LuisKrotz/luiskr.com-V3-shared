import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')
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

const DRY_RUN = process.argv.includes('--dry')

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

const locales = Object.keys(db.translations || {})

/** GETs a public RTDB node as JSON (translations are world-readable). */
const fetchLive = async (rtdbPath) => {
  const res = await fetch(`${RTDB_URL}${rtdbPath}.json`)

  if (!res.ok) throw new Error(`GET ${rtdbPath} → ${res.status}`)

  return res.json()
}

/** Writes `data` to `rtdbPath` via the Firebase CLI, through a temp file. */
const push = (rtdbPath, data, tag) => {
  const tmp = path.join(rootDir, `tmp-i18n-${tag}.json`)

  fs.writeFileSync(tmp, JSON.stringify(data), 'utf8')

  try {
    execSync(`firebase database:set ${rtdbPath} ${tmp} -f`, {
      encoding: 'utf8',
      stdio: 'pipe',
    })
    console.log(`✅ ${rtdbPath}`)
  } catch (err) {
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
  if (live === undefined || live === null) {
    missing.push([pre, snap])
    return
  }

  if (typeof snap !== 'object' || snap === null || Array.isArray(snap)) {
    if (JSON.stringify(snap) !== JSON.stringify(live)) differs.push(pre)
    return
  }

  for (const [key, value] of Object.entries(snap)) {
    diff(value, live?.[key], `${pre}/${key}`, missing, differs)
  }
}

let pushed = 0
let differCount = 0

for (const loc of locales) {
  const snap = db.translations[loc]

  if (!snap) continue

  console.log(`\n[${loc}] fetching live translations…`)

  const live = await fetchLive(`/translations/${loc}`)

  const missing = []
  const differs = []

  diff(snap, live || {}, '', missing, differs)

  console.log(`[${loc}] ${missing.length} missing node(s), ${differs.length} differing leaf(s)`)

  for (const [rtdbPath, data] of missing) {
    const full = `/translations/${loc}${rtdbPath}`

    if (DRY_RUN) {
      console.log(`  DRY ${full}`)
    } else {
      push(full, data, `${loc}${rtdbPath.replace(/\//g, '-')}`)
    }

    pushed++
  }

  for (const pre of differs) {
    console.log(`  ≠ kept live /translations/${loc}${pre}`)
  }

  differCount += differs.length
}

console.log(
  `\n🎉 ${DRY_RUN ? 'DRY — would push' : 'Finished uploading'} ${pushed} missing ` +
    `node(s); ${differCount} differing leaf(s) left untouched.`
)
