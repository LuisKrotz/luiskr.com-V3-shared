[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/media-convert/consts](../README.md) / TOOL\_ROWS

```ts
const TOOL_ROWS: readonly object[]
```

Defined in: cms/media-convert/consts.ts:51

Tool rows rendered by the setup panel — [label, tools-map keys]. Order
is display order; required entries block conversion when missing.
`imagemagick` collapses the platform split: `magick` (win32/IM7) or
`convert` (POSIX/IM6) both satisfy it. `pdftoppm` (poppler) is only
needed when PDFs enter the batch, so it reports optional — a missing
row fails the dropped PDFs, never the whole converter.
