import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SEARCH_THEMES_KEY } from '../../../core/tokens/data/search-themes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')

/**
 * Site-wide search-theme vocabulary — extends the share-capture
 * `searchThemes` convention (patch-*-share-themes.js, which seeded the
 * earth-playground / star-field lists) to EVERY page node and EVERY
 * project, in all 16 locales, with terms DERIVED FROM THE CONTENT so
 * each list describes what the page actually contains (the queries it
 * should rank for), not a generic boilerplate tail:
 *
 *   - projects   → cover/media labels (localized, content-specific
 *     phrases like "Bill Amberg studio Moore Giles collection"),
 *     first section text, title + slug words, PROJECT_TAGS proper
 *     nouns, PROJECT_TAIL + SHARED.
 *   - HOME       → portfoliolist labels (localized project names) +
 *     PAGE_TERMS + SHARED.
 *   - about      → mention_items award/press descriptions + PAGE_TERMS.
 *   - contact    → components.contact line descriptions + PAGE_TERMS.
 *   - legal      → every authored section title (localized) + PAGE_TERMS.
 *   - animations → every components.animations alt sentence (localized
 *     "how it moves" phrases) + PAGE_TERMS.
 *   - star-field → existing hand-tuned list PRESERVED + localized nav
 *     labels (solar/milkyWay/nebulae/galaxies/catalog…).
 *   - earth-playground → existing hand-tuned list PRESERVED + localized
 *     control-group labels (camera/earth/postFx/engine…).
 *
 * The lists feed <meta name="keywords"> (Yandex/Bing/DuckDuckGo still
 * read it), the WebPage JSON-LD `keywords` property Google reads,
 * image:caption sitemap tags and the /llm/ replicas'
 * `content.searchThemes`.
 *
 * `pages.contact` is created — it previously didn't exist as a CMS
 * node (the contact section reads `components.contact`); the sparse
 * node only carries searchThemes for the /contact route.
 *
 * Dialect fallbacks mirror the base patch scripts:
 * hrk → de, cas → es, riv → es, tln → it; gn keeps authored terms.
 */

// ── Shared identity tail — appended to every list ────────────────────────────
const SHARED = {
  en: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'portfolio',
    'front-end developer',
    'web developer',
    'software engineer',
    'javascript',
    'css',
    'webgl',
  ],
  br: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'portfólio',
    'portfólio de luis krötz',
    'desenvolvedor front-end',
    'desenvolvedor web',
    'engenheiro de software',
    'javascript',
    'css',
    'webgl',
  ],
  es: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'portafolio',
    'portafolio de luis krötz',
    'desarrollador front-end',
    'desarrollador web',
    'ingeniero de software',
    'javascript',
    'css',
    'webgl',
  ],
  de: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'portfolio',
    'luis krötz portfolio',
    'front-end-entwickler',
    'webentwickler',
    'softwareentwickler',
    'javascript',
    'css',
    'webgl',
  ],
  gn: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'luis krötz rembiapokue',
    'portafolio',
    "mba'apohaguasúi front-end",
    'javascript',
    'webgl tembiporu',
  ],
  it: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'portfolio',
    'portfolio di luis krötz',
    'sviluppatore front-end',
    'sviluppatore web',
    'ingegnere del software',
    'javascript',
    'css',
    'webgl',
  ],
  ru: [
    'луис крётц',
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'портфолио',
    'портфолио луиса крётца',
    'фронтенд-разработчик',
    'веб-разработчик',
    'инженер-программист',
    'javascript',
    'css',
    'webgl',
  ],
  fr: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'portfolio',
    'portfolio de luis krötz',
    'développeur front-end',
    'développeur web',
    'ingénieur logiciel',
    'javascript',
    'css',
    'webgl',
  ],
  nl: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'portfolio',
    'luis krötz portfolio',
    'front-end-ontwikkelaar',
    'webontwikkelaar',
    'software-ingenieur',
    'javascript',
    'css',
    'webgl',
  ],
  ca: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'portafoli',
    'portafoli de luis krötz',
    'desenvolupador front-end',
    'desenvolupador web',
    'enginyer de programari',
    'javascript',
    'css',
    'webgl',
  ],
  gl: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'portafolio',
    'portafolio de luis krötz',
    'desenvolvedor front-end',
    'desenvolvedor web',
    'enxeñeiro de software',
    'javascript',
    'css',
    'webgl',
  ],
  ga: [
    'luis krötz',
    'luis krotz',
    'luiskr.com',
    'punann',
    'punann luis krötz',
    'forbróir front-end',
    'forbróir gréasáin',
    'innealtóir bogearraí',
    'javascript',
    'css',
    'webgl',
  ],
}

