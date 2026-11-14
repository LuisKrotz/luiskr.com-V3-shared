[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/css/parallax](../README.md) / PARALLAX\_CSS\_PROPS

```ts
const PARALLAX_CSS_PROPS: Readonly<{
  DECK_Y: '--deck-parallax-y'
  FOOT_Y: '--foot-parallax-y'
  ABOUT_MAIN_Y: '--about-parallax-main-y'
  ABOUT_TEXT_Y: '--about-parallax-text-y'
  CONTACT_Y: '--contact-parallax-y'
  AWARDS_Y: '--awards-parallax-y'
}>
```

Defined in: core/tokens/css/parallax.ts:16

Parallax CSS custom-property names — sole declaration site. The home
view's parallax session (routes/views/home/parallax.ts) writes these
inline on each section host once per scroll frame; the custom
properties inherit into the host's shadow DOM where the component's
own stylesheet consumes them (`var(--…)` inside translate3d on INNER
content — never on the painted section root, so section backgrounds
and boundaries stay glued to the page).
