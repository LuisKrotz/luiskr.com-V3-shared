/**
 * @file wasm-image-decoder.js (mock)
 * @description Stub for core/utils/wasm/wasm-image-decoder.ts — website
 * suites route `decodeImageWASM` here because happy-dom has no real
 * fetch/createImageBitmap/worker pipeline: `__decState.next` decides
 * the resolved bitmap (or null for the fallback arm) and `calls`
 * records the (url, width, height) triples passed in.
 */

export const __decState = { next: null, calls: [] }

export const wasmImageDecoder = {
  decodeImageWASM: async (url, w, h) => {
    __decState.calls.push([url, w, h])

    return __decState.next
  },
}

/** Resets recording state between tests. */
export const __resetDec = () => {
  __decState.next = null
  __decState.calls.length = 0
}
