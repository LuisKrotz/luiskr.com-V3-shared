/**
 * seed-translations.js — pushes new i18n keys to Firebase RTDB
 * Usage: node scripts/i18n/seed-translations.js
 * Requires: .firebase-admin-key.json in project root
 *
 * Unlike the patch-* scripts (which edit the local database.json
 * mirror first), this one writes keys directly through the Admin SDK
 * — used when the keys were authored for seeding, not back-patched.
 * Covered nodes: APP.pref.closeLabel + pref.devTools (developer-tools
 * labels), APP.carousel (prev/next/of), APP.statsHud (HUD labels).
 */
import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Service-account key at repo root — write access to the live RTDB;
// never committed (gitignored).
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '../../../.firebase-admin-key.json'), 'utf8')
)

// Initialize the Admin SDK against the production database URL.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://luiskr-com.firebaseio.com',
})

const db = admin.database()

// The authored seed dictionaries — keys match the template ids the
// preferences modal, carousel, and stats HUD bind to.
const TRANSLATIONS = {
  en: {
    pref: {
      closeLabel: 'Close preferences',
      devTools: {
        title: 'Developer Tools',
        statsForNerds: 'Stats for Nerds',
        statsForNerdsDesc: 'Live FPS, network, memory HUD — bottom-right corner',
        showGrid: 'Show Grid',
        showGridDesc: 'Overlay columns, gutters and max-area at every breakpoint',
        reducedMotion: 'Reduced Motion',
        reducedMotionDesc: 'Disable animations and transitions',
      },
    },
    carousel: { prev: 'Previous item', next: 'Next item', ofLabel: 'of' },
    statsHud: {
      title: 'Performance',
      fps: 'FPS',
      memory: 'Memory',
      network: 'Network',
      latency: 'Latency',
      ai: 'AI Engine',
    },
  },
  br: {
    pref: {
      closeLabel: 'Fechar preferências',
      devTools: {
        title: 'Ferramentas de Dev',
        statsForNerds: 'Stats para Nerds',
        statsForNerdsDesc: 'HUD de FPS, rede e memória — canto inferior direito',
        showGrid: 'Mostrar Grade',
        showGridDesc: 'Sobrepor colunas, calhas e área máxima em cada breakpoint',
        reducedMotion: 'Movimento Reduzido',
        reducedMotionDesc: 'Desativar animações e transições',
      },
    },
    carousel: { prev: 'Item anterior', next: 'Próximo item', ofLabel: 'de' },
    statsHud: {
      title: 'Desempenho',
      fps: 'FPS',
      memory: 'Memória',
      network: 'Rede',
      latency: 'Latência',
      ai: 'Motor de IA',
    },
  },
  es: {
    pref: {
      closeLabel: 'Cerrar preferencias',
      devTools: {
        title: 'Herramientas de Dev',
        statsForNerds: 'Stats para Nerds',
        statsForNerdsDesc: 'HUD de FPS, red y memoria — esquina inferior derecha',
        showGrid: 'Mostrar Cuadrícula',
        showGridDesc: 'Superponer columnas, márgenes y área máx en cada breakpoint',
        reducedMotion: 'Movimiento Reducido',
        reducedMotionDesc: 'Desactivar animaciones y transiciones',
      },
    },
    carousel: { prev: 'Elemento anterior', next: 'Elemento siguiente', ofLabel: 'de' },
    statsHud: {
      title: 'Rendimiento',
      fps: 'FPS',
      memory: 'Memoria',
      network: 'Red',
      latency: 'Latencia',
      ai: 'Motor de IA',
    },
  },
  de: {
    pref: {
      closeLabel: 'Einstellungen schließen',
      devTools: {
        title: 'Entwicklerwerkzeuge',
        statsForNerds: 'Stats für Nerds',
        statsForNerdsDesc: 'Live FPS, Netzwerk, RAM HUD — unten rechts',
        showGrid: 'Raster anzeigen',
        showGridDesc: 'Spalten, Abstände und Max-Bereich einblenden',
        reducedMotion: 'Reduzierte Bewegung',
        reducedMotionDesc: 'Animationen und Übergänge deaktivieren',
      },
    },
    carousel: { prev: 'Vorheriges Element', next: 'Nächstes Element', ofLabel: 'von' },
    statsHud: {
      title: 'Leistung',
      fps: 'FPS',
      memory: 'RAM',
      network: 'Netzwerk',
      latency: 'Latenz',
      ai: 'KI-Engine',
    },
  },
  it: {
    pref: {
      closeLabel: 'Chiudi preferenze',
      devTools: {
        title: 'Strumenti Dev',
        statsForNerds: 'Stats per Nerd',
        statsForNerdsDesc: 'HUD FPS, rete e memoria — angolo in basso a destra',
        showGrid: 'Mostra griglia',
        showGridDesc: 'Sovrapponi colonne, margini e area max ad ogni breakpoint',
        reducedMotion: 'Movimento ridotto',
        reducedMotionDesc: 'Disabilita animazioni e transizioni',
      },
    },
    carousel: { prev: 'Elemento precedente', next: 'Elemento successivo', ofLabel: 'di' },
    statsHud: {
      title: 'Prestazioni',
      fps: 'FPS',
      memory: 'Memoria',
      network: 'Rete',
      latency: 'Latenza',
      ai: 'Motore IA',
    },
  },
  fr: {
    pref: {
      closeLabel: 'Fermer les préférences',
      devTools: {
        title: 'Outils Développeur',
        statsForNerds: 'Stats pour Nerds',
        statsForNerdsDesc: 'HUD FPS, réseau et mémoire — coin inférieur droit',
        showGrid: 'Afficher la grille',
        showGridDesc: 'Superposer colonnes, gouttières et zone max à chaque breakpoint',
        reducedMotion: 'Mouvement réduit',
        reducedMotionDesc: 'Désactiver les animations et transitions',
      },
    },
    carousel: { prev: 'Élément précédent', next: 'Élément suivant', ofLabel: 'sur' },
    statsHud: {
      title: 'Performances',
      fps: 'FPS',
      memory: 'Mémoire',
      network: 'Réseau',
      latency: 'Latence',
      ai: 'Moteur IA',
    },
  },
  ru: {
    pref: {
      closeLabel: 'Закрыть настройки',
      devTools: {
        title: 'Инструменты разработчика',
        statsForNerds: 'Статистика для гиков',
        statsForNerdsDesc: 'HUD с FPS, сетью и памятью — правый нижний угол',
        showGrid: 'Показать сетку',
        showGridDesc: 'Наложение колонок, отступов и макс. области',
        reducedMotion: 'Уменьшить движение',
        reducedMotionDesc: 'Отключить анимации и переходы',
      },
    },
    carousel: { prev: 'Предыдущий', next: 'Следующий', ofLabel: 'из' },
    statsHud: {
      title: 'Производительность',
      fps: 'FPS',
      memory: 'Память',
      network: 'Сеть',
      latency: 'Задержка',
      ai: 'ИИ',
    },
  },
}

