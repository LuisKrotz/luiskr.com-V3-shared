/**
 * @file patch-rss-feed-label.js
 * @description One-shot migration: seeds `APP.rssFeed` — the legal
 * footer's RSS link label — into every locale of the local
 * database.json mirror.
 *
 * Run: node shared/scripts/i18n/patch-rss-feed-label.js
 * (patches the local mirror only — upload to Firebase separately).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Repo root — script lives three levels down (shared/scripts/i18n).
const rootDir = path.resolve(__dirname, '..', '..', '..')

// The local RTDB mirror — patched in place, written back at end.
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

  // Locale without an APP node → warn + skip (never bootstrap one).
  if (!app) {
    console.warn(`⚠ ${locale}: no APP node — skipped`)

    continue
  }

  app.rssFeed = label
}

// Write the mirror back — trailing newline matches the file's format.
fs.writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`, 'utf8')

console.log(`✅ database.json patched — APP.rssFeed in ${Object.keys(LABELS).length} locales.`)
