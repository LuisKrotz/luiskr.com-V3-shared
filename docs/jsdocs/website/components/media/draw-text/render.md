# `website\components\media\draw-text\render.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\draw-text\render.ts`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Render modes for the shadow content:
'plain' — pending/done states: contiguous word/space/br runs collapse
into ONE aria-hidden span (O(paragraphs) nodes instead of O(words);
a 500-word legal paragraph would otherwise mount ~1000 permanent
spans for text that may never animate). Tags keep real markup —
an anchor's plain inner text is its accessible name.
'words' — the fit fallback: `fitText` measures `.draw-text__word`
inline-blocks, so `fit` elements keep word spans pre/post animation.
'chars' — the animating state: per-char spans inside word spans.
All modes share one geometry: spaces are literal/natural-width text
everywhere (nbsp inside tags, matching the char-mode link rule), and
word spans are nowrap inline-blocks — so pending → animating → done
swaps never reflow the line.

### `RENDER_MODES`

Frozen render-mode token map — sole declaration site for the mode literals.

### `parseTokens`

Tokenizes the text into word/space/br/inline-tag chunks. Words split
at spaces and each character gets a global index `ci`. Spaces and
<br>s become layout-only tokens so line breaking stays identical to
unsplit text. The regex walks <br>, <tag>…</tag> (attrs preserved,
group 3 back-referenced for the closing tag), and bare text — so
inline markup inside CMS copy (e.g. an <em> or <a>) animates as one
continuous sequence.

### `tokenize`

Walks one segment of text — tag inner content recurses through this same
walker so nested markup (e.g. `<a><span>x</span></a>`) tokenizes instead
of leaking raw `<`/`>` chars into the output. `ci` is shared via closure
so the char stagger stays globally sequential across nesting levels.

### (module scope)

Builds the animated span tree. Each char span carries `--i`
(character index), `--char-delay`, `--offset` as CSS vars — the
stylesheet computes transition-delay = i·delay + offset, so the
whole stagger lives in CSS and JS only writes integers.
`withChars=false` renders plain words (pre/post-animation states).
Words are aria-hidden single units + the host keeps the real text —
screen readers read the whole string once instead of char-by-char.

### `chunkToHtml`

Renders one non-tag token to HTML — word tokens become animated spans via
`renderWord`, spaces become &nbsp;, everything else degrades to "".

- `@param` {DrawToken} chunk — the parsed token
- `@param` {RenderWord} renderWord — word renderer bound to the current delay/offset
- `@returns` {string} HTML for the token

### `tagToHtml`

Renders an HTML-ish tag token (e.g. <strong>, <a>) — recurses into its
chunks for the inner markup, then wraps with the original tag + attrs.
Anchors get an aria-label auto-generated from inner text when the author
did not provide one.

- `@param` {DrawToken} token — the tag token
- `@param` {RenderWord} renderWord — word renderer for nested word chunks
- `@returns` {string} HTML for the tag block

### `tokenToHtml`

Top-level token → HTML: <br> and space become aria-hidden layout
nodes (the space gets a span so the flex/grid layout sees a real box),
words render animated chars, tags recurse. Unknown token types return
"" — forward-compatible for tokenizer additions.

- `@param` token The parsed token.
- `@param` renderWord Word renderer bound to the current delay/offset.
- `@returns` HTML string for the token.

### `renderWordHtml`

Renders one word token's char spans. Exported so the char/offset math and
the empty-chars default are unit-testable — renderContent binds the running
word index `wi` via the closure below.

- `@param` chars Char tokens (each carries the global `--i` stagger index).
- `@param` wordIdx Running word index — feeds the `--wi` per-word cascade.
- `@param` delay Per-char delay in ms (written to `--char-delay`).
- `@param` offset Base offset in ms (written to `--offset`).
- `@param` withChars false → emit plain word text (pre/post-anim state).
- `@returns` The word's `<span>` HTML.

### `plainChunkToHtml`

One plain-mode token → markup. Words become escaped text (no span —
a pending paragraph needs zero per-word nodes), top-level spaces
become literal spaces, tags recurse through plainTagToHtml.

- `@param` chunk The parsed token.
- `@returns` HTML string for the token.

### `plainTagToHtml`

Plain-mode tag — real markup with a single aria-hidden wrapper for the
inner text (every visual copy stays hidden so the host's sr-only twin
is the one announcement). Anchors additionally carry the sr-only-alpha
twin — identical accessible-name topology to the animated render —
and keep their authored attrStr minus aria-label for the same
label-in-name parity reason documented at tagToHtml.

- `@param` token The tag token.
- `@returns` HTML for the tag block.

### `plainTokensToHtml`

Plain-mode assembly — consecutive word/space/br tokens collapse into
ONE aria-hidden span per run (a run can hold an entire paragraph), and
tag tokens emit real elements via plainTagToHtml so interactive
content stays reachable. Spaces inside a run are literal (natural
width — the same metrics the span modes use at top level).

- `@param` tokens Parsed top-level tokens.
- `@returns` The assembled plain-mode HTML.

### `renderContent`

Full pipeline: text → tokens → HTML string. The `wi` closure counter
assigns each rendered word a sequential index so the word-level
cascade (`--wi`/`--word-delay`) staggers in reading order, including
words nested inside tags. Empty input returns "" rather than a stub
span tree.

- `@param` text Raw text (may contain <br> and inline tags).
- `@param` delay Per-char stagger delay in ms.
- `@param` offset Base delay offset in ms.
- `@param` mode Which render to emit — 'chars' mounts the animating char
- `@returns` The assembled HTML string.