// ── Localized topical terms per page node ────────────────────────────────────
const PAGE_TERMS = {
  en: {
    HOME: [
      'web portfolio',
      'developer portfolio',
      'front-end portfolio',
      'creative developer',
      'ui ux developer',
      'web design portfolio',
      'interactive portfolio',
      'creative coder',
    ],
    about: [
      'about',
      'about luis krötz',
      'bio',
      'biography',
      'ux developer',
      'css animation specialist',
      'dell design system',
      'dell',
      'software engineer brazil',
      'awwwards developer',
    ],
    contact: [
      'contact',
      'contact luis krötz',
      'hire front-end developer',
      'email',
      'freelance developer',
      'hire web developer',
      'get in touch',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'privacy policy',
      'privacy',
      'data protection',
      'cookie policy',
      'data privacy',
    ],
    GDPR: [
      'gdpr',
      'general data protection regulation',
      'data protection',
      'data privacy',
      'personal data',
    ],
    'terms-of-use': ['terms of use', 'terms of service', 'terms and conditions', 'legal terms'],
    license: ['license', 'licence', 'site license', 'copyright', 'all rights reserved'],
    animations: [
      'animations',
      'web animations',
      'css animations',
      'javascript animations',
      'webgl animation',
      'ui animations',
      'motion design',
      'animation reference',
      'animation examples',
      'how to code animations',
      'how to animate css',
      'frontend animation tutorial',
    ],
    'not-found': ['404', 'page not found', 'not found'],
  },
  br: {
    HOME: [
      'portfólio web',
      'portfólio de desenvolvedor',
      'portfólio front-end',
      'desenvolvedor criativo',
      'desenvolvedor ui ux',
      'portfólio de design web',
      'portfólio interativo',
      'programador criativo',
    ],
    about: [
      'sobre',
      'sobre luis krötz',
      'biografia',
      'desenvolvedor ux',
      'especialista em animação css',
      'dell design system',
      'dell',
      'engenheiro de software brasil',
    ],
    contact: [
      'contato',
      'contato luis krötz',
      'contratar desenvolvedor front-end',
      'e-mail',
      'desenvolvedor freelance',
      'contratar desenvolvedor web',
      'fale comigo',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'política de privacidade',
      'privacidade',
      'proteção de dados',
      'política de cookies',
      'lgpd',
    ],
    GDPR: ['lgpd', 'gdpr', 'proteção de dados', 'dados pessoais', 'privacidade de dados'],
    'terms-of-use': ['termos de uso', 'termos de serviço', 'termos e condições', 'termos legais'],
    license: ['licença', 'licença do site', 'direitos autorais', 'todos os direitos reservados'],
    animations: [
      'animações',
      'animações web',
      'animações css',
      'animações javascript',
      'animação webgl',
      'animações de ui',
      'motion design',
      'referência de animações',
      'exemplos de animação',
      'como programar animações',
      'como animar css',
      'tutorial de animação front-end',
    ],
    'not-found': ['404', 'página não encontrada', 'não encontrado'],
  },
  es: {
    HOME: [
      'portafolio web',
      'portafolio de desarrollador',
      'portafolio front-end',
      'desarrollador creativo',
      'desarrollador ui ux',
      'portafolio de diseño web',
      'portafolio interactivo',
      'programador creativo',
    ],
    about: [
      'sobre mí',
      'sobre luis krötz',
      'biografía',
      'desarrollador ux',
      'especialista en animación css',
      'dell design system',
      'dell',
      'ingeniero de software brasil',
    ],
    contact: [
      'contacto',
      'contacto luis krötz',
      'contratar desarrollador front-end',
      'correo electrónico',
      'desarrollador freelance',
      'contratar desarrollador web',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'política de privacidad',
      'privacidad',
      'protección de datos',
      'política de cookies',
      'privacidad de datos',
    ],
    GDPR: ['rgpd', 'gdpr', 'protección de datos', 'datos personales', 'privacidad de datos'],
    'terms-of-use': [
      'términos de uso',
      'términos de servicio',
      'términos y condiciones',
      'términos legales',
    ],
    license: [
      'licencia',
      'licencia del sitio',
      'derechos de autor',
      'todos los derechos reservados',
    ],
    animations: [
      'animaciones',
      'animaciones web',
      'animaciones css',
      'animaciones javascript',
      'animación webgl',
      'animaciones de ui',
      'motion design',
      'referencia de animaciones',
      'ejemplos de animación',
      'cómo programar animaciones',
      'cómo animar css',
      'tutorial de animación front-end',
    ],
    'not-found': ['404', 'página no encontrada', 'no encontrado'],
  },
  de: {
    HOME: [
      'web-portfolio',
      'entwickler-portfolio',
      'front-end-portfolio',
      'kreativer entwickler',
      'ui-ux-entwickler',
      'webdesign-portfolio',
      'interaktives portfolio',
      'kreativer programmierer',
    ],
    about: [
      'über mich',
      'über luis krötz',
      'biografie',
      'ux-entwickler',
      'css-animationsspezialist',
      'dell design system',
      'dell',
      'softwareentwickler brasilien',
    ],
    contact: [
      'kontakt',
      'kontakt luis krötz',
      'front-end-entwickler beauftragen',
      'e-mail',
      'freiberuflicher entwickler',
      'webentwickler beauftragen',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'datenschutzerklärung',
      'datenschutz',
      'cookie-richtlinie',
      'datenprivatsphäre',
    ],
    GDPR: ['dsgvo', 'gdpr', 'datenschutz-grundverordnung', 'personenbezogene daten', 'datenschutz'],
    'terms-of-use': [
      'nutzungsbedingungen',
      'allgemeine geschäftsbedingungen',
      'rechtliche hinweise',
    ],
    license: ['lizenz', 'website-lizenz', 'urheberrecht', 'alle rechte vorbehalten'],
    animations: [
      'animationen',
      'web-animationen',
      'css-animationen',
      'javascript-animationen',
      'webgl-animation',
      'ui-animationen',
      'motion design',
      'animations-referenz',
      'animations-beispiele',
      'animationen programmieren',
      'css animieren',
      'frontend-animations-tutorial',
    ],
    'not-found': ['404', 'seite nicht gefunden', 'nicht gefunden'],
  },
  gn: {
    HOME: [
      'portafolio web',
      "mba'apohaguasúi portafolio",
      'front-end portafolio',
      'web mohãngahu',
      'portafolio interactivo',
    ],
    about: [
      'luis krötz rehegua',
      'tembiasakue',
      "mba'apohaguasúi",
      'css animación',
      'dell design system',
      'dell',
      'brasil',
    ],
    contact: [
      "ñe'ẽveve",
      "luis krötz ñe'ẽveve",
      "mba'apohaguasúi jepikuaau",
      'e-mail',
      'linkedin',
      'github',
    ],
    'privacy-policy': ['tekorã porarã', 'privacidad', 'kuaarã ñemoĩporã'],
    GDPR: ['gdpr', 'kuaarã ñemoĩporã', "kuaarã nemba'éva", 'privacidad'],
    'terms-of-use': ['jeporu jejoko', 'jeporu rehegua'],
    license: ['licencia', 'derecho de autor'],
    animations: [
      'animación',
      'animación web',
      'animación css',
      'animación javascript',
      'motion design',
      'animación webgl',
    ],
    'not-found': ['404', 'kuatiarogue ndojuhúiva'],
  },
  it: {
    HOME: [
      'portfolio web',
      'portfolio di sviluppatore',
      'portfolio front-end',
      'sviluppatore creativo',
      'sviluppatore ui ux',
      'portfolio di web design',
      'portfolio interattivo',
      'programmatore creativo',
    ],
    about: [
      'chi sono',
      'su luis krötz',
      'biografia',
      'sviluppatore ux',
      'specialista in animazione css',
      'dell design system',
      'dell',
      'ingegnere del software brasile',
    ],
    contact: [
      'contatti',
      'contatta luis krötz',
      'assumi sviluppatore front-end',
      'email',
      'sviluppatore freelance',
      'assumi sviluppatore web',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'informativa sulla privacy',
      'privacy',
      'protezione dei dati',
      'politica sui cookie',
    ],
    GDPR: ['gdpr', 'regolamento generale sulla protezione dei dati', 'dati personali', 'privacy'],
    'terms-of-use': ['termini di utilizzo', 'termini di servizio', 'termini e condizioni'],
    license: ['licenza', 'licenza del sito', "diritto d'autore", 'tutti i diritti riservati'],
    animations: [
      'animazioni',
      'animazioni web',
      'animazioni css',
      'animazioni javascript',
      'animazione webgl',
      'animazioni ui',
      'motion design',
      'riferimento animazioni',
      'esempi di animazione',
      'come programmare animazioni',
      'come animare css',
      'tutorial animazione front-end',
    ],
    'not-found': ['404', 'pagina non trovata', 'non trovato'],
  },
  ru: {
    HOME: [
      'веб-портфолио',
      'портфолио разработчика',
      'портфолио фронтенд-разработчика',
      'креативный разработчик',
      'ui ux разработчик',
      'портфолио веб-дизайна',
      'интерактивное портфолио',
      'креативный программист',
    ],
    about: [
      'обо мне',
      'о луисе крётце',
      'биография',
      'ux-разработчик',
      'специалист по css-анимации',
      'dell design system',
      'dell',
      'инженер-программист бразилия',
    ],
    contact: [
      'контакты',
      'связаться с луисом крётцем',
      'нанять фронтенд-разработчика',
      'электронная почта',
      'разработчик фриланс',
      'нанять веб-разработчика',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'политика конфиденциальности',
      'конфиденциальность',
      'защита данных',
      'политика cookie',
    ],
    GDPR: ['gdpr', 'общий регламент защиты данных', 'персональные данные', 'защита данных'],
    'terms-of-use': ['условия использования', 'условия обслуживания', 'правовые условия'],
    license: ['лицензия', 'лицензия сайта', 'авторское право', 'все права защищены'],
    animations: [
      'анимации',
      'веб-анимации',
      'css-анимации',
      'javascript-анимации',
      'webgl-анимация',
      'ui-анимации',
      'моушн-дизайн',
      'справочник анимаций',
      'примеры анимаций',
      'как программировать анимации',
      'как анимировать css',
      'урок анимации фронтенд',
    ],
    'not-found': ['404', 'страница не найдена', 'не найдено'],
  },
  fr: {
    HOME: [
      'portfolio web',
      'portfolio de développeur',
      'portfolio front-end',
      'développeur créatif',
      'développeur ui ux',
      'portfolio de web design',
      'portfolio interactif',
      'programmeur créatif',
    ],
    about: [
      'à propos',
      'à propos de luis krötz',
      'biographie',
      'développeur ux',
      'spécialiste en animation css',
      'dell design system',
      'dell',
      'ingénieur logiciel brésil',
    ],
    contact: [
      'contact',
      'contacter luis krötz',
      'embaucher développeur front-end',
      'e-mail',
      'développeur freelance',
      'embaucher développeur web',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'politique de confidentialité',
      'confidentialité',
      'protection des données',
      'politique des cookies',
    ],
    GDPR: [
      'rgpd',
      'gdpr',
      'règlement général sur la protection des données',
      'données personnelles',
    ],
    'terms-of-use': [
      "conditions d'utilisation",
      'conditions de service',
      'termes et conditions',
      'mentions légales',
    ],
    license: ['licence', 'licence du site', "droits d'auteur", 'tous droits réservés'],
    animations: [
      'animations',
      'animations web',
      'animations css',
      'animations javascript',
      'animation webgl',
      'animations ui',
      'motion design',
      "référence d'animations",
      "exemples d'animation",
      'comment programmer des animations',
      'comment animer en css',
      "tutoriel d'animation front-end",
    ],
    'not-found': ['404', 'page non trouvée', 'introuvable'],
  },
  nl: {
    HOME: [
      'webportfolio',
      'ontwikkelaarsportfolio',
      'front-end portfolio',
      'creatieve ontwikkelaar',
      'ui ux ontwikkelaar',
      'webdesign portfolio',
      'interactief portfolio',
      'creatieve programmeur',
    ],
    about: [
      'over mij',
      'over luis krötz',
      'biografie',
      'ux-ontwikkelaar',
      'css-animatiespecialist',
      'dell design system',
      'dell',
      'software-ingenieur brazilië',
    ],
    contact: [
      'contact',
      'contact luis krötz',
      'front-end ontwikkelaar inhuren',
      'e-mail',
      'freelance ontwikkelaar',
      'webontwikkelaar inhuren',
      'linkedin',
      'github',
    ],
    'privacy-policy': ['privacybeleid', 'privacy', 'gegevensbescherming', 'cookiebeleid'],
    GDPR: ['avg', 'gdpr', 'algemene verordening gegevensbescherming', 'persoonsgegevens'],
    'terms-of-use': ['gebruiksvoorwaarden', 'servicevoorwaarden', 'algemene voorwaarden'],
    license: ['licentie', 'sitelicentie', 'auteursrecht', 'alle rechten voorbehouden'],
    animations: [
      'animaties',
      'webanimaties',
      'css-animaties',
      'javascript-animaties',
      'webgl-animatie',
      'ui-animaties',
      'motion design',
      'animatiereferentie',
      'animatievoorbeelden',
      'animaties programmeren',
      'css animeren',
      'frontend-animatietutorial',
    ],
    'not-found': ['404', 'pagina niet gevonden', 'niet gevonden'],
  },
  ca: {
    HOME: [
      'portafoli web',
      'portafoli de desenvolupador',
      'portafoli front-end',
      'desenvolupador creatiu',
      'desenvolupador ui ux',
      'portafoli de disseny web',
      'portafoli interactiu',
      'programador creatiu',
    ],
    about: [
      'sobre mi',
      'sobre luis krötz',
      'biografia',
      'desenvolupador ux',
      'especialista en animació css',
      'dell design system',
      'dell',
      'enginyer de programari brasil',
    ],
    contact: [
      'contacte',
      'contacte luis krötz',
      'contractar desenvolupador front-end',
      'correu electrònic',
      'desenvolupador freelance',
      'contractar desenvolupador web',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'política de privacitat',
      'privacitat',
      'protecció de dades',
      'política de cookies',
    ],
    GDPR: ['rgpd', 'gdpr', 'reglament general de protecció de dades', 'dades personals'],
    'terms-of-use': ["condicions d'ús", 'condicions del servei', 'termes i condicions'],
    license: ['llicència', 'llicència del lloc', "drets d'autor", 'tots els drets reservats'],
    animations: [
      'animacions',
      'animacions web',
      'animacions css',
      'animacions javascript',
      'animació webgl',
      'animacions ui',
      'motion design',
      "referència d'animacions",
      "exemples d'animació",
      'com programar animacions',
      'com animar css',
      "tutorial d'animació front-end",
    ],
    'not-found': ['404', 'pàgina no trobada', 'no trobat'],
  },
  gl: {
    HOME: [
      'portafolio web',
      'portafolio de desenvolvedor',
      'portafolio front-end',
      'desenvolvedor creativo',
      'desenvolvedor ui ux',
      'portafolio de deseño web',
      'portafolio interactivo',
      'programador creativo',
    ],
    about: [
      'sobre min',
      'sobre luis krötz',
      'biografía',
      'desenvolvedor ux',
      'especialista en animación css',
      'dell design system',
      'dell',
      'enxeñeiro de software brasil',
    ],
    contact: [
      'contacto',
      'contacto luis krötz',
      'contratar desenvolvedor front-end',
      'correo electrónico',
      'desenvolvedor freelance',
      'contratar desenvolvedor web',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'política de privacidade',
      'privacidade',
      'protección de datos',
      'política de cookies',
    ],
    GDPR: ['rgpd', 'gdpr', 'protección de datos', 'datos persoais', 'privacidade de datos'],
    'terms-of-use': ['termos de uso', 'termos do servizo', 'termos e condicións'],
    license: ['licenza', 'licenza do sitio', 'dereitos de autor', 'todos os dereitos reservados'],
    animations: [
      'animacións',
      'animacións web',
      'animacións css',
      'animacións javascript',
      'animación webgl',
      'animacións ui',
      'motion design',
      'referencia de animacións',
      'exemplos de animación',
      'como programar animacións',
      'como animar css',
      'tutorial de animación front-end',
    ],
    'not-found': ['404', 'páxina non atopada', 'non atopado'],
  },
  ga: {
    HOME: [
      'punann gréasáin',
      'punann forbróra',
      'punann front-end',
      'forbróir cruthaitheach',
      'punann dearadh gréasáin',
      'punann idirghníomhach',
      'ríomhchláraitheoir cruthaitheach',
    ],
    about: [
      'fúmsa',
      'faoi luis krötz',
      'beathaisnéis',
      'forbróir ux',
      'speisialtóir beochana css',
      'dell design system',
      'dell',
      'innealtóir bogearraí an bhrasaíl',
    ],
    contact: [
      'teagmháil',
      'déan teagmháil le luis krötz',
      'forbróir front-end a fhostú',
      'ríomhphost',
      'forbróir saorghairm',
      'forbróir gréasáin a fhostú',
      'linkedin',
      'github',
    ],
    'privacy-policy': [
      'beartas príobháideachta',
      'príobháideachas',
      'cosaint sonraí',
      'beartas fianán',
    ],
    GDPR: ['gdpr', 'rialachán ginearálta cosanta sonraí', 'sonraí pearsanta'],
    'terms-of-use': ['téarmaí úsáide', 'téarmaí seirbhíse', 'téarmaí agus coinníollacha'],
    license: ['ceadúnas', 'ceadúnas an tsuímh', 'cóipcheart', 'gach ceart ar cosaint'],
    animations: [
      'beocha',
      'beochana gréasáin',
      'beochana css',
      'beochana javascript',
      'beochan webgl',
      'dearadh gluaisne',
      'samplaí beochana',
      'conas beochana a chlárú',
    ],
    'not-found': ['404', 'leathanach gan aimsiú', 'gan aimsiú'],
  },
}

