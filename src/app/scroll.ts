/**
 * @file app/scroll.ts
 * @description Scroll tracking for AppRoot — measures the #about/#contact section tops and keeps activeSection/onBottom in sync with scroll position.
 */

import { SECTIONS } from '@core/tokens/base.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'
import { SECTION_IDS } from '@core/tokens/ids/sections.js'
import { ROUTE_PREFIXES } from '@core/tokens/routes/names.js'
import { deepQuerySelector } from '@core/utils/dom.js'
import router from '@core/router/router.js'
import type { AppNavEl } from './types.js'
import type { AppRoot } from '../App.js'

/**
 * Updates app section tops.
 * @param c — the component
 */
export function updateAppSectionTops(c: AppRoot): void {
  const aboutEl = deepQuerySelector(`#${SECTION_IDS.ABOUT}`)
  const contactEl = deepQuerySelector(`#${SECTION_IDS.CONTACT}`)
  if (aboutEl) {
    const rect = aboutEl.getBoundingClientRect()
    c._aboutTop = rect.top + window.scrollY - 250
  }
  if (contactEl) {
    const rect = contactEl.getBoundingClientRect()
    c._contactTop = rect.top + window.scrollY - 250
  }

  // Document height changes only when the DOM grows (this runs from the
  // body's ResizeObserver + the mount-time lazy pass) — caching it here
  // keeps the per-scroll-frame read in checkAppScroll off the layout path.
  c._scrollH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

  c._sectionsMeasured = !!(aboutEl && contactEl)
}

/**
 * Checks app scroll.
 * @param c — the component
 */
export function checkAppScroll(c: AppRoot): void {
  const y = window.scrollY
  // Cached by updateSectionTops — a scrollHeight read on a dirty layout
  // forces a synchronous reflow every scroll frame, which the 120/240fps
  // contract cannot afford. The 0-fallback covers the pre-measure window.
  const scrollH =
    c._scrollH || Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  const onBottom = scrollH - y <= window.innerHeight + 200

  const isHomePage =
    router.currentRoute?.name?.startsWith(ROUTE_PREFIXES.HOME) ||
    router.currentRoute?.name?.startsWith(ROUTE_PREFIXES.ABOUT) ||
    router.currentRoute?.name?.startsWith(ROUTE_PREFIXES.CONTACT)

  // The view mounts asynchronously — if the first measurement ran before the
  // route rendered, keep re-measuring (throttled) until the section markers
  // exist so the nav doesn't flip to on-dark at the 1500px fallback.
  if (isHomePage && !c._sectionsMeasured) {
    const now = Date.now()

    if (now - c._lastMeasureAttempt > 400) {
      c._lastMeasureAttempt = now
      c.updateSectionTops()
    }
  }

  if (!isHomePage) {
    // The nav's scroll state only needs writing on transitions — pushing
    // identical values every scroll frame runs a no-op attribute write
    // plus a nav-internal style flush per frame.
    const bottomChanged = c.onBottom !== onBottom

    c.onBottom = onBottom

    if (bottomChanged) {
      const nav = c.$<AppNavEl>(COMPONENT_TAGS.APP_NAV)
      if (nav) nav.updateScrollState(c.activeSection, c.onBottom)
    }

    return
  }

  const aboutTop = c._aboutTop ?? 600
  const contactTop = c._contactTop ?? 1500

  let newSection: string
  if (y >= contactTop || onBottom) {
    newSection = SECTIONS.CONTACT
  } else if (y >= aboutTop) {
    newSection = SECTIONS.ABOUT
  } else {
    newSection = SECTIONS.HOME
  }

  const changed = c.onBottom !== onBottom || c.activeSection !== newSection

  c.onBottom = onBottom
  c.activeSection = newSection

  if (changed) {
    const nav = c.$<AppNavEl>(COMPONENT_TAGS.APP_NAV)
    if (nav) nav.updateScrollState(c.activeSection, c.onBottom)
  }
}
