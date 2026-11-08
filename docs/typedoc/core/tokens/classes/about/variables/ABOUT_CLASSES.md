[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/classes/about](../README.md) / ABOUT\_CLASSES

```ts
const ABOUT_CLASSES: Readonly<{
  ABOUT: 'about'
  ABOUT_MAIN: 'about-main'
  ABOUT_TITLE: 'about-title'
  ABOUT_SUBTITLE: 'about-subtitle'
  ABOUT_INTRO: 'about-intro'
  ABOUT_PROFILE_SECTION: 'about-profile-section'
  ABOUT_PROFILE_MEDIA: 'about-profile-media'
  ABOUT_PROFILE_NAME: 'about-profile-name'
  ABOUT_PROFILE_PICTURE: 'about-profile-picture'
  ABOUT_PROFILE_PICTURE_IMG: 'about-profile-picture-img'
  ABOUT_PROFILE_PICTURE_PLACEHOLDER: 'about-profile-picture-placeholder'
  ABOUT_PROFILE_PICTURE_GLITCH: 'about-profile-picture-glitch'
  ABOUT_PROFILE_PICTURE_MESH: 'about-profile-picture-mesh'
  ABOUT_PROFILE_HUD: 'about-profile-hud'
  ABOUT_HUD_NAME: 'about-profile-hud-name'
  ABOUT_HUD_COORDS: 'about-profile-hud-coords'
  ABOUT_HUD_LINE: 'about-profile-hud-line'
  ABOUT_HUD_OUT: 'about-profile-hud-out'
  ABOUT_PROFILE_TEXT: 'about-profile-text'
  ABOUT_ITEM: 'about-item'
  ABOUT_ITEM_TEXT: 'about-item-text'
}>
```

Defined in: core/tokens/classes/about.ts:24

Frozen about class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
