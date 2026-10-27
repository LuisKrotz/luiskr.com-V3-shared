[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/ids/app](../README.md) / APP\_IDS

```ts
const APP_IDS: Readonly<{
  APP: 'app'
  MAIN: 'main'
  MAIN_CONTENT: 'main-content'
  VIEW_OUTLET: 'view-outlet'
  SF_NAV_PANEL: 'sf-nav-panel'
  SF_INSTRUCTIONS_PANEL: 'sf-instructions-panel'
  SF_PANEL_TITLE: 'sf-panel-title'
  SF_NAV_DESC: 'sf-nav-desc'
  SF_PANEL_TAGLINE: 'sf-panel-tagline'
  SF_INSTRUCTIONS_HINT: 'sf-instructions-hint'
  SF_ITEM_DESC_PREFIX: 'sf-item-desc-'
  SF_MUSIC_LIST: 'sf-music-list'
  NAV_MENU_PANEL: 'nav-menu-panel'
  NAV_MENU_TITLE: 'nav-menu-title'
  COOKIES_INFO: 'cookies-info'
  READER_CONTENT: 'reader-content'
}>
```

Defined in: core/tokens/ids/app.ts:13

Frozen app element-id map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
