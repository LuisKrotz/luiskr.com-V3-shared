/**
 * @file app-shell-coverage-approot-reeval.test.js
 * @description Covers App.js's custom-element re-registration guard —
 * `if (!customElements.get(APP_ROOT)) define(...)`. jest.resetModules()
 * lives in this dedicated file: counters are per module instance, so a
 * mid-file reset after exercising a module would discard the hits the
 * earlier arms recorded for it in the merged report. Here the reset is
 * the arm itself — the re-import exercises the guard's skip branch.
 */
import { describe, test, expect, jest } from '@jest/globals'
import '@/App.js'
import { COMPONENT_TAGS } from '@core/tokens/elements/components.js'

describe('AppRoot re-eval', () => {
  test('AppRoot re-eval skips custom-element redefinition', async () => {
    expect(customElements.get(COMPONENT_TAGS.APP_ROOT)).toBeTruthy()
    jest.resetModules()

    await expect(import('@/App.js')).resolves.toBeDefined()
  })
})
