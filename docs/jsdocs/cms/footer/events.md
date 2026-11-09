# `cms\footer\events.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\footer\events.ts`                      |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `bindEvents`

Wires the whole footer form — header buttons (save + the two
cross-locale syncs), the language selector and scalar title/disclaimer
inputs, then the four channel lists, each bound via `_bindListEvents`
with the prefix + label-field convention matching its DB shape
(`line1` channels carry an extra caption field; legal uses `page`;
socials use `network`).

- `@param` host — the CmsFooterEditor hosting the data slices

### `on`

Single-element scoped listener, no-op when the selector misses.
