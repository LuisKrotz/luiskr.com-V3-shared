import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')

/**
 * Patches the remaining untranslated UI gaps across all locales — the
 * leaves that were still holding English values (legal-footer links,
 * featured label, docs-portal strings, pref labels, OFF toggle, star-field
 * vocabulary for tln) — and transliterates every name/label to Cyrillic
 * for `ru` per the "all names in Cyrillic" directive.
 *
 * Keys are dot-paths into db.translations[locale]; array indexes are
 * numeric segments. Only listed paths are written — everything else is
 * left untouched. Cognates that are already correct in the target
 * language (e.g. "Normal" in pt/es/de, "Contact" in fr/nl) are
 * intentionally absent.
 */
const PATCH = {
  br: {
    'APP.engine.off': 'DESLIGADO',
    'components.source-code.label': 'CÓDIGO-FONTE DO PROJETO:',
    'components.docs-portal.title': 'Documentação detalhada dos projetos',
  },
  es: {
    'APP.pref.appearance.system.label': 'Sistema',
    'APP.pref.motion.reduced.label': 'Reducido',
    'APP.engine.off': 'APAGADO',
    'components.legal-footer.links.0.page': 'Inicio',
    'components.docs-portal.title': 'Documentación detallada de los proyectos',
  },
  cas: {
    'APP.pref.appearance.system.label': 'Sistema',
    'APP.pref.motion.reduced.label': 'Reducido',
    'APP.engine.off': 'APAGADO',
    'components.legal-footer.links.0.page': 'Inicio',
    'components.docs-portal.title': 'Documentación detallada de los proyectos',
  },
  de: {
    'APP.pref.motion.reduced.label': 'Reduziert',
    'APP.engine.off': 'AUS',
    'components.legal-footer.links.0.page': 'Startseite',
    'components.docs-portal.title': 'Ausführliche Projektdokumentation',
    'pages.star-field.catalog': 'Deep-Sky-Katalog',
  },
  hrk: {
    'APP.featured': 'Ausgewählte Arbeiten',
    'pages.HOME.featured': 'Ausgewählte Arbeiten',
    'APP.pref.motion.reduced.label': 'Reduziert',
    'APP.engine.off': 'AUS',
    'components.legal-footer.links.0.page': 'Startseite',
    'components.legal-footer.links.1.page': 'Datenschutzrichtlinie',
    'components.legal-footer.links.3.page': 'Nutzungsbedingungen',
    'components.docs-portal.title': 'Ausführliche Projektdokumentation',
    'components.docs-portal.description': 'Nur auf Englisch verfügbar',
    'components.docs-portal.copyToast':
      'Auf dieser Seite ist Kopieren nicht erlaubt — lade den Quelltext auf GitHub herunter.',
    'pages.star-field.catalog': 'Deep-Sky-Katalog',
  },
  riv: {
    'APP.featured': 'Trabalhos selecionados',
    'pages.HOME.featured': 'Trabalhos selecionados',
    'APP.engine.off': 'DESLIGADO',
    'components.legal-footer.links.0.page': 'Início',
    'components.legal-footer.links.1.page': 'Política de Privacidade',
    'components.legal-footer.links.3.page': 'Termos de Uso',
    'components.source-code.label': 'CÓDIGO-FONTE DO PROJETO:',
    'components.docs-portal.title': 'Documentação detalhada dos projetos',
    'components.docs-portal.description': 'Disponível apenas em inglês',
    'components.docs-portal.copyToast':
      'Esta página não permite copiar — baixe o código-fonte no GitHub.',
    'pages.star-field.exoplanet': 'Exoplaneta',
  },
  gn: {
    'APP.featured': "Mba'apopy poravopyre",
    'pages.HOME.featured': "Mba'apopy poravopyre",
    'APP.engine.off': 'JOKO',
    'components.legal-footer.links.0.page': 'Ñepyrũha',
    'components.legal-footer.links.1.page': 'Ñemigua Política',
    'components.legal-footer.links.3.page': "Jeporu Py'apy",
    'components.docs-portal.title': 'Kuatiaite tembiapo rehegua',
    'components.docs-portal.description': 'Inglés añoite',
    'components.docs-portal.copyToast': 'Ko kuatiarogue nomoneĩri jokuái — emboguejy GitHub guive.',
    'pages.terms-of-use.sections.6.title': 'Opaite',
  },
  it: {
    'APP.pref.appearance.system.label': 'Sistema',
    'APP.pref.motion.reduced.label': 'Ridotto',
    'APP.engine.off': 'SPENTO',
    'components.legal-footer.links.0.page': 'Pagina iniziale',
    'components.docs-portal.title': 'Documentazione approfondita dei progetti',
  },
  fr: {
    'APP.pref.appearance.system.label': 'Système',
    'APP.pref.motion.reduced.label': 'Réduit',
    'APP.engine.off': 'ÉTEINT',
    'components.legal-footer.links.0.page': 'Accueil',
    'components.docs-portal.title': 'Documentation détaillée des projets',
  },
  tln: {
    'APP.featured': 'Łaori sełesionà',
    'pages.HOME.featured': 'Łaori sełesionà',
    'APP.engine.off': 'SPENTO',
    'components.legal-footer.links.0.page': 'Pagina prinsipałe',
    'components.legal-footer.links.1.page': 'Połìtega de ła Privacy',
    'components.legal-footer.links.3.page': 'Condision de Uxo',
    'components.docs-portal.title': 'Documentasion detajada dei projeti',
    'components.docs-portal.description': 'Disponìbiłe soło in inglexe',
    'components.docs-portal.copyToast':
      'Sta pàgina no ła permete copiar — varda github par descargar el codaxe.',
    'pages.star-field.asteroid': 'Asteroide',
    'pages.star-field.exoplanet': 'Esopianeta',
    'pages.star-field.dso': 'Ogeto del çèło profondo',
    'pages.star-field.catalog': 'Catałogo profondo',
    'pages.star-field.records': 'record',
    'pages.star-field.magnitude': 'Magnitùdine aparente',
    'pages.star-field.distance': 'Distansa',
    'pages.star-field.spectralType': 'Tipo spetrałe',
    'pages.star-field.constellation': 'Costełasion',
    'pages.star-field.designation': 'Designasion',
    'pages.star-field.hostStar': 'Steła ospite',
    'pages.star-field.dsoType': 'Tipo de ogeto',
    'pages.star-field.discovery': 'Scoverta',
    'pages.star-field.redshift': 'Spostamento verso el roso',
    'pages.star-field.coordinates': 'Posision ełiosentrica',
    'pages.star-field.registry_star_about':
      'Na steła vera del catałogo HYG (Hipparcos/Gliese/Tycho) — posision, magnitùdine e clase spetrałe da ła astrometrìa publegà.',
    'pages.star-field.registry_exoplanet': 'Esopianeta confermà',
    'pages.star-field.registry_exoplanet_about':
      'Un pianeta confermà del NASA Exoplanet Archive, mostrà a ła posision misurà de ła só steła ospite.',
    'pages.star-field.registry_dso': 'Ogeto del çèło profondo catalogà',
    'pages.star-field.registry_dso_about':
      'Un ogeto del çèło profondo NGC/IC del catałogo OpenNGC — gałasia, grupeło o nebułosa; distansa dal redshift quando disponìbiłe.',
    'pages.earth-playground.vignette': 'Viñeta',
  },
  nl: {
    'APP.pref.appearance.system.label': 'Systeem',
    'APP.pref.motion.reduced.label': 'Verminderd',
    'APP.engine.off': 'UIT',
    'components.legal-footer.links.0.page': 'Startpagina',
    'components.docs-portal.title': 'Uitgebreide projectdocumentatie',
    'pages.terms-of-use.sections.3.title': 'Vrijwaringen',
  },
  ca: {
    'APP.pref.appearance.system.label': 'Sistema',
    'APP.pref.motion.reduced.label': 'Reduït',
    'APP.engine.off': 'APAGAT',
    'components.legal-footer.links.0.page': 'Inici',
    'components.docs-portal.title': 'Documentació detallada dels projectes',
  },
  gl: {
    'APP.pref.appearance.system.label': 'Sistema',
    'APP.pref.motion.reduced.label': 'Reducido',
    'APP.engine.off': 'APAGADO',
    'components.legal-footer.links.0.page': 'Inicio',
    'components.docs-portal.title': 'Documentación detallada dos proxectos',
  },
  ga: {
    'APP.featured': 'Saothar roghnaithe',
    'pages.HOME.featured': 'Saothar roghnaithe',
    'APP.engine.off': 'MÚCHTA',
    'components.legal-footer.links.0.page': 'Baile',
    'components.legal-footer.links.1.page': 'Polasaí Príobháideachta',
    'components.legal-footer.links.3.page': 'Téarmaí Úsáide',
    'components.docs-portal.title': 'Doiciméadacht dhomhain tionscadal',
  },
  ru: {
    // UI strings
    'APP.featured': 'Избранные работы',
    'pages.HOME.featured': 'Избранные работы',
    'APP.engine.off': 'ВЫКЛ',
    'components.legal-footer.links.0.page': 'Главная',
    'components.legal-footer.links.1.page': 'Политика конфиденциальности',
    'components.legal-footer.links.3.page': 'Условия использования',
    'components.docs-portal.title': 'Подробная документация проектов',
    // Loader boot lines — bracketed sys tags kept, descriptions Cyrillic
    'APP.loader.lines.0': '[SYS_BOOT] ИНИЦИАЛИЗАЦИЯ АРХИТЕКТУРЫ v3.8',
    'APP.loader.lines.1': '[GPU_CORE] ВЫДЕЛЕНИЕ ШЕЙДЕРНЫХ КОНВЕЙЕРОВ',
    'APP.loader.lines.2': '[WASM_ENG] ПУЛ ПОТОКОВ ГОТОВ: 4 ВОРКЕРА',
    'APP.loader.lines.3': '[VRAM_MGR] ПРОТОКОЛ ПУЛА И ОЧИСТКИ АКТИВИРОВАН',
    'APP.loader.lines.4': '[RUNTIME] СИСТЕМА ПРОВЕРЕНА: ЗАПУСК ИНТЕРФЕЙСА',
    // Names → Cyrillic
    'APP.title': 'Луис Крётц',
    'APP.loader.title': 'Луис Крётц',
    'components.source-code.rights': 'Copyright © {year} Луис Крётц',
    'components.related.projects.0.page': 'Метча',
    'components.related.projects.1.page': 'Транса',
    'components.related.projects.2.page': 'Бразилиан Лезер',
    'components.related.projects.3.page': 'Мор',
    'components.related.projects.4.page': 'Коза',
    'components.related.projects.5.page': 'Мелисса',
    'components.related.projects.6.page': 'Минимелисса',
    'components.related.projects.7.page': 'Марко Алмейда',
    'components.related.projects.8.page': 'Наталия Бонд',
    'components.related.projects.9.page': 'Сесереле',
    'components.related.projects.10.page': 'Вибра',
    'components.related.projects.11.page': 'Дженесисинф',
    'pages.HOME.portfoliolist.0.label': 'Делл Дизайн Систем',
    'pages.HOME.portfoliolist.1.label': 'Метча',
    'pages.HOME.portfoliolist.2.label': 'Мелисса',
    'pages.HOME.portfoliolist.3.label': 'Мини Мелисса',
    'pages.HOME.portfoliolist.4.label': 'Бразилиан Лезер',
    'pages.HOME.portfoliolist.5.label': 'Мор',
    'pages.HOME.portfoliolist.6.label': 'Коза',
    'pages.HOME.portfoliolist.7.label': 'Марко Алмейда',
    'pages.HOME.portfoliolist.8.label': 'Наталия Бонд',
    'pages.HOME.portfoliolist.9.label': 'Сесереле',
    'pages.HOME.portfoliolist.10.label': 'Транса',
    'pages.HOME.portfoliolist.11.label': 'Вибра',
    'pages.HOME.portfoliolist.12.label': 'Сейджвеб',
    'projects.dell-design-system.title': 'Делл Дизайн Систем',
    'projects.aboutmarco.title': 'Марко Алмейда',
    'projects.cecerele.title': 'Сесереле',
    'projects.cicb.title': 'Бразилиан Лезер',
    'projects.coza.title': 'Коза',
    'projects.melissa.title': 'Мелисса',
    'projects.metcha.title': 'МЕТЧА',
    'projects.mini-melissa.title': 'Мини Мелисса',
    'projects.mor.title': 'МОР',
    'projects.nathalia-bond.title': 'Наталия Бонд',
    'projects.sage.title': 'Дженесисинф, Сейджвеб',
    'projects.transa.title': 'Транса',
    'projects.vibra.title': 'Вибра',
    'projects.aboutmarco.sections.0.1.2.label': 'aboutmarco.com, мелисса инсайдер',
    'projects.aboutmarco.sections.0.1.3.label': 'aboutmarco.com, мелисса',
    'projects.aboutmarco.sections.0.1.4.label': 'aboutmarco.com, коза',
    'projects.aboutmarco.sections.0.1.5.label': 'aboutmarco.com, бразилиан лезер',
    'projects.aboutmarco.sections.0.1.6.label': 'aboutmarco.com, ме',
    'projects.aboutmarco.sections.0.1.7.label': 'aboutmarco.com, архив',
    'projects.aboutmarco.sections.1.1.0.label': 'aboutmarco.com, адмайрзевеб',
    'projects.aboutmarco.sections.1.1.1.label': 'aboutmarco.com, css авордс',
    'projects.aboutmarco.sections.1.1.4.label': 'aboutmarco.com, МИ',
    'projects.aboutmarco.sections.1.1.5.label': 'aboutmarco.com, майндспарк',
    'projects.mini-melissa.sections.3.1.0.label': 'Мини Мелисса: Данс Машин',
    'projects.mini-melissa.sections.4.1.0.label': 'Мини Мелисса: Дримерз',
    'projects.mini-melissa.sections.5.1.0.label': 'Мини Мелисса: Фэмили',
    'projects.mini-melissa.sections.6.1.0.label': 'Мини Мелисса: Флайгёрл',
    'projects.mini-melissa.sections.7.1.0.label': 'Мини Мелисса: Маппинг',
    'projects.mini-melissa.sections.8.1.0.label': 'Мини Мелисса: Мэшап',
    'projects.mini-melissa.sections.9.1.0.label': 'Мини Мелисса: Миррор',
    'projects.mini-melissa.sections.10.1.0.label': 'Мини Мелисса: Оупен Вайбс',
    'projects.mini-melissa.sections.11.1.0.label': 'Мини Мелисса: Ванна би Кариока',
  },
}

/** Sets `obj`'s leaf at a dot-path, creating intermediate containers. */
const setPath = (obj, dotPath, value) => {
  const keys = dotPath.split('.')
  const last = keys.pop()

  const node = keys.reduce((acc, k) => {
    const key = /^\d+$/.test(k) ? Number(k) : k

    if (acc[key] === undefined) acc[key] = /^\d+$/.test(String(keys[keys.indexOf(k) + 1])) ? [] : {}

    return acc[key]
  }, obj)

  node[/^\d+$/.test(last) ? Number(last) : last] = value
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
let patched = 0

for (const [locale, map] of Object.entries(PATCH)) {
  if (!db.translations[locale]) {
    console.warn(`skipping ${locale} — no translations node`)

    continue
  }

  for (const [dotPath, value] of Object.entries(map)) {
    setPath(db.translations[locale], dotPath, value)
    patched++
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
console.log(
  `✅ database.json patched — ${patched} leaves across ${Object.keys(PATCH).length} locales.`
)
