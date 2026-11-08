/**
 * @file upload-search-themes-firebase.js
 * @description One-shot push: uploads ONLY the `searchThemes` key of
 * every page node and every project node to Firebase — the narrow
 * counterpart of patch-all-pages-search-themes.js's local writes, so
 * unrelated authored content is never re-sent.
 *
 * Usage: node shared/scripts/i18n/upload-search-themes-firebase.js
 * Requires: authenticated `firebase` CLI.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import { SEARCH_THEMES_KEY } from '../../../core/tokens/data/search-themes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Repo root — script lives three levels down (shared/scripts/i18n).
const rootDir = path.resolve(__dirname, '..', '..', '..')

// The local RTDB mirror — source of truth for the push.
const dbPath = path.join(rootDir, 'database.json')

/**
 * upload-search-themes-firebase.js — pushes ONLY the `searchThemes`
 * key of every page node and every project to Firebase RTDB, so the
 * live translations gain the keyword vocabulary added by
 * patch-all-pages-search-themes.js without re-uploading whole pages
 * (the per-node write keeps unrelated authored content untouched).
 *
 * Usage: node shared/scripts/i18n/upload-search-themes-firebase.js
 * Requires: firebase CLI logged in (same convention as
 * upload-star-field-firebase.js — `firebase database:set <path> <file> -f`).
 */

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

// The locale set the site ships — the upload contract (same list the
// other upload-* scripts iterate).
const locales = [
  'en',
  'br',
  'es',
  'de',
  'fr',
  'it',
  'ru',
  'hrk',
  'cas',
  'riv',
  'gn',
  'tln',
  'nl',
  'ca',
  'gl',
  'ga',
]

/**
 * Writes `data` to `rtdbPath` via the Firebase CLI, through a temp
 * file (database:set takes a file path, not stdin). `tag` names the
 * scratch file so concurrent pushes can't collide.
 */
const push = (rtdbPath, data, tag) => {
  const tmp = path.join(rootDir, `tmp-themes-${tag}.json`)

  fs.writeFileSync(tmp, JSON.stringify(data), 'utf8')

  try {
    // database:set replaces exactly this leaf — sibling keys under
    // the same node stay untouched.
    execSync(`firebase database:set ${rtdbPath} ${tmp} -f`, {
      encoding: 'utf8',
      stdio: 'pipe',
    })

    console.log(`✅ ${rtdbPath}`)
  } catch (err) {
    // Per-node failure logs and continues — the run reports every
    // miss instead of aborting at the first.
    console.error(`❌ ${rtdbPath} failed:`, err.message)
  } finally {
    // Clean the scratch payload either way.
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  }
}

// Count of successfully attempted node writes for the summary.
let pushed = 0

for (const loc of locales) {
  const tr = db.translations[loc]

  // Locale absent from the mirror → nothing to push.
  if (!tr) continue

  console.log(`Uploading ${SEARCH_THEMES_KEY} for locale [${loc}]...`)

  // ── Page nodes ─────────────────────────────────────────────────
  for (const [pageKey, page] of Object.entries(tr.pages || {})) {
    // Only nodes that actually carry a populated themes array — a
    // missing or empty key means the patch never touched this page.
    if (!Array.isArray(page?.[SEARCH_THEMES_KEY]) || !page[SEARCH_THEMES_KEY].length) continue

    push(
      `/translations/${loc}/pages/${pageKey}/${SEARCH_THEMES_KEY}`,
      page[SEARCH_THEMES_KEY],
      `${loc}-p-${pageKey}`
    )

    pushed++
  }

  // ── Project nodes ──────────────────────────────────────────────
  for (const [slug, project] of Object.entries(tr.projects || {})) {
    if (!Array.isArray(project?.[SEARCH_THEMES_KEY]) || !project[SEARCH_THEMES_KEY].length) continue

    push(
      `/translations/${loc}/projects/${slug}/${SEARCH_THEMES_KEY}`,
      project[SEARCH_THEMES_KEY],
      `${loc}-j-${slug}`
    )

    pushed++
  }
}

console.log(`🎉 Finished uploading ${pushed} ${SEARCH_THEMES_KEY} nodes to Firebase!`)
