/**
 * @file app/data.ts
 * @description Locale data loading for AppRoot — fetches the APP translation node per locale, fans it out to translations, and caches the loaded lang.
 */

import { CHAR_STRINGS } from '@core/tokens/strings/chars.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { LANG_MUTATIONS, UI_MUTATIONS } from '@core/tokens/events/mutations.js'
import { DB_PATHS } from '@core/tokens/routes/paths.js'
import store from '@core/store.js'
import { fetchFirebaseDb } from '@core/utils/data/db.js'
import type { DbSnapshot } from '@core/utils/data/db.js'
import type { AppNavEl, AppTranslations, CookieBannerEl, PrefModalEl } from './types.js'
import type { AppRoot } from '../App.js'
import { devError } from '@core/devlog.js'

/**
 * Loads app data.
 * @param c — the component
 */
export function loadAppData(c: AppRoot): void {
  const currentLocale = store.getters.getLang()

  // A locale change invalidates the cached dictionary — drop it so the
  // fetch guard below re-fires (first load skips: nothing to clear).
  if (c._loadedLang && c._loadedLang !== currentLocale) {
    c.translations = null
  }

  c._loadedLang = currentLocale

  // Firebase path prefix — translations/<locale>/ hosts the APP,
  // slugs, and components nodes this shell consumes.
  const dbpath = store.getters.getlang().database + currentLocale

  // Fetch promises collected for the settled-at-end catch — each one
  // applies its own snapshot, so partial failure still paints what
  // landed (the catch only logs).
  const promises: Promise<DbSnapshot | void>[] = []

  // APP node → the shell's dictionary. Runs twice per fetch: once as
  // fetchFirebaseDb's live-update callback and once on the resolved
  // snapshot — SWR semantics (stale snapshot paints immediately, the
  // live value re-applies when the CDN copy lands).
  const applyApp = (snapshot: DbSnapshot) => {
    if (!snapshot.exists()) return

    c.translations = snapshot.val() as AppTranslations

    store.commit(LANG_MUTATIONS.SET_APP_LANG, c.translations)

    // Click/tap verbs differ by input method — store them so widgets
    // render the right call-to-action without re-querying the dict.
    store.commit(UI_MUTATIONS.SET_CLICK_OR_TAP, {
      click: c.translations.actions?.click,
      tap: c.translations.actions?.tap,
    })

    // Fan the dictionary out to chrome children already mounted —
    // children that mount later get it via onUpdated.
    const nav = c.$<AppNavEl>(COMPONENT_TAGS.APP_NAV)

    if (nav) nav.translations = c.translations

    const cookie = c.$<CookieBannerEl>(COMPONENT_TAGS.COOKIE_BANNER)

    if (cookie) cookie.translations = c.translations

    const pref = c.$<PrefModalEl>(COMPONENT_TAGS.PREFERENCES_MODAL)

    if (pref) pref.pref = c.translations.pref

    // Optional sub-trees — older locales may not carry them; the
    // presence guard keeps a missing node from clobbering a previous
    // commit with undefined.
    if (c.translations.carousel) {
      store.commit(LANG_MUTATIONS.SET_CAROUSEL_LANG, c.translations.carousel)
    }

    if (c.translations.statsHud) {
      store.commit(LANG_MUTATIONS.SET_STATS_HUD_LANG, c.translations.statsHud)
    }
  }

  // Components node → the per-widget labels dictionary (buttons,
  // forms, shared chrome) — committed wholesale for components to
  // pull their own keys.
  const applyComponents = (snapshot: DbSnapshot) => {
    if (snapshot.exists()) store.commit(LANG_MUTATIONS.SET_COMPONENT_LANG, snapshot.val())
  }

  // Slugs node → localized route segments (about, contact, project
  // slugs) the router/link-builder needs for href generation.
  const applySlugs = (snapshot: DbSnapshot) => {
    if (snapshot.exists()) store.commit(LANG_MUTATIONS.SET_SLUGS_LANG, snapshot.val())
  }

  // Static-first: snapshot data renders now, live CMS edits re-apply via onUpdate
  if (!c.translations) {
    promises.push(fetchFirebaseDb(`${dbpath}${CHAR_STRINGS.SLASH}APP`, applyApp).then(applyApp))
  }

  // Cached nodes skip the fetch — a locale back-swap restores the
  // store's copy without a network round-trip.
  if (!store.getters.getlang()?.slugs) {
    promises.push(fetchFirebaseDb(`${dbpath}${DB_PATHS.SLUGS}`, applySlugs).then(applySlugs))
  }

  if (!store.getters.getlang()?.components) {
    promises.push(
      fetchFirebaseDb(`${dbpath}${DB_PATHS.COMPONENTS}`, applyComponents).then(applyComponents)
    )
  }

  // Fire-and-forget: any rejection routes to the devlog — a failed
  // locale fetch must never reject into the component lifecycle.
  Promise.all(promises).catch(devError)
}
