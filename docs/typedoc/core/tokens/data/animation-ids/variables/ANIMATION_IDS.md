[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/data/animation-ids](../README.md) / ANIMATION\_IDS

```ts
const ANIMATION_IDS: Readonly<{
  BURGER_BUTTON: 'burger-button'
  NAV_MENU_BACKGROUND: 'nav-menu-background'
  NAV_MENU: 'nav-menu'
  NAV_FLAG: 'nav-flag'
  SWITCH_SLIDER: 'switch-slider'
  THEME_SLIDER: 'theme-slider'
  CLOSE_BUTTON: 'close-button'
  SKELETON: 'skeleton'
  INTRO_LOADER: 'intro-loader'
  SITE_TOAST: 'site-toast'
  MOSAIC_BURN: 'mosaic-burn'
  MOSAIC_TILE: 'mosaic-tile'
  MEDIA_PROGRESSIVE: 'media-progressive'
  GLITCH_PORTRAIT: 'glitch-portrait'
  DIVIDER_SHEEN: 'divider-sheen'
  TEXT_DRAW: 'text-draw'
  RING_SHEEN: 'ring-sheen'
  CORNER_BRACKETS: 'corner-brackets'
  SCENE_3D: 'scene-3d'
  GENIE_MODAL: 'genie-modal'
  CAROUSEL: 'carousel'
  ABOUT_TEXT: 'about-text'
  RELATED_TILE: 'related-tile'
  NOTE_DOT: 'note-dot'
  BODY_GLOW: 'body-glow'
  PROGRESS_BAR: 'progress-bar'
}>
```

Defined in: core/tokens/data/animation-ids.ts:22

Frozen animated-surface id map — every element that moves on the
site maps to exactly one id; several live elements may share an id
(every media figure shares `MEDIA_PROGRESSIVE`).

Each record in the translations node carries two fields:
`alt` — one-sentence label (img alt / aria-label source).
`longdesc` — the full description: element, animation name,
behavior, triggers, tech stack and purpose — the
text AI agents, SEO crawlers and assistive tech read.
