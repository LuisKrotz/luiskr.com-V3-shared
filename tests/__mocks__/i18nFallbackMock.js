/**
 * @file i18nFallbackMock.js
 * @description Jest module mock for the fallback-locale dictionary — a
 * trimmed English subset (not-found page, playground, HOME keys, about
 * title/mentions) read from the real database.json so fallback tests
 * verify the actual shipped strings, not synthetic fixtures.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { NOT_FOUND_CLASSES } from '@core/tokens/classes/legal.js'
import { ROUTE_PATHS } from '@core/tokens/routes/paths.js'
import { TRANSLATION_KEYS } from '@core/tokens/routes/translation-keys.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

const translations = JSON.parse(readFileSync(path.join(root, 'database.json'), 'utf8')).translations

const en = translations.en

export default {
  APP: en.APP,
  // Mirrors the plugin's loaderLocales — all locales' loader nodes, so the
  // boot loader can localize stage copy before i18n chunks resolve.
  loaderLocales: Object.fromEntries(
    Object.entries(translations).map(([loc, t]) => [loc, t.APP.loader])
  ),
  components: en.components,
  pages: {
    [NOT_FOUND_CLASSES.NOT_FOUND]: en.pages[NOT_FOUND_CLASSES.NOT_FOUND],
    [ROUTE_PATHS.EARTH_PLAYGROUND_SEGMENT]: en.pages[ROUTE_PATHS.EARTH_PLAYGROUND_SEGMENT],
    [TRANSLATION_KEYS.STAR_FIELD]: en.pages[TRANSLATION_KEYS.STAR_FIELD],
    HOME: {
      archive: en.pages.HOME.archive,
      explore: en.pages.HOME.explore,
      featured: en.pages.HOME.featured,
      message: en.pages.HOME.message,
    },
    about: { title: en.pages.about.title, mentions: en.pages.about.mentions },
  },
}