// Regional dialects with no authored dictionary yet seed English —
// better an English label than an empty node (the UI falls back to
// English anyway; writing it keeps the RTDB mirror honest).
const FALLBACK_TO_EN = ['hrk', 'cas', 'riv', 'gn', 'tln']

/**
 * `seed` — writes every key in TRANSLATIONS to
 * translations/<locale>/APP/<node>/<key>. One .set() per key (not a
 * bulk update) so partial auth failures report per-key, and sibling
 * keys outside this seed are never touched.
 */
async function seed() {
  const promises = []

  // Materialize the fallback locales into the map — their entries
  // alias the English dictionary, no separate literals.
  const all = { ...TRANSLATIONS }

  for (const locale of FALLBACK_TO_EN) all[locale] = TRANSLATIONS.en

  for (const [locale, data] of Object.entries(all)) {
    const base = `translations/${locale}/APP`

    // pref.closeLabel sits outside devTools — written directly.
    promises.push(db.ref(`${base}/pref/closeLabel`).set(data.pref.closeLabel))

    // Each devTools group key (title, statsForNerds, …) is its own node.
    for (const [k, v] of Object.entries(data.pref.devTools)) {
      promises.push(db.ref(`${base}/pref/devTools/${k}`).set(v))
    }

    // Carousel labels — prev/next/of.
    for (const [k, v] of Object.entries(data.carousel)) {
      promises.push(db.ref(`${base}/carousel/${k}`).set(v))
    }

    // Stats HUD labels — fps/memory/network/latency/ai.
    for (const [k, v] of Object.entries(data.statsHud)) {
      promises.push(db.ref(`${base}/statsHud/${k}`).set(v))
    }
  }

  // All writes in flight — settle together; one rejection rejects
  // the batch (the catch exits non-zero).
  await Promise.all(promises)

  console.log(`✅ Seeded ${promises.length} keys across ${Object.keys(all).length} locales.`)

  process.exit(0)
}

seed().catch((e) => {
  console.error('❌', e)

  process.exit(1)
})
