/**
 * @file build-wasm.js
 * @description Emits the runtime math engine as a WASM binary assembled
 * by the tiny encoder below — no toolchain (wat2wasm/clang/cargo) needed
 * at build time, but the module is declared READABLY: function signatures
 * and instruction sequences are written in spec terms, and every section
 * length/index is LEB128-computed by the encoder instead of being
 * hand-maintained.
 *
 * The same bytes are written under two names (engine.wasm, layout.wasm):
 * callers fetch whichever name their loader expects, and shipping one
 * binary twice costs nothing because the module is ~400 bytes.
 *
 * Module contents (all f32 math, 8 exports — consumers in
 * core/utils/wasm/wasm-layout.ts):
 *   calc_column_width           (i32 cols, f32 container, f32 gap)
 *                               → (container − (cols−1)·gap) / cols
 *   calc_card_height            (f32 w, f32 aspect, f32 pad) → w/aspect + pad
 *   calc_carousel_ring_offset   (f32 a, f32 b, f32 c) → (a/b)·c
 *   calc_carousel_scroll_target (i32 idx, f32 card, f32 gap) → idx·(card+gap)
 *   calc_ease_out_cubic         (f32 t) → 1 − (1−t)³
 *   calc_draw_text_delay        (i32 idx, f32 delay) → delay / max(idx, 1)
 *   calc_draw_text_offset       (i32 idx, f32 a, f32 b) → a·b + idx·30
 *   calc_media_scale            (f32 w,h, cw,ch) → min(cw/w, ch/h, 1)
 */
import fs from 'node:fs'
import path from 'node:path'

// ── WASM spec vocabulary ─────────────────────────────────────────────
// Opcodes/valtypes/section ids are the binary-format spec's own names —
// the instruction tables below read like the spec they encode.

/** WASM value-type codes (§5.3.1). */
const VALTYPE = Object.freeze({
  I32: 0x7f,
  F32: 0x7d,
})

/** WASM opcodes used by the engine's numeric bodies (§A.5). */
const OP = Object.freeze({
  LOCAL_GET: 0x20,
  LOCAL_TEE: 0x22,
  F32_CONST: 0x43,
  END: 0x0b,
  F32_ADD: 0x92,
  F32_SUB: 0x93,
  F32_MUL: 0x94,
  F32_DIV: 0x95,
  F32_MIN: 0x96,
  F32_MAX: 0x97,
  F32_CONVERT_I32_S: 0xb2,
})

/** WASM section ids in the order they must appear (§5.5). */
const SECTION = Object.freeze({
  TYPE: 0x01,
  FUNCTION: 0x03,
  EXPORT: 0x07,
  CODE: 0x0a,
})

/** External-kind code for a function export (§5.5.8). */
const EXTERNAL_KIND_FUNCTION = 0x00

/**
 * Per-character cascade step baked into calc_draw_text_offset — the
 * wasm mirror of core/tokens/media/dimensions.ts's
 * DRAW_TIMINGS.DRAW_INDEX_STEP_MS (tokens are .ts, unreachable from a
 * plain-node build script — keep the two in sync by the documented
 * contract).
 */
const DRAW_INDEX_STEP_MS = 30.0

// ── Instruction shorthand ────────────────────────────────────────────
// Bodies are written as [mnemonic, ...operands] tuples so the math reads
// like the spec's stack-machine listing rather than a byte dump.

/** `local.get i` — push parameter i onto the stack. */
const get = (i) => [OP.LOCAL_GET, i]
/** `f32.const v` — push the f32 literal v (encoded little-endian). */
const f32 = (v) => [OP.F32_CONST, v]
/** `f32.convert_i32_s` — widen the i32 on top of the stack to f32. */
const i32_to_f32 = [OP.F32_CONVERT_I32_S]

const ADD = [OP.F32_ADD]
const SUB = [OP.F32_SUB]
const MUL = [OP.F32_MUL]
const DIV = [OP.F32_DIV]
const MIN = [OP.F32_MIN]
const MAX = [OP.F32_MAX]
const END = [OP.END]

// ── The module — one entry per exported function ─────────────────────

