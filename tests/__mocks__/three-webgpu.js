/**
 * @file three-webgpu.js (mock)
 * @description Auto-mock for `three/webgpu` — WebGPURenderer with a resolved
 * init/compileAsync and a render counter; RenderPipeline + node materials as
 * chainable proxies.
 */
import { __chain as chain } from './three.js'

// Test hooks — let suites delay renderer.init() (to interleave a mid-boot
// destroy) or fail the RenderPipeline ctor (to exercise the plain
// renderer.render fallback paths). Flags reset inside each test.
let __rendererInitDelayMs = 0
let __pipelineCtorFails = false

/** Test hook: delays renderer.init() by ms — lets a mid-boot destroy land. */
export const __setRendererInitDelay = (ms) => {
  __rendererInitDelayMs = ms
}
/** Test hook: makes the RenderPipeline ctor throw — exercises fallbacks. */
export const __setPipelineCtorFails = (v) => {
  __pipelineCtorFails = v
}

/**
 * WebGPU renderer stub — records render calls and exposes the
 * backend.device.queue surface engine code touches; init honors the
 * __setRendererInitDelay hook so boot-race branches stay reachable.
 */
export class WebGPURenderer {
  constructor(opts) {
    this.opts = opts
    this.shadowMap = {}
    this.backend = { device: { queue: { onSubmittedWorkDone: async () => {} } } }
    this.renderCalls = 0
  }

  async init() {
    if (__rendererInitDelayMs) {
      await new Promise((r) => setTimeout(r, __rendererInitDelayMs))
    }
  }
  async compileAsync() {}
  render() {
    this.renderCalls += 1
  }
  dispose() {}
  setSize() {}
  setPixelRatio() {}
  getMaxAnisotropy() {
    return 4
  }
}

/**
 * Render-pipeline stub — counts render() calls; the ctor throws when the
 * __setPipelineCtorFails hook is armed so fallback paths run.
 */
export class RenderPipeline {
  constructor() {
    if (__pipelineCtorFails) throw new Error('pipeline-disabled')

    this.outputNode = null
    this.renderCalls = 0
  }

  render() {
    this.renderCalls += 1
  }

  dispose() {}
}

export const MeshPhysicalNodeMaterial = chain()
export const MeshBasicNodeMaterial = chain()
export const MeshStandardNodeMaterial = chain()
