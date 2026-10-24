/**
 * @file shared/scripts/build/gen-onnx-models.mjs
 * @description Emits the site's tiny ONNX models into
 * `website/public/models/` and copies the ONNX Runtime Web wasm/glue
 * binaries into `website/public/ort/` — no external model tooling, no
 * network: a minimal protobuf writer serializes hand-laid graphs whose
 * weights encode the same heuristics the JS fallbacks use, so every
 * tier (WebNN NPU → WebGPU → WASM EP → JS math) computes comparable
 * scores. Run directly (`node gen-onnx-models.mjs`) or from the build.
 */

import { existsSync, mkdirSync, writeFileSync, copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../..')
const MODELS_DIR = join(ROOT, 'website/public/models')
const ORT_DIR = join(ROOT, 'website/public/ort')
const ORT_DIST = join(ROOT, 'node_modules/onnxruntime-web/dist')

// ── Minimal protobuf writer (ONNX = proto3) ─────────────────────────────────
// wire types: 0 varint, 2 length-delimited. Only what the emitted graphs need.

/** Encodes a varint (tag field for int64/enum fields). */
const varint = (v) => {
  const out = []

  let n = BigInt(v)

  do {
    let b = Number(n & 0x7fn)

    n >>= 7n

    if (n) b |= 0x80

    out.push(b)
  } while (n)

  return Buffer.from(out)
}

/** Field header — fieldNumber << 3 | wireType. */
const tag = (field, wire) => varint((field << 3) | wire)

/** Length-delimited field (strings, bytes, messages, packed numerics). */
const bytes = (field, buf) => Buffer.concat([tag(field, 2), varint(buf.length), buf])

/** Varint field (int64/enum/int32). */
const vint = (field, v) => Buffer.concat([tag(field, 0), varint(v)])

/** UTF-8 string field. */
const str = (field, s) => bytes(field, Buffer.from(s, 'utf8'))

/** Packed repeated int64 field (dims, pads, kernel_shape…). */
const packedInts = (field, vals) => bytes(field, Buffer.concat(vals.map(varint)))

/** Little-endian float32 payload — TensorProto.raw_data. */
const rawF32 = (vals) => {
  const b = Buffer.alloc(vals.length * 4)

  vals.forEach((v, i) => b.writeFloatLE(v, i * 4))

  return b
}

// ── ONNX message builders ───────────────────────────────────────────────────

/** TensorShapeProto.Dim — fixed int64 dim or symbolic (dim_param). */
const dim = (v) => bytes(1, typeof v === 'string' ? str(2, v) : vint(1, v))

/** TensorShapeProto from an array of dim specs. */
const shape = (dims) => Buffer.concat(dims.map(dim))

/** TypeProto.Tensor — elem_type FLOAT(1) + shape. */
const tensorType = (dims) => bytes(1, Buffer.concat([vint(1, 1), bytes(2, shape(dims))]))

/** ValueInfoProto — input/output declaration. */
const valueInfo = (name, dims) =>
  Buffer.concat([str(1, name), bytes(2, Buffer.concat([tensorType(dims)]))])

/** TensorProto initializer — float32 weights stored as raw_data. */
const tensor = (name, dims, vals) =>
  Buffer.concat([
    packedInts(1, dims),
    vint(2, 1), // FLOAT
    str(8, name),
    bytes(9, rawF32(vals)),
  ])

/** AttributeProto — INT / INTS / STRING kinds only. */
const attrInt = (name, v) => Buffer.concat([str(1, name), vint(3, v), vint(20, 2)])
const attrInts = (name, vals) => Buffer.concat([str(1, name), packedInts(8, vals), vint(20, 7)])
const attrStr = (name, s) =>
  Buffer.concat([str(1, name), bytes(4, Buffer.from(s, 'utf8')), vint(20, 3)])

/** NodeProto — op_type + input/output name lists + optional attrs. */
const node = (op, inputs, outputs, attrs = []) =>
  Buffer.concat([
    ...inputs.map((i) => str(1, i)),
    ...outputs.map((o) => str(2, o)),
    str(3, `${op}_${outputs[0]}`),
    str(4, op),
    ...attrs.map((a) => bytes(5, a)),
  ])

/** OperatorSetIdProto — default domain, opset 13 (DepthToSpace CRD era). */
const opset = () => bytes(8, vint(2, 13))

/** GraphProto — nodes, initializers, value infos, name. */
const graph = (name, nodes, initializers, inputs, outputs) =>
  Buffer.concat([
    ...nodes.map((n) => bytes(1, n)),
    str(2, name),
    ...initializers.map((t) => bytes(5, t)),
    ...inputs.map((i) => bytes(11, i)),
    ...outputs.map((o) => bytes(12, o)),
  ])

/** ModelProto — ir_version 8 + producer + graph + opset import. */
const model = (graphBuf) =>
  Buffer.concat([vint(1, 8), str(2, 'luiskr.com gen-onnx-models'), bytes(7, graphBuf), opset()])

// ── Model graphs ────────────────────────────────────────────────────────────

/**
 * intent.onnx — navigation-intent scorer. Input [1,3]
 * [hoverNorm, speedNorm, bias]; sigmoid(w·x) → P(navigate). Weights are
 * the NPU-tier heuristic lifted into logit space: hover +2.2, speed −1.6,
 * intercept −0.6 — a slow dwelt hover lands ≈0.83, a fast flyby ≈0.35.
 */
const intentModel = () => {
  const w = tensor('w', [3, 1], [2.2, -1.6, -0.6])

  const nodes = [node('MatMul', ['features', 'w'], ['mm']), node('Sigmoid', ['mm'], ['prob'])]

  return model(
    graph('intent', nodes, [w], [valueInfo('features', [1, 3])], [valueInfo('prob', [1, 1])])
  )
}

/**
 * frametime.onnx — next-frame-time predictor for three.js adaptive
 * quality. Input [1,6]: last 5 frame times normalized to 100ms plus the
 * current quality level 0–1. One hidden relu layer computes a damped
 * exponential average + quality uplift; output ≈ predicted frame ms/100.
 */
const frametimeModel = () => {
  // features = [f0..f4 normalized frame times (oldest→newest), quality].
  // The [6,8] weight matrix is row-major input-dim × hidden-dim:
  //   h0..h3 recency bands across the window, h4 a mean band, h5 the
  //   variance probe (mixed-sign frame weights — a spiking window feeds
  //   it, a steady window cancels to ~0), h6/h7 dormant. Frame-column
  //   sums total 8.30 → prediction reads ≈ 1.04·mean(window) +
  //   0.02·quality + b2 — the small quality uplift makes a raised pixel
  //   ratio predict slightly more work. The previous calibration leaked
  //   ~0.10 per unit quality into the output, so a healthy ~10ms frame
  //   at q=1 predicted ~0.24 — over the 0.17 down-threshold — and
  //   ratcheted every surface to the 0.5 floor where it could never
  //   climb back (recovery needs a prediction under 0.12).
  const w1Mat = [
    // h0    h1     h2     h3     h4     h5     h6    h7
    0.95,
    0.38,
    0.19,
    0.38,
    0.038,
    -0.57,
    0.0,
    0.0, // f0 oldest
    0.475,
    0.57,
    0.285,
    0.38,
    0.19,
    0.76,
    0.0,
    0.0, // f1
    0.19,
    0.38,
    0.57,
    0.38,
    0.285,
    -0.38,
    0.0,
    0.0, // f2
    0.095,
    0.285,
    0.475,
    0.38,
    0.38,
    -0.38,
    0.0,
    0.0, // f3
    0.095,
    0.095,
    0.095,
    0.38,
    0.38,
    0.57,
    0.0,
    0.0, // f4 newest
    0.0,
    0.0,
    0.0,
    0.0,
    0.06,
    0.0,
    0.1,
    -0.3, // quality
  ]

  const b1 = new Array(8).fill(0)

  const w2 = new Array(8).fill(0.125) // mean of hidden bands

  const b2 = [0.02] // ≈2ms floor — a perfect frame is never predicted 0

  const nodes = [
    node('MatMul', ['features', 'w1'], ['mm1']),
    node('Add', ['mm1', 'b1'], ['s1']),
    node('Relu', ['s1'], ['h']),
    node('MatMul', ['h', 'w2'], ['mm2']),
    node('Add', ['mm2', 'b2'], ['ms']),
  ]

  const inits = [
    tensor('w1', [6, 8], w1Mat),
    tensor('b1', [1, 8], b1),
    tensor('w2', [8, 1], w2),
    tensor('b2', [1, 1], b2),
  ]

  return model(
    graph('frametime', nodes, inits, [valueInfo('features', [1, 6])], [valueInfo('ms', [1, 1])])
  )
}

/**
 * Catmull-Rom bicubic kernel weights for one 2× subpixel phase — the
 * four taps of the cubic filter at the given fractional offset, exactly
 * as a software bicubic resampler computes them.
 * @param off Fractional sample offset (−0.25 / +0.25 for 2× phases).
 * @returns Four filter taps for input rows {floor−1…floor+2}.
 */
const cubicTaps = (off) =>
  [-1.25 - off, -0.25 - off, 0.75 - off, 1.75 - off].map((d) => {
    const a = Math.abs(d)

    if (a < 1) return 1.5 * a * a * a - 2.5 * a * a + 1
    if (a < 2) return -0.5 * a * a * a + 2.5 * a * a - 4 * a + 2

    return 0
  })

/**
 * superres-2x.onnx — a real Conv + DepthToSpace 2× upscaler. Conv(3→12,
 * 4×4, pads [1,1,2,2]) produces 3 channels × 4 subpixel phases whose
 * kernels are separable Catmull-Rom bicubic taps (outer product of the
 * vertical and horizontal phase filters); DepthToSpace(mode=CRD)
 * interleaves them into the 2× image. This is GPU/NPU-accelerated
 * bicubic super-resolution — markedly sharper than canvas drawImage
 * bilinear when only the low-quality source exists.
 */
const superresModel = () => {
  const tapsA = cubicTaps(-0.25) // output even row/col
  const tapsB = cubicTaps(0.25) // output odd row/col
  const phases = [tapsA, tapsB] // dy ∈ {0,1}
  const wVals = new Array(12 * 3 * 16).fill(0)

  // CRD channel order: c_in = c_out·4 + dy·2 + dx — kernel is the
  // vertical⊗horizontal outer product for that phase pair, per channel.
  for (let c = 0; c < 3; c++)
    for (let dy = 0; dy < 2; dy++)
      for (let dx = 0; dx < 2; dx++) {
        const oc = c * 4 + dy * 2 + dx

        for (let i = 0; i < 4; i++)
          for (let j = 0; j < 4; j++)
            wVals[(oc * 3 + c) * 16 + i * 4 + j] = phases[dy][i] * phases[dx][j]
      }

  const nodes = [
    node(
      'Conv',
      ['lr', 'cw', 'cb'],
      ['sub'],
      [
        attrInts('kernel_shape', [4, 4]),
        attrInts('pads', [1, 1, 2, 2]),
        attrInts('strides', [1, 1]),
      ]
    ),
    node('DepthToSpace', ['sub'], ['hr'], [attrInt('blocksize', 2), attrStr('mode', 'CRD')]),
  ]

  const inits = [tensor('cw', [12, 3, 4, 4], wVals), tensor('cb', [12], new Array(12).fill(0))]

  return model(
    graph(
      'superres-2x',
      nodes,
      inits,
      [valueInfo('lr', [1, 3, 'h', 'w'])],
      [valueInfo('hr', [1, 3, 'h2', 'w2'])]
    )
  )
}

/**
 * diagram-cost.onnx — mermaid render-cost scorer for the docs viewer.
 * Input [1,4]: normalized [nodes, edges, nesting, selfMessages];
 * output is predicted raster+layout ms, used to decide whether the
 * diagram renders immediately or defers to idle so large graphs never
 * block docs interactivity. Linear model: cost ≈ 4·nodes + 6·edges +
 * 10·nesting + 2·self + 3.
 */
const diagramModel = () => {
  const w = tensor('w', [4, 1], [4.0, 6.0, 10.0, 2.0])
  const b = tensor('b', [1, 1], [3.0])

  const nodes = [
    node('MatMul', ['features', 'w'], ['mm']),
    node('Add', ['mm', 'b'], ['s']),
    node('Relu', ['s'], ['cost']),
  ]

  return model(
    graph(
      'diagram-cost',
      nodes,
      [w, b],
      [valueInfo('features', [1, 4])],
      [valueInfo('cost', [1, 1])]
    )
  )
}

// ── Emit ────────────────────────────────────────────────────────────────────

const MODELS = {
  intent: intentModel,
  frametime: frametimeModel,
  'superres-2x': superresModel,
  'diagram-cost': diagramModel,
}

/** ORT binaries the webgpu bundle fetches from env.wasm.wasmPaths. */
const ORT_FILES = [
  'ort-wasm-simd-threaded.asyncify.mjs',
  'ort-wasm-simd-threaded.asyncify.wasm',
  'ort-wasm-simd-threaded.jsep.mjs',
  'ort-wasm-simd-threaded.jsep.wasm',
  'ort-wasm-simd-threaded.mjs',
  'ort-wasm-simd-threaded.wasm',
]

/**
 * Writes every model under `website/public/models/` and copies the ORT
 * runtime binaries into `website/public/ort/` (skipping files that are
 * already identical). Returns the list of files written — callers log.
 * @returns Paths (repo-relative) of emitted/copied files.
 */
export const genOnnxModels = () => {
  const written = []

  mkdirSync(MODELS_DIR, { recursive: true })
  mkdirSync(ORT_DIR, { recursive: true })

  for (const [slug, build] of Object.entries(MODELS)) {
    const buf = build()
    const file = join(MODELS_DIR, `${slug}.onnx`)

    writeFileSync(file, buf)
    written.push(file)
  }

  for (const f of ORT_FILES) {
    const src = join(ORT_DIST, f)
    const dst = join(ORT_DIR, f)

    if (!existsSync(src)) continue
    if (existsSync(dst)) continue // immutable artifact — never churns

    copyFileSync(src, dst)
    written.push(dst)
  }

  return written
}

// Direct invocation: `node shared/scripts/build/gen-onnx-models.mjs`
// Both sides normalized — fileURLToPath keeps backslashes on Windows.
if (
  process.argv[1] &&
  fileURLToPath(import.meta.url).replace(/\\/g, '/') === process.argv[1].replace(/\\/g, '/')
) {
  for (const f of genOnnxModels()) console.log(`gen-onnx-models → ${f}`)
}