/** The engine's export table: spec-shaped signatures + bodies. */
const FUNCTIONS = [
  {
    name: 'calc_column_width',
    params: [VALTYPE.I32, VALTYPE.F32, VALTYPE.F32],
    result: VALTYPE.F32,
    // (container − (cols−1)·gap) / cols — grid column width.
    body: [
      get(1),
      get(0),
      i32_to_f32,
      f32(1.0),
      SUB,
      get(2),
      MUL,
      SUB,
      get(0),
      i32_to_f32,
      DIV,
      END,
    ],
  },
  {
    name: 'calc_card_height',
    params: [VALTYPE.F32, VALTYPE.F32, VALTYPE.F32],
    result: VALTYPE.F32,
    // width ÷ aspect + padding — grid card height.
    body: [get(0), get(1), DIV, get(2), ADD, END],
  },
  {
    name: 'calc_carousel_ring_offset',
    params: [VALTYPE.F32, VALTYPE.F32, VALTYPE.F32],
    result: VALTYPE.F32,
    // (elapsed/duration)·circumference — autoplay ring progress.
    body: [get(0), get(1), DIV, get(2), MUL, END],
  },
  {
    name: 'calc_carousel_scroll_target',
    params: [VALTYPE.I32, VALTYPE.F32, VALTYPE.F32],
    result: VALTYPE.F32,
    // idx·(card+gap) — scrollLeft that centers slide idx.
    body: [get(0), i32_to_f32, get(1), get(2), ADD, MUL, END],
  },
  {
    name: 'calc_ease_out_cubic',
    params: [VALTYPE.F32],
    result: VALTYPE.F32,
    // 1 − (1−t)³ — fast start, decelerating stop.
    body: [
      f32(1.0),
      f32(1.0),
      get(0),
      SUB,
      f32(1.0),
      get(0),
      SUB,
      MUL,
      f32(1.0),
      get(0),
      SUB,
      MUL,
      SUB,
      END,
    ],
  },
  {
    name: 'calc_draw_text_delay',
    params: [VALTYPE.I32, VALTYPE.F32],
    result: VALTYPE.F32,
    // delay / max(idx, 1) — per-char delay shrinks with index; the max
    // guards a zero-index divide.
    body: [get(1), get(0), i32_to_f32, f32(1.0), MAX, DIV, END],
  },
  {
    name: 'calc_draw_text_offset',
    params: [VALTYPE.I32, VALTYPE.F32, VALTYPE.F32],
    result: VALTYPE.F32,
    // a·b + idx·DRAW_INDEX_STEP_MS — base offset plus the per-char cascade.
    body: [get(1), get(2), MUL, get(0), i32_to_f32, f32(DRAW_INDEX_STEP_MS), MUL, ADD, END],
  },
  {
    name: 'calc_media_scale',
    params: [VALTYPE.F32, VALTYPE.F32, VALTYPE.F32, VALTYPE.F32],
    result: VALTYPE.F32,
    // min(boundW/w, boundH/h, 1) — contain-fit, never upscales.
    body: [get(2), get(0), DIV, get(3), get(1), DIV, MIN, f32(1.0), MIN, END],
  },
]

// ── The encoder — LEB128 lengths, nothing hand-counted ───────────────

/**
 * Unsigned LEB128 for a non-negative integer — the encoding every WASM
 * section size, vector length, and index uses.
 * @param value Non-negative integer.
 * @returns Byte list, little-endian base-128 with the continuation bit.
 */
const uleb = (value) => {
  const bytes = []
  let remaining = value

  do {
    let byte = remaining & 0x7f

    remaining >>>= 7

    if (remaining !== 0) byte |= 0x80

    bytes.push(byte)
  } while (remaining !== 0)

  return bytes
}

/**
 * IEEE-754 f32 little-endian bytes — the `f32.const` operand form.
 * @param value JS number.
 * @returns Four bytes.
 */
const f32Bytes = (value) => Array.from(new Uint8Array(new Float32Array([value]).buffer))

/**
 * WASM vector: uleb(count) followed by each item's flattened bytes.
 * @param items Array of byte-lists.
 * @returns Encoded vector.
 */
const vec = (items) => [...uleb(items.length), ...items.flat()]

/**
 * A WASM section: section id + uleb(payload length) + payload. Sizes are
 * always computed — a stale hand-counted length is how the previous
 * revision shipped a corrupt (double type-section) binary.
 * @param id Section id from SECTION.
 * @param payload Encoded section body.
 * @returns Encoded section.
 */
const section = (id, payload) => [id, ...uleb(payload.length), ...payload]