// ── Project topical tags — brand/proper-noun terms are locale-neutral ────────
const PROJECT_TAGS = {
  'dell-design-system': [
    'dell design system',
    'dell',
    'dell technologies',
    'design system',
    'design tokens',
    'component library',
    'ui components',
    'design language',
  ],
  aboutmarco: ['marco almeida', 'about marco', 'photography portfolio', 'pixel perfect'],
  cecerele: ['cecerelê', 'cecerelê cegonha', 'e-commerce', 'illuria', 'baby products'],
  cicb: [
    'brazilian leather',
    'cicb',
    'leather industry',
    'apex-brasil',
    'leather',
    'brazil leather',
  ],
  coza: ['coza', 'brinox', 'content feed', 'kitchenware', 'houseware'],
  melissa: ['melissa', 'melissa shoes', 'grendene', 'plastic shoes', 'brand portal', 'fashion'],
  metcha: ['metcha', 'leather naturally', 'leather', 'transa', 'leather design', 'oracle'],
  'mini-melissa': ['mini melissa', 'melissa', 'grendene', 'kids shoes', 'content feed'],
  mor: ['mor', 'mor utilidades', 'houseware', 'brand hub', 'kitchenware'],
  'nathalia-bond': ['nathalia bond', 'squarespace', 'redesign', 'web redesign'],
  sage: ['sageweb', 'sage', 'fiscal software', 'genesysinf', 'erp'],
  transa: ['transa', 'transa inc', 'agency', 'infinite scroll', 'custom cms'],
  vibra: ['vibra', 'vibra agilize', 'brand portal', 'energy'],
}

