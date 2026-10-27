import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')

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

for (const loc of locales) {
  const starData = db.translations[loc]?.pages?.['star-field']
  if (!starData) continue

  console.log(`Uploading translations for locale [${loc}]...`)

  const tmpPage = path.join(rootDir, `tmp-sf-${loc}.json`)
  fs.writeFileSync(tmpPage, JSON.stringify(starData), 'utf8')

  try {
    execSync(`firebase database:set /translations/${loc}/pages/star-field ${tmpPage} -f`, {
      encoding: 'utf8',
      stdio: 'pipe',
    })
    console.log(`✅ [${loc}] uploaded successfully`)
  } catch (err) {
    console.error(`❌ [${loc}] failed:`, err.message)
  } finally {
    if (fs.existsSync(tmpPage)) fs.unlinkSync(tmpPage)
  }
}

console.log('🎉 Finished uploading all Star Field translations to Firebase!')