/**
 * UTF-8 bytes of an export name — WASM names are length-prefixed UTF-8.
 * @param name Export name string.
 * @returns Length-prefixed name bytes.
 */
const nameBytes = (name) => {
  const utf8 = Buffer.from(name, 'utf8')

  return [...uleb(utf8.length), ...utf8]
}

/**
 * A function body as instruction tuples → code-section bytes: uleb body
 * size + 0 locals + flattened instructions.
 * @param instructions Instruction tuples — opcode byte then operands.
 * @returns Encoded function body.
 */
const bodyBytes = (instructions) => {
  const ops = instructions.flatMap((instr) => {
    const [opcode, operand] = instr

    // Operand shape by opcode: f32 const → 4 LE bytes; local ops → uleb
    // index; stack ops carry no operand.
    if (opcode === OP.F32_CONST) return [opcode, ...f32Bytes(operand)]

    if (opcode === OP.LOCAL_GET || opcode === OP.LOCAL_TEE) return [opcode, ...uleb(operand)]

    return [opcode]
  })

  // Body = local-decl count (0) + instruction stream.
  return [...uleb(1 + ops.length), 0x00, ...ops]
}

// ── Assemble the module ──────────────────────────────────────────────

/**
 * Signature table — deduplicated (param,result) shapes so the type
 * section carries each form once (the previous revision emitted the
 * whole type section twice — invalid per §5.5 ordering, rejected by
 * every engine).
 */
const signatures = []
const signatureIndex = new Map()

for (const fn of FUNCTIONS) {
  const key = `${fn.params.join(',')}->${fn.result}`

  if (!signatureIndex.has(key)) {
    signatureIndex.set(key, signatures.length)

    signatures.push(fn)
  }
}

// Type section: each signature = 0x60 func marker + param vec + 1 result.
const typeSection = section(
  SECTION.TYPE,
  vec(signatures.map((fn) => [0x60, ...vec(fn.params.map((t) => [t])), ...vec([[fn.result]])]))
)

// Function section: function index → type index.
const functionSection = section(
  SECTION.FUNCTION,
  vec(FUNCTIONS.map((fn) => uleb(signatureIndex.get(`${fn.params.join(',')}->${fn.result}`))))
)

// Export section: name + kind 0x00 (func) + function index.
const exportSection = section(
  SECTION.EXPORT,
  vec(FUNCTIONS.map((fn, i) => [...nameBytes(fn.name), EXTERNAL_KIND_FUNCTION, ...uleb(i)]))
)

// Code section: one body per function, same order as the function section.
const codeSection = section(SECTION.CODE, vec(FUNCTIONS.map((fn) => bodyBytes(fn.body))))

const wasmBytes = new Uint8Array([
  // \0asm magic + version 1.
  0x00,
  0x61,
  0x73,
  0x6d,
  0x01,
  0x00,
  0x00,
  0x00,
  ...typeSection,
  ...functionSection,
  ...exportSection,
  ...codeSection,
])

// ── Emit + self-check ────────────────────────────────────────────────

// Output dir inside the core module's public assets — served verbatim
// by the static host, so the .wasm ships untouched by the bundler.
const publicWasmDir = path.resolve('core/public/scripts/wasm')

if (!fs.existsSync(publicWasmDir)) {
  fs.mkdirSync(publicWasmDir, { recursive: true })
}

// One module, two filenames — the carousel loader and the layout
// engine each fetch their own name; both get the same 8 exports.
fs.writeFileSync(path.join(publicWasmDir, 'engine.wasm'), wasmBytes)
fs.writeFileSync(path.join(publicWasmDir, 'layout.wasm'), wasmBytes)

// Instantiate the bytes we just wrote — a malformed module must fail
// THIS build step, not silently degrade every visitor to the JS
// fallback (the failure mode that hid the corrupt binary for months).
const { instance } = await WebAssembly.instantiate(wasmBytes)
const missing = FUNCTIONS.map((fn) => fn.name).filter(
  (name) => typeof instance.exports[name] !== 'function'
)

if (missing.length > 0) {
  throw new Error(`build-wasm: emitted module is missing exports: ${missing.join(', ')}`)
}

console.log(
  `Successfully generated WASM Engine binaries (${wasmBytes.length} B, 8 exports) in core/public/scripts/wasm/`
)
