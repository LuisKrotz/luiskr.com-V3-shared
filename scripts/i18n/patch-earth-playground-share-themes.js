import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')

/**
 * Earth Playground share-capture vocabulary — one entry per locale:
 *   shareGallery  — section heading for the capture set on the emitted page.
 *   shareCapture  — singular noun for one capture (alt text / figcaption).
 *   searchThemes  — localized terms that associate earth-image searches
 *                   with the portfolio (keywords meta + JSON-LD keywords).
 * Dialect fallbacks mirror patch-earth-playground-translations.js:
 * hrk → de, cas → es, riv → es, gn → es + Guaraní terms, tln → it.
 */
const TRANSLATIONS_MAP = {
  en: {
    shareGallery: 'Share captures',
    shareCapture: 'Earth render',
    searchThemes: [
      'earth',
      'earth images',
      'planet earth',
      '3d earth',
      'earth render',
      'webgl earth',
      'earth playground',
      'interactive earth simulation',
      'earth from space',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'front-end developer',
      'webgl experiment',
      'space',
      'planet',
    ],
  },
  br: {
    shareGallery: 'Capturas para compartilhar',
    shareCapture: 'Render da Terra',
    searchThemes: [
      'terra',
      'imagens da terra',
      'planeta terra',
      'terra 3d',
      'render da terra',
      'terra webgl',
      'playground da terra',
      'simulação interativa da terra',
      'terra vista do espaço',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfólio',
      'portfólio de luis krötz',
      'desenvolvedor front-end',
      'experimento webgl',
      'espaço',
      'planeta',
    ],
  },
  es: {
    shareGallery: 'Capturas para compartir',
    shareCapture: 'Render de la Tierra',
    searchThemes: [
      'tierra',
      'imágenes de la tierra',
      'planeta tierra',
      'tierra 3d',
      'render de la tierra',
      'tierra webgl',
      'playground de la tierra',
      'simulación interactiva de la tierra',
      'la tierra desde el espacio',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portafolio',
      'portafolio de luis krötz',
      'desarrollador front-end',
      'experimento webgl',
      'espacio',
      'planeta',
    ],
  },
  de: {
    shareGallery: 'Aufnahmen zum Teilen',
    shareCapture: 'Erde-Rendering',
    searchThemes: [
      'erde',
      'erde-bilder',
      'planet erde',
      '3d-erde',
      'erde-rendering',
      'webgl-erde',
      'erde-playground',
      'interaktive erde-simulation',
      'erde aus dem weltall',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'luis krötz portfolio',
      'front-end-entwickler',
      'webgl-experiment',
      'weltraum',
      'planet',
    ],
  },
  gn: {
    shareGallery: "Yvy ra'angakuéra",
    shareCapture: "Yvy ra'anga",
    searchThemes: [
      'yvy',
      "yvy ra'angakuéra",
      'planeta yvy',
      'yvy 3d',
      'yvy webgl',
      'yvy ñembosarái',
      'tierra',
      'imágenes de la tierra',
      'planeta tierra',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'luis krötz rembiapokue',
      'portafolio',
      'webgl tembiporu',
      'yvaga',
      'planeta',
    ],
  },
  it: {
    shareGallery: 'Catture da condividere',
    shareCapture: 'Rendering della Terra',
    searchThemes: [
      'terra',
      'immagini della terra',
      'pianeta terra',
      'terra 3d',
      'rendering della terra',
      'terra webgl',
      'playground della terra',
      'simulazione interattiva della terra',
      'la terra dallo spazio',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'portfolio di luis krötz',
      'sviluppatore front-end',
      'esperimento webgl',
      'spazio',
      'pianeta',
    ],
  },
  ru: {
    shareGallery: 'Снимки для публикации',
    shareCapture: 'Рендер Земли',
    searchThemes: [
      'земля',
      'изображения земли',
      'планета земля',
      'земля 3d',
      'рендер земли',
      'земля webgl',
      'земная песочница',
      'интерактивная симуляция земли',
      'земля из космоса',
      'луис крётц',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'портфолио',
      'портфолио луиса крётца',
      'фронтенд-разработчик',
      'webgl-эксперимент',
      'космос',
      'планета',
    ],
  },
  fr: {
    shareGallery: 'Captures à partager',
    shareCapture: 'Rendu de la Terre',
    searchThemes: [
      'terre',
      'images de la terre',
      'planète terre',
      'terre 3d',
      'rendu de la terre',
      'terre webgl',
      'playground de la terre',
      'simulation interactive de la terre',
      "la terre depuis l'espace",
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'portfolio de luis krötz',
      'développeur front-end',
      'expérience webgl',
      'espace',
      'planète',
    ],
  },
  nl: {
    shareGallery: 'Captures om te delen',
    shareCapture: 'Aarde-rendering',
    searchThemes: [
      'aarde',
      'aardbeelden',
      'planeet aarde',
      '3d-aarde',
      'aarde-rendering',
      'webgl-aarde',
      'aarde-playground',
      'interactieve aarde-simulatie',
      'de aarde vanuit de ruimte',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'luis krötz portfolio',
      'front-end-ontwikkelaar',
      'webgl-experiment',
      'ruimte',
      'planeet',
    ],
  },
  ca: {
    shareGallery: 'Captures per compartir',
    shareCapture: 'Render de la Terra',
    searchThemes: [
      'terra',
      'imatges de la terra',
      'planeta terra',
      'terra 3d',
      'render de la terra',
      'terra webgl',
      'playground de la terra',
      'simulació interactiva de la terra',
      "la terra des de l'espai",
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portafoli',
      'portafoli de luis krötz',
      'desenvolupador front-end',
      'experiment webgl',
      'espai',
      'planeta',
    ],
  },
  gl: {
    shareGallery: 'Capturas para compartir',
    shareCapture: 'Render da Terra',
    searchThemes: [
      'terra',
      'imaxes da terra',
      'planeta terra',
      'terra 3d',
      'render da terra',
      'terra webgl',
      'playground da terra',
      'simulación interactiva da terra',
      'a terra desde o espazo',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portafolio',
      'portafolio de luis krötz',
      'desenvolvedor front-end',
      'experimento webgl',
      'espazo',
      'planeta',
    ],
  },
  ga: {
    shareGallery: 'Gabhálacha le roinnt',
    shareCapture: 'Rindreáil an Domhain',
    searchThemes: [
      'domhan',
      'íomhánna an domhain',
      'an domhan',
      'domhan 3d',
      'rindreáil an domhain',
      'domhan webgl',
      'playground an domhain',
      'an domhan ó spás',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'punann',
      'punann luis krötz',
      'forbróir front-end',
      'turgnamh webgl',
      'spás',
      'pláinéad',
    ],
  },
}

// Regional-dialect fallbacks — same convention as the base patch script.
TRANSLATIONS_MAP.hrk = { ...TRANSLATIONS_MAP.de }
TRANSLATIONS_MAP.cas = { ...TRANSLATIONS_MAP.es }
TRANSLATIONS_MAP.riv = { ...TRANSLATIONS_MAP.es }
TRANSLATIONS_MAP.tln = { ...TRANSLATIONS_MAP.it }

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

for (const [locale, data] of Object.entries(TRANSLATIONS_MAP)) {
  if (!db.translations[locale]?.pages) continue

  for (const pageKey of ['earth-playground', 'space-playground']) {
    const page = db.translations[locale].pages[pageKey]

    if (!page) continue

    page.shareGallery = data.shareGallery
    page.shareCapture = data.shareCapture
    page.searchThemes = data.searchThemes
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
console.log('✅ database.json patched with Earth Playground share themes across all locales.')
