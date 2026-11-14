# `shared\scripts\build\build-wasm.js`

Emits the runtime math engine as a WASM binary assembled

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\build-wasm.js`                |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `VALTYPE`

WASM value-type codes (§5.3.1).

### `OP`

WASM opcodes used by the engine's numeric bodies (§A.5).

### `SECTION`

WASM section ids in the order they must appear (§5.5).

### `EXTERNAL_KIND_FUNCTION`

External-kind code for a function export (§5.5.8).

### `DRAW_INDEX_STEP_MS`

Per-character cascade step baked into calc_draw_text_offset — the
wasm mirror of core/tokens/media/dimensions.ts's
DRAW_TIMINGS.DRAW_INDEX_STEP_MS (tokens are .ts, unreachable from a
plain-node build script — keep the two in sync by the documented
contract).

### `get`

`local.get i` — push parameter i onto the stack.

### `f32`

`f32.const v` — push the f32 literal v (encoded little-endian).

### `i32_to_f32`

`f32.convert_i32_s` — widen the i32 on top of the stack to f32.

### `FUNCTIONS`

The engine's export table: spec-shaped signatures + bodies.

### `uleb`

Unsigned LEB128 for a non-negative integer — the encoding every WASM
section size, vector length, and index uses.

- `@param` value Non-negative integer.
- `@returns` Byte list, little-endian base-128 with the continuation bit.

### `f32Bytes`

IEEE-754 f32 little-endian bytes — the `f32.const` operand form.

- `@param` value JS number.
- `@returns` Four bytes.

### `vec`

WASM vector: uleb(count) followed by each item's flattened bytes.

- `@param` items Array of byte-lists.
- `@returns` Encoded vector.

### `section`

A WASM section: section id + uleb(payload length) + payload. Sizes are
always computed — a stale hand-counted length is how the previous
revision shipped a corrupt (double type-section) binary.

- `@param` id Section id from SECTION.
- `@param` payload Encoded section body.
- `@returns` Encoded section.

### `nameBytes`

UTF-8 bytes of an export name — WASM names are length-prefixed UTF-8.

- `@param` name Export name string.
- `@returns` Length-prefixed name bytes.

### `bodyBytes`

A function body as instruction tuples → code-section bytes: uleb body
size + 0 locals + flattened instructions.

- `@param` instructions Instruction tuples — opcode byte then operands.
- `@returns` Encoded function body.

### `signatures`

Signature table — deduplicated (param,result) shapes so the type
section carries each form once (the previous revision emitted the
whole type section twice — invalid per §5.5 ordering, rejected by
every engine).
