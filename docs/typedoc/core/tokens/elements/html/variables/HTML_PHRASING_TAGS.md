[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/elements/html](../README.md) / HTML\_PHRASING\_TAGS

```ts
const HTML_PHRASING_TAGS: Readonly<{
  H1: 'h1'
  H2: 'h2'
  H3: 'h3'
  H4: 'h4'
  H5: 'h5'
  H6: 'h6'
  P: 'p'
  A: 'a'
  BUTTON: 'button'
  LABEL: 'label'
  SPAN: 'span'
  LI: 'li'
  DT: 'dt'
  DD: 'dd'
  FIGCAPTION: 'figcaption'
  LEGEND: 'legend'
  BLOCKQUOTE: 'blockquote'
  EM: 'em'
  STRONG: 'strong'
  SMALL: 'small'
  B: 'b'
  I: 'i'
  U: 'u'
  S: 's'
  MARK: 'mark'
  TIME: 'time'
  CODE: 'code'
  ABBR: 'abbr'
  CITE: 'cite'
  Q: 'q'
  DFN: 'dfn'
  INS: 'ins'
  DEL: 'del'
  SUB: 'sub'
  SUP: 'sup'
  KBD: 'kbd'
  SAMP: 'samp'
  VAR: 'var'
  OUTPUT: 'output'
  BDI: 'bdi'
  BDO: 'bdo'
  RUBY: 'ruby'
  DATA: 'data'
  PRE: 'pre'
}>
```

Defined in: core/tokens/elements/html.ts:53

Frozen phrasing/text-bearing host map — elements whose textContent
would absorb an injected sibling text node, polluting the host's
accessible name and visible-text extraction. Sole declaration site
for these tags; strings shared with `HTML_TAGS` are referenced, not
redeclared (zero-hardcoding rules 4–5).
