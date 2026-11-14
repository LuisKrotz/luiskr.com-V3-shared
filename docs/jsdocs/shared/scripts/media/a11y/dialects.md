# `shared\scripts\media\a11y\dialects.mjs`

Dialect derivation for the site's four contact languages —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\dialects.mjs`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `DIALECT_LOCALES`

Dialect locales this module serves — keyed to their MT base locale.

### `CONSISTENCY`

Minimum share of observations that must agree for a pair to stick.

### `tokenize`

Tokenizes a string into alternating word/non-word runs — whitespace and
punctuation tokens are preserved verbatim so reassembly is loss-free.

- `@param` {string} text
- `@returns` {string[]}

### `matchCase`

Case-shape copier: 'UND'→'UN' style base casing reapplies to output.

### `lcsAlign`

LCS alignment of two token sequences — returns index pairs
`[baseIdx, dialIdx]` aligned inside the common subsequence plus the
unaligned leftovers that constitute substitutions/insertions.

- `@param` {string[]} a Base token list.
- `@param` {string[]} b Dialect token list.
- `@returns` {{aligned: Array<[number,number]>, baseOnly: number[], dialOnly: number[]}}

### `collectPairs`

Recursively collects `[path, baseText, dialText]` triples from two
parallel translation trees — only where BOTH sides carry a string leaf
(a missing dialect leaf contributes nothing).

- `@param` {*} baseNode Base-locale subtree.
- `@param` {*} dialNode Dialect-locale subtree.
- `@param` {string[]} path Accumulated key path.
- `@param` {Array<[string, string, string]>} out Sink triples.

### `buildDialectTables`

Mines the DB corpus into per-dialect word maps.

- `@param` {object} db Full `translations` object keyed by locale.
- `@returns` {Map<string, Map<string, string>>} locale → (base word → dialect word).

### `applyDialect`

Applies a dialect table word-by-word, preserving the source casing.
Non-word tokens pass through untouched.

- `@param` {string} text Base-language text.
- `@param` {string} locale Dialect locale code.
- `@param` {Map<string, Map<string, string>>} tables From buildDialectTables.
- `@returns` {string} Dialect-derived text.
