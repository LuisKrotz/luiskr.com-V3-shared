/**
 * @file app/modal.ts
 * @description Modal-state DOM sync for AppRoot — toggles modal-open on html/body and copies the modifier class onto the wrapper. Scroll lock is native: the expand <dialog> runs showModal() so the document is inert behind the top layer — no fixed-position pin, no scroll shift, nothing to restore on close.
 */

import { DATA_ATTRS } from '@core/tokens/attrs/data.js'
import { ATTR_VALUES } from '@core/tokens/attrs/values.js'
import { MODAL_CLASSES } from '@core/tokens/classes/modal.js'
import { TYPE_STRINGS } from '@core/tokens/strings/types.js'
import store from '@core/store.js'
import type { AppRoot } from '../App.js'

/**
 * Updates app modal state.
 * @param c — the component
 */
export function updateAppModalState(c: AppRoot): void {
  const wrapper = c.$(`[${DATA_ATTRS.DATA_APP_WRAPPER}]`)
  const modal = store.getters.getModal()
  const isOpen = !!modal?.open

  if (typeof document !== TYPE_STRINGS.UNDEFINED) {
    document.documentElement.classList.toggle(MODAL_CLASSES.MODAL_OPEN, isOpen)
    document.body.classList.toggle(MODAL_CLASSES.MODAL_OPEN, isOpen)
  }

  if (wrapper) {
    wrapper.className = modal?.class || ATTR_VALUES.EMPTY
  }
}
