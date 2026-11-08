import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')

/**
 * RSS feed link label — writes `APP.rssFeed` (SECTION_UI_KEYS.RSS_FEED)
 * into every locale so <legal-footer>'s feed link reads in the visitor's
 * language. "RSS" stays untranslated (it is the format's proper name);
 * only the noun around it is localized. Dialects follow their own
 * spelling where one exists (hrk Hunsrik, riv Riverense, tln Talian, gn
 * Guaraní); `ru` is Cyrillic per the site-wide directive.
 *
 * Idempotent — re-running rewrites the same leaves. Upload the APP node
 * to Firebase separately (the live dictionary wins over this snapshot).
 */
const LABELS = {
  en: 'RSS feed',
  br: 'Feed RSS',
  es: 'Canal RSS',
  de: 'RSS-Feed',
  hrk: 'RSS-Feed',
  cas: 'Canal RSS',
  riv: 'Canal RSS',
  gn: 'RSS rape',
  it: 'Feed RSS',
  ru: 'RSS-лента',
  fr: 'Flux RSS',
  tln: 'Feed RSS',
  nl: 'RSS-feed',
  ca: 'Canal RSS',
  gl: 'Canle RSS',
  ga: 'Fotha RSS',
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

for (const [locale, label] of Object.entries(LABELS)) {
  const app = db.translations?.[locale]?.APP

  if (!app) {
    console.warn(`⚠ ${locale}: no APP node — skipped`)
    continue
  }

  app.rssFeed = label
}

fs.writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`, 'utf8')
console.log(`✅ database.json patched — APP.rssFeed in ${Object.keys(LABELS).length} locales.`)
