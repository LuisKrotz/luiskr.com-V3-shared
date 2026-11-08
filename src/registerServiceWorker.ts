/**
 * @file registerServiceWorker.js
 * @description Registers the Workbox-generated service worker in production
 * only. Lifecycle hooks log status; an available update triggers a hard
 * reload so users never run a stale app shell behind new assets.
 */

import { TYPE_STRINGS } from '@core/tokens/strings/types.js'
import { WINDOW_EVENTS } from '@core/tokens/events/dom.js'
import { devError, devInfo } from '@core/devlog.js'
import { dropStaleServiceWorkers, registerSiteServiceWorker } from '@core/utils/service-worker.js'

/**
 * Registers `<base>service-worker.js` on window load when `env.PROD` is set.
 * Exported (and env-injected) so the prod-only branch is exercisable in
 * tests — `import.meta.env` does not exist outside Vite.
 * @param {object} env - Vite env object ({PROD, BASE_URL})
 */
export const registerServiceWorker = (env: { PROD?: boolean; BASE_URL?: string }): void => {
  if (!env?.PROD) {
    // Non-prod builds actively UNregister — a stale dev SW would
    // otherwise keep serving old chunks long after the source moved.
    dropStaleServiceWorkers()

    return
  }

  // Deferred to window.load — registration fetches + caches must never
  // compete with the critical request graph during first paint.
  window.addEventListener(WINDOW_EVENTS.LOAD, () => {
    void registerSiteServiceWorker(`${env.BASE_URL}service-worker.js`, {
      // First activation completes — the page is now cache-served.
      ready() {
        devInfo(
          'App is being served from cache by a service worker.\n' +
            'For more details, visit https://goo.gl/AFskqB'
        )
      },

      // Registration succeeded (pre-activation).
      registered() {
        devInfo('Service worker has been registered.')
      },

      // Precache payload finished writing.
      cached() {
        devInfo('Content has been cached for offline use.')
      },

      // A new SW version was found and is downloading its assets.
      updatefound() {
        devInfo('New content is downloading.')
      },

      // The new SW activated — hard-reload so the app shell can never
      // mix an old shell with new hashed assets.
      updated() {
        devInfo('New content is available; refreshing page.')

        window.location.reload()
      },

      // Connectivity dropped — informational only; the cache keeps
      // the site functional.
      offline() {
        devInfo('No internet connection found. App is running in offline mode.')
      },

      // Registration/install threw — logged, never fatal (the site
      // works online without a SW).
      error(error) {
        devError('Error during service worker registration:', error)
      },
    })
  })
}

// `import.meta.env` only exists under Vite — guard so tests/other loaders can
// import this module without a build-time env shim.
const env = (typeof import.meta !== TYPE_STRINGS.UNDEFINED && import.meta.env) || {}

registerServiceWorker(env)
