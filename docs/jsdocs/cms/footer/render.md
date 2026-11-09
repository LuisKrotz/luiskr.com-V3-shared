# `cms\footer\render.tsx`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\footer\render.tsx`                     |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `sectionCard`

Section card shell: numbered title + subtitle + optional header action
(usually a sync/add button). Shared by all three footer sections so the
card chrome is declared once.

### `listSection`

Titled subsection wrapping one channel list — bridges to the host's
`_renderChannelList` (in `lists.ts`) which emits the per-row controls;
`prefix`/`labelField`/`extraField` select which model slice the rows
write back to.

### `renderFooterEditor`

Top-level template for the footers editor — header + save, language
picker, then three section cards: homepage contact footer (title/
subtitle + two channel lines), legal navigation links, and the
case-study footer (title, disclaimer note, socials).

- `@param` host — the CmsFooterEditor hosting the data slices
