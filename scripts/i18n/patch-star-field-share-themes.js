import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')

/**
 * Star Field share-capture vocabulary — one entry per locale:
 *   shareGallery  — section heading for the capture set on the emitted page.
 *   shareCapture  — singular noun for one capture (alt text / figcaption).
 *   searchThemes  — localized terms associating star/galaxy image searches
 *                   with the portfolio (keywords meta + JSON-LD keywords).
 * Dialect fallbacks mirror the earth patch: hrk → de, cas → es, riv → es,
 * gn → es + Guaraní terms, tln → it.
 */
const STAR_MAP = {
  en: {
    shareGallery: 'Share captures',
    shareCapture: 'Star render',
    searchThemes: [
      'star field',
      'star images',
      'galaxy render',
      '3d galaxy',
      'star map',
      'night sky',
      'stars from space',
      'exoplanet catalog',
      'star field experiment',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'front-end developer',
      'webgl experiment',
      'space',
      'astronomy',
    ],
  },
  br: {
    shareGallery: 'Capturas para compartilhar',
    shareCapture: 'Render estelar',
    searchThemes: [
      'campo estelar',
      'imagens de estrelas',
      'galáxia 3d',
      'mapa estelar',
      'céu noturno',
      'estrelas do espaço',
      'catálogo de exoplanetas',
      'experimento campo estelar',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfólio',
      'portfólio de luis krötz',
      'desenvolvedor front-end',
      'experimento webgl',
      'espaço',
      'astronomia',
    ],
  },
  es: {
    shareGallery: 'Capturas para compartir',
    shareCapture: 'Render estelar',
    searchThemes: [
      'campo estelar',
      'imágenes de estrellas',
      'galaxia 3d',
      'mapa estelar',
      'cielo nocturno',
      'estrellas del espacio',
      'catálogo de exoplanetas',
      'experimento campo estelar',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portafolio',
      'portafolio de luis krötz',
      'desarrollador front-end',
      'experimento webgl',
      'espacio',
      'astronomía',
    ],
  },
  de: {
    shareGallery: 'Aufnahmen zum Teilen',
    shareCapture: 'Stern-Rendering',
    searchThemes: [
      'sternenfeld',
      'sterne bilder',
      '3d-galaxie',
      'sternenkarte',
      'nachthimmel',
      'sterne aus dem weltall',
      'exoplaneten-katalog',
      'sternenfeld-experiment',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'luis krötz portfolio',
      'front-end-entwickler',
      'webgl-experiment',
      'weltraum',
      'astronomie',
    ],
  },
  gn: {
    shareGallery: "Mbyja ra'angakuéra",
    shareCapture: "Mbyja ra'anga",
    searchThemes: [
      'mbyja',
      "mbyja ra'angakuéra",
      'galaxia 3d',
      'mapa mbyja',
      'pyhare',
      "mbyja yvaga'ape",
      'mbyja tembiporu',
      'campo estelar',
      'imágenes de estrellas',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portafolio',
      'webgl tembiporu',
      'yvaga',
      'astronomía',
    ],
  },
  it: {
    shareGallery: 'Catture da condividere',
    shareCapture: 'Rendering stellare',
    searchThemes: [
      'campo stellare',
      'immagini di stelle',
      'galassia 3d',
      'mappa stellare',
      'cielo notturno',
      'stelle dallo spazio',
      'catalogo esopianeti',
      'esperimento campo stellare',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'portfolio di luis krötz',
      'sviluppatore front-end',
      'esperimento webgl',
      'spazio',
      'astronomia',
    ],
  },
  ru: {
    shareGallery: 'Снимки для публикации',
    shareCapture: 'Рендер звёзд',
    searchThemes: [
      'звёздное поле',
      'изображения звёзд',
      'галактика 3d',
      'карта звёздного неба',
      'ночное небо',
      'звёзды из космоса',
      'каталог экзопланет',
      'эксперимент звёздное поле',
      'луис крётц',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'портфолио',
      'портфолио луиса крётца',
      'фронтенд-разработчик',
      'webgl-эксперимент',
      'космос',
      'астрономия',
    ],
  },
  fr: {
    shareGallery: 'Captures à partager',
    shareCapture: 'Rendu stellaire',
    searchThemes: [
      'champ stellaire',
      "images d'étoiles",
      'galaxie 3d',
      'carte stellaire',
      'ciel nocturne',
      "étoiles depuis l'espace",
      "catalogue d'exoplanètes",
      'expérience champ stellaire',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'portfolio de luis krötz',
      'développeur front-end',
      'expérience webgl',
      'espace',
      'astronomie',
    ],
  },
  nl: {
    shareGallery: 'Captures om te delen',
    shareCapture: 'Sterren-rendering',
    searchThemes: [
      'sterrenveld',
      'sterrenbeelden',
      '3d-sterrenstelsel',
      'sterrenkaart',
      'nachtelijke hemel',
      'sterren vanuit de ruimte',
      'exoplaneten-catalogus',
      'sterrenveld-experiment',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portfolio',
      'luis krötz portfolio',
      'front-end-ontwikkelaar',
      'webgl-experiment',
      'ruimte',
      'astronomie',
    ],
  },
  ca: {
    shareGallery: 'Captures per compartir',
    shareCapture: 'Render estel·lar',
    searchThemes: [
      'camp estel·lar',
      "imatges d'estrelles",
      'galàxia 3d',
      'mapa estel·lar',
      'cel nocturn',
      "estrelles des de l'espai",
      "catàleg d'exoplanetes",
      'experiment camp estel·lar',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portafoli',
      'portafoli de luis krötz',
      'desenvolupador front-end',
      'experiment webgl',
      'espai',
      'astronomia',
    ],
  },
  gl: {
    shareGallery: 'Capturas para compartir',
    shareCapture: 'Render estelar',
    searchThemes: [
      'campo estelar',
      'imaxes de estrelas',
      'galaxia 3d',
      'mapa estelar',
      'ceo nocturno',
      'estrelas desde o espazo',
      'catálogo de exoplanetas',
      'experimento campo estelar',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'portafolio',
      'portafolio de luis krötz',
      'desenvolvedor front-end',
      'experimento webgl',
      'espazo',
      'astronomía',
    ],
  },
  ga: {
    shareGallery: 'Gabhálacha le roinnt',
    shareCapture: 'Rindreáil réaltaí',
    searchThemes: [
      'réimse réaltaí',
      'íomhánna réaltaí',
      'réaltra 3d',
      'léarscáil réaltaí',
      'spéir na hoíche',
      'réaltaí ó spás',
      'catalog exopláinéad',
      'turgnamh réimse réaltaí',
      'luis krötz',
      'luis krotz',
      'luiskr.com',
      'punann',
      'punann luis krötz',
      'forbróir front-end',
      'turgnamh webgl',
      'spás',
      'réalteolaíocht',
    ],
  },
}

// Regional-dialect fallbacks — same convention as the earth patch script.
STAR_MAP.hrk = { ...STAR_MAP.de }
STAR_MAP.cas = { ...STAR_MAP.es }
STAR_MAP.riv = { ...STAR_MAP.es }
STAR_MAP.tln = { ...STAR_MAP.it }

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

for (const [locale, data] of Object.entries(STAR_MAP)) {
  const page = db.translations[locale]?.pages?.['star-field']

  if (!page) continue

  page.shareGallery = data.shareGallery
  page.shareCapture = data.shareCapture
  page.searchThemes = data.searchThemes
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
console.log('✅ database.json patched with Star Field share themes across all locales.')
