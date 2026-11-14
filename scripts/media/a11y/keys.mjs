#!/usr/bin/env node

/**
 * @file shared/scripts/media/a11y/keys.mjs
 * @description Bucket-key naming for generated accessibility artifacts —
 * the pipeline-side twin of `core/utils/media/accessibility.ts` (which
 * resolves `@core/` aliases Node can't load here). Every literal comes
 * from the shared token modules, so the files this script writes are
 * exactly the URLs the runtime links.
 */

import { MEDIA } from '../../../../core/tokens/media/suffixes.ts'
import { LOCALES } from '../../../../core/tokens/locales.ts'

/**
 * Descriptions-track key for a media stem — `<stem>.vtt` English
 * canonical, `<stem>.<locale>.vtt` localized.
 * @param {string} stem Extensionless bucket-relative stem.
 * @param {string} locale Site locale code.
 * @returns {string}
 */
export const vttKey = (stem, locale) =>
  locale === LOCALES.EN ? `${stem}${MEDIA.VTT_EXT}` : `${stem}.${locale}${MEDIA.VTT_EXT}`

/**
 * Longdesc key for an image stem — `<stem>_longdesc.txt` English
 * canonical, `<stem>_longdesc.<locale>.txt` localized.
 * @param {string} stem Extensionless bucket-relative stem.
 * @param {string} locale Site locale code.
 * @returns {string}
 */
export const longdescKey = (stem, locale) =>
  `${stem}${MEDIA.LONGDESC_SUFFIX}${locale === LOCALES.EN ? '' : `.${locale}`}${MEDIA.LONGDESC_EXT}`
