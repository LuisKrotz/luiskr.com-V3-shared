import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')

/**
 * Earth Playground query-aligned titles + descriptions — one entry per
 * locale. `title` feeds <title>/h1/breadcrumbs/WebPage.name and now
 * carries each locale's own "earth simulation" phrasing (the page's
 * single strongest on-page signal for that query); `description`
 * leads with the same term so the meta description snippet matches.
 * Dialect fallbacks mirror patch-earth-playground-share-themes.js:
 * hrk → de, cas → es (voseo), riv → es (voseo), gn → es + Guaraní
 * mix (as the locale's own content already does), tln → it.
 */
const TRANSLATIONS_MAP = {
  en: {
    title: 'Earth Playground — Interactive Earth Simulation',
    description:
      'Interactive WebGL Earth simulation — adjust terrain, atmosphere, lighting and post-processing live in your browser.',
  },
  br: {
    title: 'Playground da Terra — Simulação Interativa da Terra',
    description:
      'Simulação WebGL interativa da Terra — ajuste terreno, atmosfera, iluminação e pós-processamento ao vivo no navegador.',
  },
  es: {
    title: 'Playground de la Tierra — Simulación Interactiva de la Tierra',
    description:
      'Simulación WebGL interactiva de la Tierra — ajusta terreno, atmósfera, iluminación y posprocesado en vivo en tu navegador.',
  },
  de: {
    title: 'Erde-Playground — Interaktive Erde-Simulation',
    description:
      'Interaktive WebGL-Erde-Simulation — passe Gelände, Atmosphäre, Beleuchtung und Nachbearbeitung live im Browser an.',
  },
  hrk: {
    title: 'Erd-Playground — Interaktive Erd-Simulation',
    description:
      'Interaktive WebGL-Erd-Simulation — Gelände, Atmosphäre, Beleuchtung und Nachbearbeitung live im Browser anpassen.',
  },
  cas: {
    title: 'Playground de la Tierra — Simulación Interactiva de la Tierra',
    description:
      'Simulación WebGL interactiva de la Tierra — ajustá terreno, atmósfera, iluminación y posprocesado en vivo en tu navegador.',
  },
  riv: {
    title: 'Playground da Terra — Simulación Interactiva de la Tierra',
    description:
      'Simulación WebGL interactiva de la Tierra — ajustá terreno, atmósfera, iluminación y posprocesado en vivo en tu navegador.',
  },
  gn: {
    title: 'Yvy Ñembosarái — Simulación Interactiva de la Tierra',
    description:
      'Simulación WebGL interactiva Yvy rehegua — terreno, atmósfera, mbarendy ha postprocesado emoĩporã vivo.',
  },
  it: {
    title: 'Playground della Terra — Simulazione Interattiva della Terra',
    description:
      'Simulazione WebGL interattiva della Terra — regola terreno, atmosfera, illuminazione e post-produzione live nel browser.',
  },
  ru: {
    title: 'Земная песочница — Интерактивная симуляция Земли',
    description:
      'Интерактивная WebGL-симуляция Земли — настраивайте рельеф, атмосферу, освещение и постобработку в реальном времени в браузере.',
  },
  fr: {
    title: 'Playground de la Terre — Simulation Interactive de la Terre',
    description:
      'Simulation WebGL interactive de la Terre — ajustez terrain, atmosphère, éclairage et post-traitement en direct dans votre navigateur.',
  },
  tln: {
    title: 'Terałudo — Simulazione Interattiva della Terra',
    description:
      'Simulazione WebGL interattiva della Terra — regola terreno, atmosfera, illuminazione e post-produzione live nel browser.',
  },
  nl: {
    title: 'Aarde-playground — Interactieve Aarde-simulatie',
    description:
      'Interactieve WebGL-aarde-simulatie — pas terrein, atmosfeer, verlichting en nabewerking live aan in je browser.',
  },
  ca: {
    title: 'Playground de la Terra — Simulació Interactiva de la Terra',
    description:
      'Simulació WebGL interactiva de la Terra — ajusta terreny, atmosfera, il·luminació i postprocessat en viu al navegador.',
  },
  gl: {
    title: 'Playground da Terra — Simulación Interactiva da Terra',
    description:
      'Simulación WebGL interactiva da Terra — axusta terreo, atmosfera, iluminación e posprocesado en vivo no navegador.',
  },
  ga: {
    title: 'Clós Spraoi an Domhain — Insamhladh Idirghníomhach an Domhain',
    description:
      'Insamhladh WebGL idirghníomhach den Domhan — coigeartaigh tír-raon, atmaisféar, soilsiú agus iarphróiseáil beo sa bhrabhsálaí.',
  },
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

for (const [locale, data] of Object.entries(TRANSLATIONS_MAP)) {
  const page = db.translations?.[locale]?.pages?.['earth-playground']

  if (!page) {
    console.warn(`⚠ ${locale}: no earth-playground page node — skipped`)
    continue
  }

  page.title = data.title
  page.description = data.description
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
console.log(
  '✅ database.json patched with query-aligned Earth Playground titles/descriptions across all locales.'
)
