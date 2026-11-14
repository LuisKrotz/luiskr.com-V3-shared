# `core\tokens\classes\sitemap.ts`

Sitemap page class tokens — token group for the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\sitemap.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SITEMAP_CLASSES`

Frozen sitemap class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `SITEMAP`

Page wrapper — the full-bleed sitemap column.

### `SITEMAP_TITLE`

Page <h1> — the localized sitemap title.

### `SITEMAP_INTRO`

Intro line under the title — the localized page description.

### `SITEMAP_INDEX`

The DOM link index — <nav> with the full nested link tree.

### `SITEMAP_GROUP`

One section group (pages/legal/portfolio/playground/docs).

### `SITEMAP_GROUP_TITLE`

Group heading — the localized section name.

### `SITEMAP_GROUP_TOGGLE`

Disclosure button inside a collapsible group's heading — toggles the
media walls (they mount their cards on first open).

### `SITEMAP_GROUP_CHEVRON`

Disclosure chevron SVG inside the toggle — its aria-expanded
transform is replayed as a mount animation (the view re-renders
fresh nodes on toggle, so a transition can't run).

### `SITEMAP_GROUP_CHEVRON_SPIN_OPEN`

One-shot spin stamped on the just-OPENED group's chevron — the
keyframe sweeps the closed angle to the node's resting transform.

### `SITEMAP_GROUP_CHEVRON_SPIN_CLOSE`

Same one-shot contract for the just-CLOSED group — sweeps the
open angle back to rest.

### `SITEMAP_GROUP_MOSAIC`

Mosaic modifier — media groups span the full grid and render one
packed card wall (the skyline masonry), not the page-list flow.

### `SITEMAP_GROUP_WIDE`

Wide modifier — a long flat group (portfolio) spans the full
index grid and flows its page rows into multi-column tracks
instead of one tall single column.

### `SITEMAP_WALL`

Packed tile wall — the skyline packer's coordinate space; tile
geometry is all inline styles.

### `SITEMAP_CARD`

One packed media card — media + caption overlays.

### `SITEMAP_CARD_TITLE`

Card title link — the top caption overlay (DOM-first, before media).

### `SITEMAP_CARD_LOCALES`

Card locale-chip row — the bottom caption overlay.

### `SITEMAP_CARD_DESC`

Card description — the media caption text; `hidden` on screen and
revealed as the under-media description line on paper.

### `SITEMAP_CARD_FIGURE`

<media-figure> host class inside a card (classes attr passthrough).

### `SITEMAP_CARD_IMG`

Plain capture <img> inside a card — playground share images have no
mozjpeg ladder, so they paint the absolute file URL directly.

### `SITEMAP_PAGE`

Page row inside a group — page link + its locale chips.

### `SITEMAP_PAGE_LINK`

The page's own link (current locale).

### `SITEMAP_LOCALES`

Locale-chip row under a page link.

### `SITEMAP_LOCALE`

One locale chip — a leaf link to the page's localized URL.

### `SITEMAP_LANGS`

Locale-code legend under the intro — the <fieldset> decoding each
uppercase chip (EN, BR, HRK, …) into its language name.

### `SITEMAP_LANGS_TITLE`

The fieldset's <legend> label — names the decoder block.

### `SITEMAP_LANGS_LIST`

The <ul> of "CODE — Name" pairs inside the fieldset.

### `SITEMAP_LANG`

One legend item — a "CODE — Name" list row.

### `SITEMAP_LANG_CODE`

The legend's code term — the uppercase chip abbreviation.

### `SITEMAP_LANG_NAME`

The legend's language description — the locale's full label.
