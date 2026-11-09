# `shared\build\css-split.mjs`

Breakpoint splitter for compiled stylesheets.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\build\css-split.mjs`                        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `MIN_WIDTH_RE`

Pure `min-width` media queries — range syntax and legacy form.

### `minWidthOf`

Extracts the px value from a pure min-width query, or null for anything
else (max-width, ranges, pointer/print/reduced-motion, compound queries).
Compound queries stay in base deliberately: class membership is ambiguous
and their byte share is small.

- `@param` {string} query media query text without `@media`.
- `@returns` {number|null} px value or null.

### `topLevelParts`

Splits a compiled stylesheet into ordered top-level parts, separating
`@media` blocks from everything else. String literals, comments, and
nested braces are skipped so `content:'@media'` or a braced declaration
never breaks the scan. Iterative depth tracking — the input is a flat
byte stream, not a self-similar tree.

- `@param` {string} css compiled (possibly minified) stylesheet text.
- `@returns` {Array<{kind:'media'|'other', query:string, text:string, body:string}>}

### `innerSelectors`

Lists the selector texts of every rule inside a media block's body —
the depth-1 pre-brace spans. Used by the component conflict guard; a
nested at-rule's prelude is captured too, which can only over-keep a
block in base, never under-keep.

- `@param` {string} body media block inner text including its outer braces.
- `@returns` {string[]} trimmed selector texts.

### `innerRuleTexts`

Captures the depth-1 rule spans inside a media block's body — each
`selector{declarations}` span verbatim, selector start through its
closing brace. A nested at-rule's whole `{...}` span is captured as one
"rule", which is still a verbatim-comparable unit. String literals,
comments, and nested braces are skipped.

- `@param` {string} body media block inner text including its outer braces.
- `@returns` {string[]} rule texts in source order.

### `dedupeMediaRules`

Drops provably redundant rules from a compiled sheet. When the same
`selector{declarations}` rule appears inside `@media (min-width:Apx)`
and again inside `@media (min-width:Bpx)` with A <= B, the B copy is
dead text — every viewport matching >=B already matched >=A, so the
identical earlier-width rule reproduces it at any position. This holds
for the cumulative outputs built here because every file that could
contain the >=B block also contains the >=A block. Position and block
order are irrelevant to the drop decision — only domain width matters.
Whole media blocks whose body empties are removed; byte-identical
duplicate media blocks of any query type are also dropped. Non-pure
media queries and unconditional parts are never touched — only
verbatim-redundant copies ever leave the sheet, never reordered rules.

- `@param` {string} css compiled stylesheet text.
- `@returns` {string} the sheet with redundant min-width copies removed.

### `splitDocumentSheet`

Splits the document (<link>-delivered) stylesheet into cumulative sheets
per width class. `tablet` = base + mobile + tablet blocks — the original
text with only future-class media blocks dropped in place, preserving
rule order exactly.

- `@param` {string} css compiled stylesheet text.
- `@returns` {Record<string,string>} {mobile,tablet,desktop,wide} sheets.

### `splitComponentSheet`

Splits a component `?inline`-style sheet into an embedded base plus
lazily-delivered width-class tiers. Base keeps every part that is not a
pure min-width media block; each tier string is the source-ordered join
of moved media blocks up to that class — adopted after the base sheet,
so the only relocation hazard is a later KEPT part sharing a selector:
those blocks stay in base. Tiers whose cumulative content adds nothing
over the previous class are omitted (the runtime falls back to the
highest defined lower tier).

- `@param` {string} css compiled component stylesheet text.
- `@returns` {{base:string, tiers:Record<string,string>, guarded:string[]}}
