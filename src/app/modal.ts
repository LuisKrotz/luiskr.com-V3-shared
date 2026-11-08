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
  // The wrapper inside this shadow tree — carries the modal's
  // modifier class so open-state CSS can target the shell's children.
  const wrapper = c.$(`[${DATA_ATTRS.DATA_APP_WRAPPER}]`)

  const modal = store.getters.getModal()

  // Boolean open state for the class toggles below.
  const isOpen = !!modal?.open

  if (typeof document !== TYPE_STRINGS.UNDEFINED) {
    // modal-open on both roots — page-level CSS (overflow clip,
    // scrollbar compensation) keys off either depending on which
    // sheet authored the rule.
    document.documentElement.classList.toggle(MODAL_CLASSES.MODAL_OPEN, isOpen)

    document.body.classList.toggle(MODAL_CLASSES.MODAL_OPEN, isOpen)
  }

  if (wrapper) {
    // The modal's own modifier class (e.g. which dialog is open) —
    // cleared to empty when no modal is active.
    wrapper.className = modal?.class || ATTR_VALUES.EMPTY
  }
}
