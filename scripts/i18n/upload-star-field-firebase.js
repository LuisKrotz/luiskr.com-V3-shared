/**
 * @file upload-star-field-firebase.js
 * @description One-shot migration: pushes each locale's star-field
 * page translations from the local database.json mirror up to
 * Firebase. Sibling of upload-earth-playground-firebase.js — same
 * tmp-file + firebase-CLI mechanism, narrower surface (page node only).
 *
 * Run manually (`node shared/scripts/i18n/upload-star-field-firebase.js`)
 * — requires an authenticated `firebase` CLI.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Repo root — the script lives three levels down (shared/scripts/i18n).
const rootDir = path.resolve(__dirname, '..', '..', '..')

// The local RTDB mirror — source of truth for the push.
const dbPath = path.join(rootDir, 'database.json')

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

// The locale list the experiment ships — hardcoded rather than
// scanned because star-field predates several locales; the list is
// the upload contract, not a query.
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

for (const loc of locales) {
  // Skip locales missing the star-field node — never push empties.
  const starData = db.translations[loc]?.pages?.['star-field']

  if (!starData) continue

  console.log(`Uploading translations for locale [${loc}]...`)

  // The firebase CLI consumes file payloads — serialize the node
  // to a scratch file beside the db mirror.
  const tmpPage = path.join(rootDir, `tmp-sf-${loc}.json`)

  fs.writeFileSync(tmpPage, JSON.stringify(starData), 'utf8')

  try {
    // database:set replaces the whole star-field page node — the
    // local mirror is authoritative for this subtree.
    execSync(`firebase database:set /translations/${loc}/pages/star-field ${tmpPage} -f`, {
      encoding: 'utf8',
      stdio: 'pipe',
    })

    console.log(`✅ [${loc}] uploaded successfully`)
  } catch (err) {
    // Per-locale failure must not abort the rest — log and continue.
    console.error(`❌ [${loc}] failed:`, err.message)
  } finally {
    // Clean the scratch payload either way.
    if (fs.existsSync(tmpPage)) fs.unlinkSync(tmpPage)
  }
}

console.log('🎉 Finished uploading all Star Field translations to Firebase!')
