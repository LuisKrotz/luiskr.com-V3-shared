/**
 * @file patch-sitemap-page.js
 * @description One-shot migration: seeds the sitemap page's copy into
 * every locale of the local database.json mirror — the footer link
 * label (APP.sitemap) and the full page node (pages.sitemap: title,
 * description, intro, and the six group names the tree renders).
 *
 * Run: node shared/scripts/i18n/patch-sitemap-page.js
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
 * Sitemap page copy — writes `APP.sitemap` (SECTION_UI_KEYS.SITEMAP, the
 * footer link label) and `pages.sitemap` (title + description + intro +
 * group names) into every locale so <legal-footer>/<awards-mentions> and
 * <view-sitemap> read in the visitor's language. "Sitemap" itself stays
 * untranslated where the loanword is standard (de/hrk/nl); `ru` is
 * Cyrillic per the site-wide directive; dialects follow their own
 * spelling (hrk Hunsrik, riv Riverense, tln Talian, gn Guaraní).
 *
 * Idempotent — re-running rewrites the same leaves. Upload the APP +
 * pages nodes to Firebase separately (the live dictionary wins over
 * this snapshot).
 */
const LABELS = {
  en: 'Sitemap',
  br: 'Mapa do site',
  es: 'Mapa del sitio',
  de: 'Sitemap',
  hrk: 'Sitemap',
  cas: 'Mapa del sitio',
  riv: 'Mapa do site',
  gn: 'Pe saito mapa',
  it: 'Mappa del sito',
  ru: 'Карта сайта',
  fr: 'Plan du site',
  tln: 'Mapa del sito',
  nl: 'Sitemap',
  ca: 'Mapa del lloc',
  gl: 'Mapa do sitio',
  ga: 'Mapa an tsuímh',
}

/** Localized meta description + intro line for pages.sitemap. */
const DESCRIPTIONS = {
  en: 'Every page on this site, in every language — the complete link index.',
  br: 'Todas as páginas deste site, em todos os idiomas — o índice completo de links.',
  es: 'Todas las páginas de este sitio, en todos los idiomas — el índice completo de enlaces.',
  de: 'Alle Seiten dieser Website in allen Sprachen — das vollständige Link-Verzeichnis.',
  hrk: 'Alle Seite vun dëre Websait, in all Schprooche — dat vollständige Link-Verzeichnis.',
  cas: 'Todas las páginas de este sitio, en todos los idiomas — el índice completo de enlaces.',
  riv: 'Todas as páginas deste site, em todos os idiomas — o índice completo de links.',
  gn: 'Opa kuatiarenda ko sitio pegua, opa ñeẽme — juajuaha rysýi opavave.',
  it: 'Tutte le pagine di questo sito, in tutte le lingue — l’indice completo dei link.',
  ru: 'Все страницы этого сайта на всех языках — полный указатель ссылок.',
  fr: 'Toutes les pages de ce site, dans toutes les langues — l’index complet des liens.',
  tln: 'Tute łe pagine de sto sito, in tute łe łengue — l’indice completo dei link.',
  nl: 'Alle pagina’s van deze site, in alle talen — de volledige linklijst.',
  ca: 'Totes les pàgines d’aquest lloc, en tots els idiomes — l’índex complet d’enllaços.',
  gl: 'Todas as páxinas deste sitio, en todos os idiomas — o índice completo de ligazóns.',
  ga: 'Gach leathanach ar an suíomh seo, i ngach teanga — innéacs iomlán na naisc.',
}

/** Localized names of the sitemap tree's branch groups. */
const GROUPS = {
  en: {
    pages: 'Pages',
    legal: 'Legal',
    portfolio: 'Portfolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Media',
  },
  br: {
    pages: 'Páginas',
    legal: 'Legal',
    portfolio: 'Portfólio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Mídia',
  },
  es: {
    pages: 'Páginas',
    legal: 'Legal',
    portfolio: 'Portafolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Medios',
  },
  de: {
    pages: 'Seiten',
    legal: 'Rechtliches',
    portfolio: 'Portfolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Medien',
  },
  hrk: {
    pages: 'Seite',
    legal: 'Rechtliches',
    portfolio: 'Portfolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Medien',
  },
  cas: {
    pages: 'Páginas',
    legal: 'Legal',
    portfolio: 'Portafolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Medios',
  },
  riv: {
    pages: 'Páginas',
    legal: 'Legal',
    portfolio: 'Portfólio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Mídia',
  },
  gn: {
    pages: 'Kuatiarenda',
    legal: 'Leñeẽ',
    portfolio: 'Porfolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Ta’ãngakuéra',
  },
  it: {
    pages: 'Pagine',
    legal: 'Note legali',
    portfolio: 'Portfolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Media',
  },
  ru: {
    pages: 'Страницы',
    legal: 'Правовая информация',
    portfolio: 'Портфолио',
    playground: 'Песочница',
    docs: 'Документы',
    media: 'Медиа',
  },
  fr: {
    pages: 'Pages',
    legal: 'Mentions légales',
    portfolio: 'Portfolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Médias',
  },
  tln: {
    pages: 'Pagine',
    legal: 'Note legali',
    portfolio: 'Portfolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Media',
  },
  nl: {
    pages: 'Pagina’s',
    legal: 'Juridisch',
    portfolio: 'Portfolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Media',
  },
  ca: {
    pages: 'Pàgines',
    legal: 'Avís legal',
    portfolio: 'Portafoli',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Mèdia',
  },
  gl: {
    pages: 'Páxinas',
    legal: 'Aviso legal',
    portfolio: 'Portafolio',
    playground: 'Playground',
    docs: 'Docs',
    media: 'Medios',
  },
  ga: {
    pages: 'Leathanaigh',
    legal: 'Dlí',
    portfolio: 'Punann',
    playground: 'Clós súgartha',
    docs: 'Docs',
    media: 'Meáin',
  },
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

for (const [locale, label] of Object.entries(LABELS)) {
  const tr = db.translations?.[locale]

  const app = tr?.APP

  // A locale without an APP node is an incomplete locale — warn
  // rather than half-seed (the footer label would land but the page
  // tree would still be missing its siblings).
  if (!app) {
    console.warn(`⚠ ${locale}: no APP node — skipped`)

    continue
  }

  // The footer link label — SECTION_UI_KEYS.SITEMAP reads this.
  app.sitemap = label

  // Bootstrap the pages node if the locale somehow lacks it.
  const pages = tr.pages || (tr.pages = {})

  // The full page node — description doubles as the intro line
  // (the sitemap page's lede is exactly its meta description).
  pages.sitemap = {
    title: label,
    description: DESCRIPTIONS[locale],
    intro: DESCRIPTIONS[locale],
    groups: GROUPS[locale],
  }
}

// Write the mirror back — trailing newline matches the file's
// existing final-newline convention.
fs.writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`, 'utf8')

console.log(
  `✅ database.json patched — APP.sitemap + pages.sitemap in ${Object.keys(LABELS).length} locales.`
)