// ── Localized generic project tail ("case study", "web project", …) ──────────
const PROJECT_TAIL = {
  en: ['web project', 'case study', 'web design', 'website development', 'front-end project'],
  br: [
    'projeto web',
    'estudo de caso',
    'design web',
    'desenvolvimento de site',
    'projeto front-end',
  ],
  es: [
    'proyecto web',
    'caso de estudio',
    'diseño web',
    'desarrollo de sitio web',
    'proyecto front-end',
  ],
  de: ['webprojekt', 'fallstudie', 'webdesign', 'website-entwicklung', 'front-end-projekt'],
  gn: ['web apopyrã', 'web mohãngahu', 'front-end apopyrã'],
  it: ['progetto web', 'caso di studio', 'web design', 'sviluppo sito web', 'progetto front-end'],
  ru: ['веб-проект', 'кейс', 'веб-дизайн', 'разработка сайта', 'фронтенд-проект'],
  fr: ['projet web', 'étude de cas', 'web design', 'développement de site web', 'projet front-end'],
  nl: ['webproject', 'case study', 'webdesign', 'website-ontwikkeling', 'front-end project'],
  ca: [
    'projecte web',
    'estudi de cas',
    'disseny web',
    'desenvolupament de lloc web',
    'projecte front-end',
  ],
  gl: [
    'proxecto web',
    'estudo de caso',
    'deseño web',
    'desenvolvemento de sitio web',
    'proxecto front-end',
  ],
  ga: [
    'tionscadal gréasáin',
    'cás-staidéar',
    'dearadh gréasáin',
    'forbairt suímh gréasáin',
    'tionscadal front-end',
  ],
}

