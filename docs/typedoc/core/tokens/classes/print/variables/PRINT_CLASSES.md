[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/classes/print](../README.md) / PRINT\_CLASSES

```ts
const PRINT_CLASSES: Readonly<{
  COPY: 'print-copy'
  SRC: 'print-src'
}>
```

Defined in: core/tokens/classes/print.ts:14

Frozen print class-name map — the runtime swaps non-printable surfaces
(canvases, videos) for static <img> stand-ins on beforeprint and tags both
sides so the print sheet can flip them.
