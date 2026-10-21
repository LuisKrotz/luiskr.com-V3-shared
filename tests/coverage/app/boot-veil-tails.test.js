/**
 * @file boot-veil-tails.test.js — coverage for src/app/boot-veil.ts:
 * dismissBootVeil removes a present veil and no-ops when none exists, and
 * the failsafe cap stays a sane bounded value.
 */

import { BOOT_VEIL_TIMEOUT_MS, dismissBootVeil } from '@/app/boot-veil.js'
import { LOADER_CLASSES } from '@core/tokens/classes/loader.js'

describe('boot-veil dismissal', () => {
  test('removes a present veil element', () => {
    const veil = document.createElement('div')

    veil.className = LOADER_CLASSES.BOOT_VEIL
    document.body.appendChild(veil)

    dismissBootVeil()

    expect(document.querySelector(`.${LOADER_CLASSES.BOOT_VEIL}`)).toBeNull()
    expect(veil.isConnected).toBe(false)
  })

  test('no-ops when no veil exists', () => {
    expect(document.querySelector(`.${LOADER_CLASSES.BOOT_VEIL}`)).toBeNull()
    expect(() => dismissBootVeil()).not.toThrow()
  })

  test('failsafe cap stays bounded', () => {
    expect(BOOT_VEIL_TIMEOUT_MS).toBeGreaterThan(0)
    expect(BOOT_VEIL_TIMEOUT_MS).toBeLessThanOrEqual(30000)
  })
})