// Page nodes that receive searchThemes — 'contact' is created as a
// sparse node (the contact section itself reads components.contact, no
// page node existed). star-field/earth-playground keep their existing
// hand-tuned lists; the derivation only APPENDS localized page labels.
const PAGE_KEYS = [
  'HOME',
  'about',
  'contact',
  'privacy-policy',
  'GDPR',
  'terms-of-use',
  'license',
  'animations',
  'not-found',
  'star-field',
  'earth-playground',
]

// Regional-dialect fallbacks — same convention as the base patch scripts.
SHARED.hrk = SHARED.de
SHARED.cas = SHARED.es
SHARED.riv = SHARED.es
SHARED.tln = SHARED.it
PROJECT_TAIL.hrk = PROJECT_TAIL.de
PROJECT_TAIL.cas = PROJECT_TAIL.es
PROJECT_TAIL.riv = PROJECT_TAIL.es
PROJECT_TAIL.tln = PROJECT_TAIL.it
PAGE_TERMS.hrk = PAGE_TERMS.de
PAGE_TERMS.cas = PAGE_TERMS.es
PAGE_TERMS.riv = PAGE_TERMS.es
PAGE_TERMS.tln = PAGE_TERMS.it

const dedupe = (arr) => [...new Set(arr.map((s) => String(s).toLowerCase().trim()))].filter(Boolean)

