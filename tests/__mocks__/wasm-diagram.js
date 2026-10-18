/**
 * @file wasm-diagram.js (mock)
 * @description Stub for core/utils/wasm/wasm-diagram.ts — the docs
 * mermaid module calls renderDiagram(); the mock records calls and
 * returns a placeholder SVG so tests assert wiring without wasm.
 * `failNext` makes the next call reject — the failure-path test sets
 * it instead of spying (ESM namespace objects can't be spied on).
 */

export const __diagramState = { calls: 0, lastTheme: null, lastSource: null, failNext: false }

export const renderDiagram = async (source, themeJson) => {
  __diagramState.calls++
  __diagramState.lastTheme = themeJson
  __diagramState.lastSource = source

  if (__diagramState.failNext) {
    __diagramState.failNext = false

    throw new Error('parse')
  }

  return '<svg data-diagram-mock="1"></svg>'
}
