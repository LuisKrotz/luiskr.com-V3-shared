/**
 * @file onnxruntime-web.js (mock)
 * @description Stub for `onnxruntime-web` / `onnxruntime-web/webgpu` —
 * the real runtime can't load under jest (67MB wasm assets, GPU/NN
 * device probes), so tests route the import through this recording
 * stub. `__ortState` controls behavior the way `__diagramState` does
 * for wasm-diagram: `failCreate`/`failRun` exercise the engine's
 * fallback arms, `outputs` overrides the response tensors.
 */

export const __ortState = {
  /** InferenceSession.create calls — [{uri, opts}]. */
  creates: [],
  /** session.run calls — feeds objects. */
  runs: [],
  /** Reject the next (or every) InferenceSession.create. */
  failCreate: false,
  failCreateAlways: false,
  /** Reject session.run. */
  failRun: false,
  /** Override output map — name → Float32Array. */
  outputs: null,
}

/** Minimal Tensor stand-in — records constructor args verbatim. */
export class Tensor {
  constructor(type, data, dims) {
    this.type = type
    this.data = data
    this.dims = dims
  }
}

/** Recording InferenceSession stub — create() logs, run() replays outputs. */
export const InferenceSession = {
  create: async (uri, opts) => {
    __ortState.creates.push({ uri, opts })

    if (__ortState.failCreate || __ortState.failCreateAlways) {
      __ortState.failCreate = false

      throw new Error('session create failed')
    }

    return {
      run: async (feeds) => {
        __ortState.runs.push(feeds)

        if (__ortState.failRun) throw new Error('run failed')

        return __ortState.outputs ?? { out: { data: new Float32Array([0.5]) } }
      },
    }
  },
}

/** env namespace mirroring the real module — wasmPaths set by the engine. */
export const env = { wasm: { wasmPaths: '', numThreads: 0 }, logLevel: '' }

/** Resets the recording state between tests. */
export const __resetOrt = () => {
  __ortState.creates.length = 0
  __ortState.runs.length = 0
  __ortState.failCreate = false
  __ortState.failCreateAlways = false
  __ortState.failRun = false
  __ortState.outputs = null
}