/** Strips CMS rich-text markup to plain text — <br>, tags, entities. */
const stripHtml = (s) =>
  String(s || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()

/** Trims one candidate to a keyword-length phrase — '' drops it. */
const term = (s, max = 80) => {
  const t = stripHtml(s)

  return t.length <= max ? t : t.slice(0, max).trimEnd()
}

/** First plain-text string inside a nested sections array. */
const firstText = (node) => {
  if (typeof node === 'string') return node

  if (Array.isArray(node)) {
    for (const item of node) {
      const found = firstText(item)

      if (found) return found
    }
  }

  return ''
}

/** Every labelled media descriptor inside project sections (cover first). */
const mediaLabels = (project, cap = 15) => {
  const labels = []

  const walk = (o) => {
    if (labels.length >= cap) return

    if (Array.isArray(o)) {
      for (const c of o) walk(c)

      return
    }

    // "METCHA ARTICLE: <phrase>" → "<phrase> metcha" — the article
    // marker is editorial furniture, the brand is the search term.
    if (o && typeof o === 'object' && o.src && o.label) {
      labels.push(term(String(o.label).replace(/^(\S{1,30})\s+ARTICLE:\s*(.+)$/i, '$2 $1'), 80))
    }
  }

  if (project?.cover?.label) labels.push(term(project.cover.label))

  walk(project?.sections)

  return labels.filter(Boolean)
}

/** Content-derived terms for one page node — what the page actually
 *  contains, in the locale's own words. */
const derivedPageTerms = (tr, key) => {
  const page = tr.pages?.[key] || {}

  switch (key) {
    case 'HOME':
      return [
        ...(page.portfoliolist || []).map((i) => term(i?.label, 60)),
        term(page.featured || page.message, 60),
      ]

    case 'about':
      // Mention rows are "date:<br>Award name" — the post-<br> fragment
      // is the searchable award/press phrase.
      return (page.mention_items || [])
        .map((m) =>
          term(
            String(m?.description || '')
              .split(/<br\s*\/?>/i)
              .pop(),
            80
          )
        )
        .slice(0, 12)

    case 'contact': {
      const c = tr.components?.contact || {}

      return [...(c.line1 || []), ...(c.line2 || [])].map((i) => term(i?.description, 40))
    }

    case 'privacy-policy':
    case 'GDPR':
    case 'terms-of-use':
    case 'license':
      return (page.sections || []).map((s) => term(s?.title, 80))

    case 'animations':
      // Each record's localized alt reads as a "what/how it animates"
      // phrase — the exact query shape animation searches take.
      return Object.values(tr.components?.animations || {})
        .map((r) => term(r?.alt, 80))
        .slice(0, 20)

    case 'star-field':
      return [
        page.solar,
        page.milkyWay,
        page.nebulae,
        page.galaxies,
        page.satellite,
        page.catalog,
        page.records,
      ].map((s) => term(s, 60))

    case 'earth-playground':
      return [
        page.experienceSettings,
        page.camera,
        page.earth,
        page.engine,
        page.postFx,
        page.copyConstants,
      ].map((s) => term(s, 60))

    case 'not-found':
      return [term(page.title, 60)]

    default:
      return []
  }
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

let patchedPages = 0
let patchedProjects = 0

for (const [locale, shared] of Object.entries(SHARED)) {
  const tr = db.translations[locale]

  if (!tr?.pages) continue

  const pageTerms = PAGE_TERMS[locale] || {}

  for (const key of PAGE_KEYS) {
    // star-field/earth-playground keep their hand-tuned list first
    // (patch-*-share-themes.js authored it); every other page's list
    // is fully owned by this patch — rebuilt from scratch each run so
    // re-runs stay idempotent.
    const preserve = key === 'star-field' || key === 'earth-playground'
    const existing =
      preserve && Array.isArray(tr.pages[key]?.[SEARCH_THEMES_KEY])
        ? tr.pages[key][SEARCH_THEMES_KEY]
        : []

    tr.pages[key] = tr.pages[key] || {}
    tr.pages[key][SEARCH_THEMES_KEY] = dedupe([
      ...existing,
      ...derivedPageTerms(tr, key),
      ...(pageTerms[key] || []),
      ...shared,
    ])
    patchedPages++
  }

  const tail = PROJECT_TAIL[locale] || PROJECT_TAIL.en

  for (const [slug, project] of Object.entries(tr.projects || {})) {
    const titleTerm = String(project?.title || slug).toLowerCase()

    project[SEARCH_THEMES_KEY] = dedupe([
      titleTerm,
      slug.replace(/-/g, ' '),
      ...mediaLabels(project),
      term(firstText(project?.sections), 80),
      ...(PROJECT_TAGS[slug] || []),
      ...tail,
      ...shared,
    ])
    patchedProjects++
  }
}

fs.writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`, 'utf8')
console.log(
  `✅ database.json patched — searchThemes on ${patchedPages} page nodes and ${patchedProjects} projects across ${Object.keys(SHARED).length} locales.`
)
