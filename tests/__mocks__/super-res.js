/**
 * @file super-res.js (mock)
 * @description Stub for core/utils/ml/super-res.ts — website suites
 * route `upscaleImage2x` here because happy-dom has no canvas 2d
 * backend: `__srState.next` decides the resolved bitmap (or null) and
 * `calls` records the source elements passed in.
 */

export const __srState = { next: null, calls: [] }

export const upscaleImage2x = async (img) => {
  __srState.calls.push(img)

  return __srState.next
}

/** Resets recording state between tests. */
export const __resetSr = () => {
  __srState.next = null
  __srState.calls.length = 0
}
