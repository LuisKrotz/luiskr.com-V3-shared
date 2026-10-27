[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/classes/reader](../README.md) / READER\_CLASSES

```ts
const READER_CLASSES: Readonly<{
  CONTENT: 'reader-content'
  OFFSCREEN: 'reader-content--offscreen'
  PAINTED: 'reader-content--painted'
}>
```

Defined in: core/tokens/classes/reader.ts:14

Frozen reader-content class-name map — sole declaration site for these
tokens; consumers import members rather than re-declaring the literals
(zero-hardcoding rules 4–5). The build-time page generator emits
`reader-content` on the same <article> the runtime hoists offscreen.
