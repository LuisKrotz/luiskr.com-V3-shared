/**
 * @file app/boot-veil.ts
 * @description Static boot-veil dismissal — the no-JS-painted splash shipped
 * in index.html paints before the bundle arrives, lives outside #app (so
 * mount()'s replaceChildren cannot destroy it before first paint), and is
 * removed here once the intro loader's lifecycle resolves.
 */

import { LOADER_CLASSES } from '@core/tokens/classes/loader.js'

/** Failsafe cap (ms) on the boot veil's lifetime when the loader never completes. */
export const BOOT_VEIL_TIMEOUT_MS = 10000

/**
 * Removes the static boot veil element if present. Runs at the intro
 * loader's onComplete — by then the loader's own veil has covered the
 * transition and the app view is mounted — and from a bounded failsafe so a
 * failed or skipped loader can never freeze the veil over the app.
 * Idempotent: the element is gone after the first call.
 */
export const dismissBootVeil = (): void => {
  document.querySelector(`.${LOADER_CLASSES.BOOT_VEIL}`)?.remove()
}
