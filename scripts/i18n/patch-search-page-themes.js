import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SEARCH_THEMES_KEY } from '../../../core/tokens/data/search-themes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')

/**
 * Search page searchThemes — one localized vocabulary per locale so the
 * /search surface carries the metadata the indexation gate requires of
 * every CMS page node. Dialect fallbacks mirror the other patch
 * scripts: hrk → de, cas/riv → es, gn → es + Guaraní terms, tln → it.
 */
const TRANSLATIONS_MAP = {
  en: [
    'search',
    'site search',
    'find',
    'portfolio search',
    'search projects',
    'catalog',
    'luis krötz',
    'luiskr.com',
    'developer portfolio',
    'webgl experiments',
  ],
  br: [
    'pesquisa',
    'busca no site',
    'encontrar',
    'pesquisa no portfólio',
    'projetos',
    'catálogo',
    'luis krötz',
    'luiskr.com',
    'portfólio',
    'experimentos webgl',
  ],
  es: [
    'búsqueda',
    'búsqueda en el sitio',
    'encontrar',
    'búsqueda en el portafolio',
    'proyectos',
    'catálogo',
    'luis krötz',
    'luiskr.com',
    'portafolio',
    'experimentos webgl',
  ],
  de: [
    'suche',
    'site-suche',
    'finden',
    'portfolio-suche',
    'projekte',
    'katalog',
    'luis krötz',
    'luiskr.com',
    'portfolio',
    'webgl-experimente',
  ],
  hrk: [
    'suche',
    'site-suche',
    'finden',
    'portfolio-suche',
    'projekte',
    'katalog',
    'luis krötz',
    'luiskr.com',
    'portfolio',
    'webgl-experimente',
  ],
  cas: [
    'búsqueda',
    'búsqueda en el sitio',
    'encontrar',
    'búsqueda en el portafolio',
    'proyectos',
    'catálogo',
    'luis krötz',
    'luiskr.com',
    'portafolio',
    'experimentos webgl',
  ],
  riv: [
    'búsqueda',
    'búsqueda en el sitio',
    'encontrar',
    'búsqueda en el portafolio',
    'proyectos',
    'catálogo',
    'luis krötz',
    'luiskr.com',
    'portafolio',
    'experimentos webgl',
  ],
  gn: [
    'jepáva',
    'búsqueda en el sitio',
    'hójua',
    'búsqueda en el portafolio',
    'proyectos',
    'catálogo',
    'luis krötz',
    'luiskr.com',
    'portafolio',
    'webgl tembiporu',
  ],
  it: [
    'ricerca',
    'ricerca nel sito',
    'trova',
    'ricerca nel portfolio',
    'progetti',
    'catalogo',
    'luis krötz',
    'luiskr.com',
    'portfolio',
    'esperimenti webgl',
  ],
  ru: [
    'поиск',
    'поиск по сайту',
    'найти',
    'поиск по портфолио',
    'проекты',
    'каталог',
    'луис крётц',
    'luiskr.com',
    'портфолио',
    'webgl-эксперименты',
  ],
  fr: [
    'recherche',
    'recherche sur le site',
    'trouver',
    'recherche dans le portfolio',
    'projets',
    'catalogue',
    'luis krötz',
    'luiskr.com',
    'portfolio',
    'expériences webgl',
  ],
  tln: [
    'ricerca',
    'ricerca nel sito',
    'trova',
    'ricerca nel portfolio',
    'progetti',
    'catalogo',
    'luis krötz',
    'luiskr.com',
    'portfolio',
    'esperimenti webgl',
  ],
  nl: [
    'zoeken',
    'zoeken op de site',
    'vinden',
    'zoeken in portfolio',
    'projecten',
    'catalogus',
    'luis krötz',
    'luiskr.com',
    'portfolio',
    'webgl-experimenten',
  ],
  ca: [
    'cerca',
    'cerca al lloc',
    'troba',
    'cerca al portafoli',
    'projectes',
    'catàleg',
    'luis krötz',
    'luiskr.com',
    'portafoli',
    'experiments webgl',
  ],
  gl: [
    'busca',
    'busca no sitio',
    'atopar',
    'busca no portafolio',
    'proxectos',
    'catálogo',
    'luis krötz',
    'luiskr.com',
    'portafolio',
    'experimentos webgl',
  ],
  ga: [
    'cuardach',
    'cuardach sa láithreán',
    'aimsiú',
    'cuardach sa phunann',
    'tionscadail',
    'catalóg',
    'luis krötz',
    'luiskr.com',
    'punann',
    'turgnaimh webgl',
  ],
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

for (const [locale, themes] of Object.entries(TRANSLATIONS_MAP)) {
  const page = db.translations?.[locale]?.pages?.search

  if (!page) {
    console.warn(`⚠ ${locale}: no search page node — skipped`)
    continue
  }

  page[SEARCH_THEMES_KEY] = themes
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
console.log('✅ database.json patched with Search page themes across all locales.')
