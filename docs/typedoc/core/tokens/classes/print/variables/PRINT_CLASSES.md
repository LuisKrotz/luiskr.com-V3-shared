[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/classes/print](../README.md) / PRINT\_CLASSES

```ts
const PRINT_CLASSES: Readonly<{
  COPY: 'print-copy'
  SRC: 'print-src'
  FALLBACK: 'print-fallback'
  CAPTION: 'print-caption'
  QR_LINK: 'print-qr-link'
  QR_PAGE: 'print-qr-page'
  LINK_URL: 'print-link-url'
  FILL: 'print-fill'
  FILL_PARA: 'print-fill-para'
  DOC: 'print-doc'
  COVER_ONLY: 'print-cover-only'
  LANDSCAPE: 'print-landscape'
  PLATE_DOC: 'print-plate-doc'
  COVER: 'print-cover'
  COVER_TITLE: 'print-cover-title'
  COVER_PHOTO: 'print-cover-photo'
  COVER_ISSUE: 'print-cover-issue'
  COVER_SUB: 'print-cover-sub'
  FACE: 'print-face'
  FACE_GLOW: 'print-face-glow'
  FACE_GRID: 'print-face-grid'
  FACE_SPINNER: 'print-face-spinner'
  FACE_SPINNER_INNER: 'print-face-spinner-inner'
  FACE_TITLE: 'print-face-title'
  BACK: 'print-back'
  BACK_QR: 'print-back-qr'
  BACK_COPY: 'print-back-copy'
  BACK_HOME: 'print-back-home'
  BLEED: 'print-bleed'
  BLEED_LANDSCAPE: 'print-bleed--landscape'
  BLEED_HEAD: 'print-bleed-head'
  PLATE: 'print-plate'
  PLATE_LANDSCAPE: 'print-plate--landscape'
  PLATE_INTERNAL: 'print-plate--internal'
  PLATE_DOSSIER: 'print-plate--dossier'
  SECTION: 'print-section'
  SECTION_NUM: 'print-section-num'
  SECTION_TITLE: 'print-section-title'
  SECTION_COUNT: 'print-section-count'
  TOC: 'print-toc'
  TOC_HEAD: 'print-toc-head'
  TOC_ITEM: 'print-toc-item'
  TOC_ITEM_SUB: 'print-toc-item--sub'
  TOC_NUM: 'print-toc-num'
  TOC_TEXT: 'print-toc-text'
  VEIL: 'print-veil'
  VEIL_SPINNER: 'print-veil-spinner'
  VEIL_SPINNER_INNER: 'print-veil-spinner-inner'
}>
```

Defined in: core/tokens/classes/print.ts:16

Frozen print class-name map — the runtime swaps non-printable surfaces
(canvases, videos) for static <img> stand-ins on beforeprint and tags both
sides so the print sheet can flip them; every printed media surface gets a
source/date/author caption, footer links get a small QR each, and the
document ends with a single page-URL QR.
