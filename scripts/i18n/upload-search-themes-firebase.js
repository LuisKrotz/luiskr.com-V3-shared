import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import { SEARCH_THEMES_KEY } from '../../../core/tokens/data/search-themes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
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

/** Writes `data` to `rtdbPath` via the Firebase CLI, through a temp file. */
const push = (rtdbPath, data, tag) => {
  const tmp = path.join(rootDir, `tmp-themes-${tag}.json`)

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

let pushed = 0

for (const loc of locales) {
  const tr = db.translations[loc]

  if (!tr) continue

  console.log(`Uploading ${SEARCH_THEMES_KEY} for locale [${loc}]...`)

  for (const [pageKey, page] of Object.entries(tr.pages || {})) {
    if (!Array.isArray(page?.[SEARCH_THEMES_KEY]) || !page[SEARCH_THEMES_KEY].length) continue

    push(
      `/translations/${loc}/pages/${pageKey}/${SEARCH_THEMES_KEY}`,
      page[SEARCH_THEMES_KEY],
      `${loc}-p-${pageKey}`
    )
    pushed++
  }

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
