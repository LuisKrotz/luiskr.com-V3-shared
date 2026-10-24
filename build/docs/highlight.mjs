/**
 * @file docs/highlight.mjs
 * @description Build-time syntax highlighter for the docs portal's code
 * payloads — a dependency-free tokenizer that wraps tokens in the same
 * span classes the portal styles (`str kwd com typ lit pun fun var`),
 * which are inked by the themed `--cov-syn-*` variables (Dracula in
 * dark mode, Material Light in light mode).
 *
 * The highlighter is a single-pass scanner: at each cursor position it
 * tries, in order, line comment → block comment → string → number →
 * word (keyword / function-call / type) → punctuation run. Markup
 * languages (html/xml/svg) and key-value configs (yaml/toml/ini/env)
 * get dedicated scannners since their token shapes differ.
 */

/** Escape one raw fragment for embedding in the <pre> payload. */
const esc = (s) =>
  s.replace(/&/gu, '&amp;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;').replace(/"/gu, '&quot;')

/** Wrap a token in its span class. */
const span = (cls, text) => `<span class="${cls}">${esc(text)}</span>`

/**
 * Keyword sets per language family. A word hits `kwd` when listed,
 * `fun` when followed by `(`, `typ` when capitalized.
 */
const KW_C = new Set(
  `abstract as async await break case catch class const continue debugger declare default delete do else enum export extends finally for from function get goto if implements import in instanceof interface let namespace new of operator override package private protected public readonly require return satisfies set static super switch this throw try type typeof var void while with yield any bigint boolean never null number object string symbol true false undefined unknown`.split(
    ' '
  )
)
const KW_C2 = new Set(
  `auto bool char double extern float int long register short signed sizeof struct typedef union unsigned volatile const_cast dynamic_cast reinterpret_cast static_cast template typename using virtual friend inline explicit mutable nullptr noexecpt noexcept alignas alignof asm decltype concept requires co_await co_return co_yield module noexcept`.split(
    ' '
  )
)
const KW_GO = new Set(
  `break case chan const continue defer else fallthrough for func go goto if import interface map package range return select struct switch type var`.split(
    ' '
  )
)
const KW_RS = new Set(
  `as async await break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type unsafe use where while box vec`.split(
    ' '
  )
)
const KW_JAVA = new Set(
  `abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public record return sealed short static strictfp super switch synchronized this throw throws transient try var void volatile while yield permits`.split(
    ' '
  )
)
const KW_PY = new Set(
  `and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield`.split(
    ' '
  )
)
const KW_SHELL = new Set(
  `alias break case cd command continue declare do done echo elif else esac eval exec exit export fi for function getopts if in let local printf pwd read readonly return select set shift source test then trap type typeset umask unalias unset until wait while`.split(
    ' '
  )
)
const KW_SQL = new Set(
  `add all alter and any as asc between by case check column commit constraint create database default delete desc distinct drop else end exists explain foreign from grant group having in index inner insert into is join key left like limit not null offset on or order outer primary references revoke right rollback schema select set table then to union unique update values view when where with`.split(
    ' '
  )
)
const KW_JSON = new Set(['true', 'false', 'null'])

/** Per-extension language spec. */
const LANG = Object.freeze({
  // C-family + friends
  ts: { line: '//', block: ['/*', '*/'], quotes: ['"', "'", '`'], kw: KW_C, extraKw: KW_C },
  tsx: { line: '//', block: ['/*', '*/'], quotes: ['"', "'", '`'], kw: KW_C },
  js: { line: '//', block: ['/*', '*/'], quotes: ['"', "'", '`'], kw: KW_C },
  mjs: { line: '//', block: ['/*', '*/'], quotes: ['"', "'", '`'], kw: KW_C },
  cjs: { line: '//', block: ['/*', '*/'], quotes: ['"', "'", '`'], kw: KW_C },
  jsx: { line: '//', block: ['/*', '*/'], quotes: ['"', "'", '`'], kw: KW_C },
  java: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_JAVA },
  c: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_C2 },
  h: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_C2 },
  cpp: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_C2 },
  cxx: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_C2 },
  cc: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_C2 },
  hpp: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_C2 },
  cs: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_C },
  php: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_C, vars: true },
  rb: { line: '#', block: ['=begin', '=end'], quotes: ['"', "'"], kw: KW_C },
  go: { line: '//', block: ['/*', '*/'], quotes: ['"', "'", '`'], kw: KW_GO },
  rs: { line: '//', block: ['/*', '*/'], quotes: ['"', "'"], kw: KW_RS },
  swift: { line: '//', block: ['/*', '*/'], quotes: ['"'], kw: KW_C },
  kt: { line: '//', block: ['/*', '*/'], quotes: ['"'], kw: KW_C },
  kts: { line: '//', block: ['/*', '*/'], quotes: ['"'], kw: KW_C },
  scala: { line: '//', block: ['/*', '*/'], quotes: ['"'], kw: KW_C },
  lua: { line: '--', block: ['--[[', ']]'], quotes: ['"', "'"], kw: KW_C },
  py: { line: '#', block: null, quotes: ['"', "'"], kw: KW_PY },
  r: { line: '#', block: null, quotes: ['"', "'"], kw: KW_C },
  sh: { line: '#', block: null, quotes: ['"', "'"], kw: KW_SHELL, vars: true },
  zsh: { line: '#', block: null, quotes: ['"', "'"], kw: KW_SHELL, vars: true },
  bash: { line: '#', block: null, quotes: ['"', "'"], kw: KW_SHELL, vars: true },
  fish: { line: '#', block: null, quotes: ['"', "'"], kw: KW_SHELL, vars: true },
  ps1: { line: '#', block: null, quotes: ['"', "'"], kw: KW_SHELL, vars: true },
  bat: { line: 'REM', block: null, quotes: ['"'], kw: KW_SHELL, vars: true },
  cmd: { line: 'REM', block: null, quotes: ['"'], kw: KW_SHELL, vars: true },
  sql: { line: '--', block: ['/*', '*/'], quotes: ['"', "'", '`'], kw: KW_SQL, ci: true },
  // Data/config
  json: { data: 'json' },
  json5: { data: 'json' },
  jsonc: { data: 'json', line: '//' },
  map: { data: 'json' },
  webmanifest: { data: 'json' },
  lock: { data: 'kv' },
  yml: { data: 'kv', line: '#' },
  yaml: { data: 'kv', line: '#' },
  toml: { data: 'kv', line: '#' },
  ini: { data: 'kv', line: ';', altLine: '#' },
  cfg: { data: 'kv', line: '#' },
  conf: { data: 'kv', line: '#' },
  env: { data: 'kv', line: '#' },
  properties: { data: 'kv', line: '#' },
  vim: { data: 'kv', line: '"' },
  // Markup
  html: { markup: true },
  htm: { markup: true },
  xml: { markup: true },
  xsl: { markup: true },
  plist: { markup: true },
  svg: { markup: true },
  vue: { markup: true },
  // Styles
  css: { css: true },
  scss: { css: true },
  sass: { css: true },
  less: { css: true },
})

