# `cms\projects\types.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\projects\types.ts`                     |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### (module scope)

One media row in the CMS project editor.

### `src`

Extensionless CDN stem (resolved by the gcs() helper for previews).

### `label`

Alt/label text shown in the editor + emitted as media labels.

### `isVideo`

Whether the media is a video (drives poster-URL resolution).

### `size`

Intrinsic [w,h] for aspect-ratio layouts.

### (module scope)

One project section — [text paragraphs, media items] tuple.

### (module scope)

The persisted CMS project document shape.

### `title`

Project title (heading + metadata).

### `folder`

CDN folder prefix all media resolves under.

### `seo`

SEO flags — noIndex removes the project from crawlers/schema.

### `cover`

Cover media shown in mosaics/cards.

### `sections`

Ordered content sections.

### (module scope)

ISO 8601 publication timestamp (git-derived in database.json) —
preserved verbatim through load/save; feeds NewsArticle
datePublished, article:published_time, RSS pubDate and the news
sitemap. Optional: legacy nodes may lack it.

### (module scope)

ISO 8601 last-modified timestamp — stamped by saveProjectData on
every write; feeds dateModified, article:modified_time and sitemap
<lastmod>.

### `gcs`

Builds the CDN URL for a media filename the same way the public site
does — videos resolve to their poster frame, images to the mozjpeg
thumb variant — so CMS previews show exactly what visitors will see.

- `@param` filename Extensionless CDN stem (folder + name).
- `@param` isVideo When true, resolves the generated poster frame instead.
- `@returns` The full preview URL.

### `defaultCover`

Default cover placeholder used by new/legacy projects.

### `newMediaSlot`

Default section media slot dimensions.
