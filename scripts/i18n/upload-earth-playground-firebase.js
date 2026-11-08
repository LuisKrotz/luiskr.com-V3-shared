/**
 * @file upload-earth-playground-firebase.js
 * @description One-shot migration: pushes the earth-playground page
 * translations from the local database.json mirror up to Firebase —
 * and mirrors them onto space-playground + the APP dictionary's
 * earthPlayground/spacePlayground keys so both experiment routes read
 * the same authored copy.
 *
 * Run manually (`node shared/scripts/i18n/upload-earth-playground-firebase.js`)
 * — requires an authenticated `firebase` CLI. Uses tmp JSON files as
 * the CLI's payload input (database:set/update take a file path, not
 * stdin).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Repo root — the script lives three levels down (shared/scripts/i18n).
const rootDir = path.resolve(__dirname, '..', '..', '..')

// The local mirror of the live Firebase RTDB — the source of truth
// for what should be up there.
const dbPath = path.join(rootDir, 'database.json')

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

// Only locales that actually carry an earth-playground page node —
// skipping the rest avoids empty writes on Firebase.
const locales = Object.keys(db.translations).filter((loc) =>
  Boolean(db.translations[loc]?.pages?.['earth-playground'])
)

for (const loc of locales) {
  // The page dictionary and the APP-level widget labels for the
  // experiment — two separate Firebase nodes, both pushed per locale.
  const earthData = db.translations[loc]?.pages?.['earth-playground']
  const appEarth = db.translations[loc]?.APP?.earthPlayground

  if (!earthData) continue

  console.log(`Uploading translations for locale [${loc}]...`)

  // The firebase CLI consumes file payloads — serialize the two
  // nodes to scratch files beside the db mirror.
  const tmpPage = path.join(rootDir, `tmp-ep-${loc}.json`)
  const tmpApp = path.join(rootDir, `tmp-app-${loc}.json`)

  fs.writeFileSync(tmpPage, JSON.stringify(earthData), 'utf8')

  // APP payload carries both keys: space-playground reuses the same
  // dictionary (the two experiments share their UI copy).
  fs.writeFileSync(
    tmpApp,
    JSON.stringify({ earthPlayground: appEarth, spacePlayground: appEarth }),
    'utf8'
  )

  try {
    // The page node writes to BOTH experiment routes — earth and
    // space share the authored translations.
    execSync(`firebase database:set /translations/${loc}/pages/earth-playground ${tmpPage} -f`, {
      encoding: 'utf8',
      stdio: 'pipe',
    })

    execSync(`firebase database:set /translations/${loc}/pages/space-playground ${tmpPage} -f`, {
      encoding: 'utf8',
      stdio: 'pipe',
    })

    // APP is an UPDATE (merge), not a SET — the dictionary hosts
    // many sibling keys a full set would wipe.
    execSync(`firebase database:update /translations/${loc}/APP ${tmpApp} -f`, {
      encoding: 'utf8',
      stdio: 'pipe',
    })

    console.log(`✅ [${loc}] uploaded successfully`)
  } catch (err) {
    // Per-locale failure must not abort the remaining locales — log
    // and continue; a rerun redoes only what's still wrong.
    console.error(`❌ [${loc}] failed:`, err.message)
  } finally {
    // Clean the scratch payloads whether the push succeeded or not.
    if (fs.existsSync(tmpPage)) fs.unlinkSync(tmpPage)
    if (fs.existsSync(tmpApp)) fs.unlinkSync(tmpApp)
  }
}

console.log('🎉 Finished uploading all Earth Playground translations to Firebase!')
