# `core\utils\print\qr.ts`

Dependency-free QR encoder for the print surfaces — byte-mode

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\print\qr.ts`                              |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MAX_VERSION`

Highest QR version — versions 1–40 are defined by the spec.

### `BYTE_MODE`

Byte-mode segment marker (0b0100) written ahead of the count field.

### `COUNT_BITS_SHORT`

Data-length field width: 8 bits through version 9, 16 from version 10.

### `PAD_A`

ISO/IEC 18004 pad bytes, alternating EC/11 once the terminator lands.

### `GF_POLY`

Reed–Solomon arithmetic lives in GF(256) over the 0x11D primitive poly.

### `FORMAT_POLY`

Format-info BCH(15,5) generator poly and its fixed XOR mask.

### `VERSION_POLY`

Version-info BCH(18,6) generator poly (versions ≥ 7 only).

### `MASK_COUNT`

Mask patterns the matrix is scored against — spec defines exactly 8.

### `QUIET`

Quiet-zone modules reserved around the symbol — the spec minimum is 4.

### `PENALTY_N1_RUN`

Penalty weights for the four mask-selection rules (N1–N4).

### `PENALTY_N3_PAT`

The 1:1:3:1:1 finder-like run the N3 rule hunts for.

### `ECC_PER_BLOCK_M`

Error-correction codewords per block at level M, indexed by version 1–40
(index 0 is a padding sentinel). ISO/IEC 18004 table 9, column M.

### `BLOCKS_M`

Reed–Solomon block count at level M, indexed by version 1–40 (index 0 is a
padding sentinel). ISO/IEC 18004 table 9, column M.

### `ALIGN_POSITIONS`

Alignment-pattern centre coordinates per version (index 0 is a padding
sentinel). ISO/IEC 18004 annex E — the spacing is irregular enough that
the spec table beats any derived formula for exactness.

### `rawModules`

Total modules carrying raw codeword bits for a version — the matrix area
minus finder/separator/timing/alignment/format/version reservations.

- `@param` ver QR version 1–40
- `@returns` raw module count (a few over a whole byte; the excess are remainder bits)

### `dataCodewords`

Data codewords a version carries at level M — raw modules rounded down to
bytes minus every block's ECC share.

- `@param` ver QR version 1–40
- `@returns` usable data codeword count

### `pickVersion`

Smallest version that fits a byte payload of `len` — mode marker + count
field + payload must fit inside the version's data bits.

- `@param` len payload byte count
- `@returns` version 1–40, or 0 when the payload outgrows v40-M

### `pushBits`

Bit-buffer appender — pushes `len` bits of `val`, MSB first.

- `@param` bits growing bit array (0/1 entries)
- `@param` val source integer
- `@param` len how many low bits of `val` to emit

### `encodeData`

Segment encoder — turns the UTF-8 payload into the version's data
codewords: byte-mode marker, count field, payload, up-to-4-bit terminator,
byte alignment, then alternating EC/11 pad bytes to capacity.

- `@param` bytes UTF-8 payload
- `@param` ver chosen version
- `@returns` data codewords (pre-ECC)

### `rsMultiply`

GF(256) carry-less multiply over the 0x11D primitive polynomial — the
Russian-peasant shift/XOR form used by the reference implementation.

- `@param` x multiplicand
- `@param` y multiplier
- `@returns` product byte

### `rsDivisor`

Generator polynomial of the given degree — the product
(x − r⁰)(x − r¹)…(x − r^{degree−1}) over GF(256), highest term first.

- `@param` degree ECC codewords per block
- `@returns` divisor coefficient array

### `rsRemainder`

Polynomial remainder — the ECC bytes for one data block under `divisor`.

- `@param` data block's data codewords
- `@param` divisor generator polynomial from rsDivisor
- `@returns` ECC codeword array, same length as divisor

### `interleave`

Block split + interleave — divides the data codewords into the spec's
short/long blocks, appends each block's ECC, then emits the byte stream
column-wise so every block's i-th byte lands adjacent. Short blocks carry
a pad slot at index `shortDataLen` that the interleave skips.

- `@param` data data codewords from encodeData
- `@param` ver chosen version
- `@returns` interleaved codeword stream (rawModules(ver)/8 bytes)

### `drawFormat`

Format-information writer — BCH(15,5) of (ecl‖mask) XOR 0x5412, drawn
twice around the finders, plus the always-dark module at (8, size−8).
Level M encodes as 0b00 so the 5-bit payload is just the mask id.

- `@param` m module matrix (1 dark / 0 light)
- `@param` f function-module mask
- `@param` size matrix side
- `@param` mask mask pattern id 0–7

### `drawFunction`

Function-layer painter — timing first (the finders overwrite their share),
then the three finder+separator rings, the alignment crosses (skipping
the three finder corners), the version blocks for ver ≥ 7, and a dummy
format pass to reserve those cells before data lands.

- `@param` ver chosen version
- `@returns` module matrix, function mask, and matrix side

### `placeData`

Zigzag data placement — interleaved bits drop into the free modules in
2-column sweeps from bottom-right, alternating direction, skipping the
column-6 timing strip.

- `@param` m module matrix
- `@param` f function-module mask
- `@param` size matrix side
- `@param` codewords interleaved data+ECC stream

### `maskBit`

Mask condition lookup — the eight spec formulae, 1 when the module inverts.

- `@param` mask pattern id 0–7
- `@param` x column
- `@param` y row
- `@returns` 1 to flip, 0 to keep

### `applyMask`

Mask toggler — XORs every non-function module whose mask condition holds.
Applying the same mask twice restores the matrix, which is how the trial
loop reverts each candidate.

- `@param` m module matrix (mutated in place)
- `@param` f function-module mask
- `@param` size matrix side
- `@param` mask pattern id 0–7

### `penaltyScore`

Spec penalty scorer — N1 adjacent-run, N2 same-colour 2×2, N3 finder-like
1:1:3:1:1 with a 4-light guard, N4 dark-share deviation. Lower is better.

- `@param` m module matrix
- `@param` size matrix side
- `@returns` penalty score

### `encodeQr`

Full encode — UTF-8 byte segment → smallest fitting version → data +
interleaved ECC → function layer → best of the 8 masks by penalty score.

- `@param` text payload (URLs in practice)
- `@returns` dark-module matrix + side, or null past the v40-M capacity

### `qrSvg`

Print-time QR element — a <svg><path></svg> pair drawn in currentColor so
the code inherits the document ink on paper. Adjacent dark modules on a
row merge into single h-runs so the path stays short for v30+ symbols.

- `@param` text payload — returns null when it outgrows v40-M
- `@returns` aria-hidden svg element (the wrapper link carries the semantics)