const IDENT = /[\p{L}_$][\p{L}\p{N}_$-]*/uy
const NUM = /\d[\d._exbofna-f]*/iy
const SPACE = /\s+/y
const PUNCT = /[^\p{L}\p{N}_$\s]+/uy

/**
 * Scan a C-style language: comments, quoted strings, numbers,
 * identifiers classified keyword/function/type, punctuation runs.
 */
const scanC = (src, spec) => {
  const out = []
  let i = 0
  const n = src.length
  const kwOf = (w) => (spec.ci ? w.toLowerCase() : w)

  while (i < n) {
    const ch = src[i]

    // line comment
    if (spec.line && src.startsWith(spec.line, i)) {
      const end = src.indexOf('\n', i)
      const stop = end === -1 ? n : end
      out.push(span('com', src.slice(i, stop)))
      i = stop
      continue
    }

    // block comment
    if (spec.block && src.startsWith(spec.block[0], i)) {
      const end = src.indexOf(spec.block[1], i + spec.block[0].length)
      const stop = end === -1 ? n : end + spec.block[1].length
      out.push(span('com', src.slice(i, stop)))
      i = stop
      continue
    }

    // preprocessor / decorators land on pun→typ quickly via word rule
    if (spec.vars && ch === '$') {
      IDENT.lastIndex = i + 1
      const m = IDENT.exec(src)
      const stop = m ? IDENT.lastIndex : i + 1
      out.push(span('typ', src.slice(i, stop)))
      i = stop
      continue
    }

    // strings
    if (spec.quotes.includes(ch)) {
      let j = i + 1
      while (j < n) {
        const c = src[j]
        if (c === '\\') {
          j += 2
          continue
        }
        if (c === ch) {
          j += 1
          break
        }
        if (c === '\n' && ch !== '`') break // unterminated → stop at EOL
        j += 1
      }
      out.push(span('str', src.slice(i, j)))
      i = j
      continue
    }

    // whitespace — keep raw
    SPACE.lastIndex = i
    if (SPACE.test(src)) {
      out.push(src.slice(i, SPACE.lastIndex))
      i = SPACE.lastIndex
      continue
    }

    // numbers
    NUM.lastIndex = i
    if (NUM.test(src)) {
      out.push(span('lit', src.slice(i, NUM.lastIndex)))
      i = NUM.lastIndex
      continue
    }

    // identifiers
    IDENT.lastIndex = i
    if (IDENT.test(src)) {
      const word = src.slice(i, IDENT.lastIndex)
      const after = src.slice(IDENT.lastIndex).match(/^\s*\(/u)
      if (spec.kw.has(kwOf(word))) {
        out.push(span('kwd', word))
      } else if (after) {
        out.push(span('fun', word))
      } else if (/^[\p{Lu}]/u.test(word)) {
        out.push(span('typ', word))
      } else {
        out.push(esc(word))
      }
      i = IDENT.lastIndex
      continue
    }

    // punctuation run
    PUNCT.lastIndex = i
    if (PUNCT.test(src)) {
      out.push(span('pun', src.slice(i, PUNCT.lastIndex)))
      i = PUNCT.lastIndex
      continue
    }

    out.push(esc(ch))
    i += 1
  }

  return out.join('')
}

/** JSON: keys → typ, string values → str, numbers → lit, consts → kwd. */
const scanJson = (src) => {
  const out = []
  let i = 0
  const n = src.length

  while (i < n) {
    const ch = src[i]

    SPACE.lastIndex = i
    if (SPACE.test(src)) {
      out.push(src.slice(i, SPACE.lastIndex))
      i = SPACE.lastIndex
      continue
    }

    if (ch === '"') {
      let j = i + 1
      while (j < n && src[j] !== '"') {
        if (src[j] === '\\') j += 2
        else j += 1
      }
      j += 1
      const tail = src.slice(j).match(/^\s*:/u)
      out.push(span(tail ? 'typ' : 'str', src.slice(i, j)))
      i = j
      continue
    }

    NUM.lastIndex = i
    if (NUM.test(src)) {
      out.push(span('lit', src.slice(i, NUM.lastIndex)))
      i = NUM.lastIndex
      continue
    }

    IDENT.lastIndex = i
    if (IDENT.test(src)) {
      const word = src.slice(i, IDENT.lastIndex)
      out.push(KW_JSON.has(word) ? span('kwd', word) : esc(word))
      i = IDENT.lastIndex
      continue
    }

    PUNCT.lastIndex = i
    if (PUNCT.test(src)) {
      out.push(span('pun', src.slice(i, PUNCT.lastIndex)))
      i = PUNCT.lastIndex
      continue
    }

    out.push(esc(ch))
    i += 1
  }

  return out.join('')
}

/** YAML/TOML/INI/ENV: keys → typ, values → str/lit, comments → com. */
const scanKv = (src, spec) => {
  const out = []

  for (const raw of src.split('\n')) {
    const line = raw
    const cmts = [spec.line, spec.altLine].filter(Boolean)
    let cut = -1
    for (const c of cmts) {
      const idx = line.indexOf(c)
      if (idx !== -1 && (cut === -1 || idx < cut)) cut = idx
    }
    const body = cut === -1 ? line : line.slice(0, cut)
    const tail = cut === -1 ? '' : line.slice(cut)

    if (body.trim()) {
      // key side of the first : or =
      const sep = body.search(/[:=]/u)
      if (sep > 0) {
        out.push(span('typ', body.slice(0, sep)))
        out.push(span('pun', body[sep]))
        // value side — quote-aware
        let v = body.slice(sep + 1)
        const lead = v.match(/^\s*/u)[0]
        out.push(lead)
        v = v.slice(lead.length)
        if (/^["'`]/u.test(v)) {
          out.push(span('str', v))
        } else if (/^(?:true|false|null|yes|no|on|off)$/iu.test(v.trim())) {
          out.push(span('kwd', v))
        } else if (/^-?[\d.]+/u.test(v)) {
          out.push(span('lit', v))
        } else {
          out.push(esc(v))
        }
      } else {
        out.push(esc(body))
      }
    }

    if (tail) out.push(span('com', tail))
    out.push('\n')
  }

  return out.join('').replace(/\n$/u, '')
}

/** HTML/XML: tags, attributes, comments, doctype, text. */
const scanMarkup = (src) => {
  const out = []
  let i = 0
  const n = src.length

  while (i < n) {
    if (src.startsWith('<!--', i)) {
      const end = src.indexOf('-->', i + 4)
      const stop = end === -1 ? n : end + 3
      out.push(span('com', src.slice(i, stop)))
      i = stop
      continue
    }

    if (src.startsWith('<!', i) || src.startsWith('<?', i)) {
      const end = src.indexOf('>', i)
      const stop = end === -1 ? n : end + 1
      out.push(span('kwd', src.slice(i, stop)))
      i = stop
      continue
    }

    if (src[i] === '<') {
      // find tag end, respecting quotes
      let j = i + 1
      let q = ''
      while (j < n) {
        const c = src[j]
        if (q) {
          if (c === q) q = ''
        } else if (c === '"' || c === "'") q = c
        else if (c === '>') break
        j += 1
      }
      const tag = src.slice(i, Math.min(j + 1, n))
      out.push(markTag(tag))
      i = j + 1
      continue
    }

    // text run to next '<'
    const next = src.indexOf('<', i)
    const stop = next === -1 ? n : next
    out.push(esc(src.slice(i, stop)))
    i = stop
  }

  return out.join('')
}

const markTag = (tag) => {
  // tokenize inside a single <…> slice
  const inner = tag.replace(/^<\/?/u, '')
  const slash = tag.startsWith('</')
  const m = inner.match(/^[\w:-]+/u)
  const name = m ? m[0] : ''
  const rest = inner.slice(name.length).replace(/>$/u, '')
  const out = [span('pun', slash ? '</' : '<'), name ? span('kwd', name) : '']

  // attr walk: name or name="v" or name='v' or name=v
  const re = /\s*([\w:.-]+)(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+)?/guy
  let k = 0
  const body = rest
  while (k < body.length) {
    if (/^\s/u.test(body[k])) {
      out.push(' ')
      k += 1
      continue
    }
    re.lastIndex = k
    const m2 = re.exec(body)
    if (!m2) {
      out.push(esc(body.slice(k)))
      break
    }
    k = re.lastIndex
    if (m2[0].trim() === '') break
    out.push(span('typ', m2[1]))
    if (m2[2]) out.push(span('pun', m2[2]))
    if (m2[3]) out.push(span('str', m2[3]))
  }
  if (tag.endsWith('>')) out.push(span('pun', '>'))

  return out.join('')
}

/** CSS/SCSS: comments, strings, at-rules, props, values, colors. */
const scanCss = (src) => {
  const out = []
  let i = 0
  const n = src.length
  let depth = 0

  while (i < n) {
    const ch = src[i]

    if (src.startsWith('/*', i)) {
      const end = src.indexOf('*/', i + 2)
      const stop = end === -1 ? n : end + 2
      out.push(span('com', src.slice(i, stop)))
      i = stop
      continue
    }
    if (src.startsWith('//', i)) {
      const end = src.indexOf('\n', i)
      const stop = end === -1 ? n : end
      out.push(span('com', src.slice(i, stop)))
      i = stop
      continue
    }

    if (ch === '"' || ch === "'") {
      let j = i + 1
      while (j < n && src[j] !== ch && src[j] !== '\n') {
        if (src[j] === '\\') j += 2
        else j += 1
      }
      j = Math.min(j + 1, n)
      out.push(span('str', src.slice(i, j)))
      i = j
      continue
    }

    if (ch === '{') depth += 1
    else if (ch === '}') depth = Math.max(0, depth - 1)

    SPACE.lastIndex = i
    if (SPACE.test(src)) {
      out.push(src.slice(i, SPACE.lastIndex))
      i = SPACE.lastIndex
      continue
    }

    NUM.lastIndex = i
    if (NUM.test(src)) {
      out.push(span('lit', src.slice(i, NUM.lastIndex)))
      i = NUM.lastIndex
      continue
    }

    // hex color
    if (ch === '#') {
      const m = src.slice(i).match(/^#[0-9a-fA-F]{3,8}\b/u)
      if (m) {
        out.push(span('lit', m[0]))
        i += m[0].length
        continue
      }
    }

    // @at-rule
    if (ch === '@') {
      IDENT.lastIndex = i + 1
      if (IDENT.test(src)) {
        const word = src.slice(i + 1, IDENT.lastIndex)
        out.push(span('kwd', `@${word}`))
        i = IDENT.lastIndex
        continue
      }
    }

    // --css-var or ident
    if (ch === '-' && src[i + 1] === '-') {
      const m = src.slice(i).match(/^--[\w-]+/u)
      if (m) {
        out.push(span('typ', m[0]))
        i += m[0].length
        continue
      }
    }

    IDENT.lastIndex = i
    if (IDENT.test(src)) {
      const word = src.slice(i, IDENT.lastIndex)
      // inside a block: word followed by ':' → property name (typ)
      const ahead = src.slice(IDENT.lastIndex).match(/^\s*:/u)
      if (depth > 0 && ahead) {
        out.push(span('typ', word))
      } else if (
        /^(?:var|calc|url|rgba?|hsla?|color-mix|translate|rotate|scale|linear-gradient|radial-gradient)$/u.test(
          word
        )
      ) {
        out.push(span('fun', word))
      } else {
        out.push(esc(word))
      }
      i = IDENT.lastIndex
      continue
    }

    PUNCT.lastIndex = i
    if (PUNCT.test(src)) {
      out.push(span('pun', src.slice(i, PUNCT.lastIndex)))
      i = PUNCT.lastIndex
      continue
    }

    out.push(esc(ch))
    i += 1
  }

  return out.join('')
}

/**
 * Highlight a code payload.
 * @param {string} src  Raw file text.
 * @param {string} ext  Lower-cased extension without the dot.
 * @returns {string} HTML with `syn-*`-classed spans (prettify naming).
 */
export const highlightCode = (src, ext) => {
  const spec = LANG[ext]
  if (!spec) return esc(src)
  if (spec.markup) return scanMarkup(src)
  if (spec.data === 'json') return scanJson(src)
  if (spec.data === 'kv') return scanKv(src, spec)
  if (spec.css) return scanCss(src)
  return scanC(src, spec)
}
