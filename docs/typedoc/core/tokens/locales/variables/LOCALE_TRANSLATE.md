[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/tokens/locales](../README.md) / LOCALE\_TRANSLATE

```ts
const LOCALE_TRANSLATE: Readonly<
  Record<
    string,
    Readonly<{
      target: string
      dialectOf: string | null
    }>
  >
>
```

Defined in: core/tokens/locales.ts:78

Locale code → machine-translation routing for generated accessibility
text (WebVTT description tracks, longdesc files). `target` is the Cloud
Translation target code the locale's text is produced from; `dialectOf`
marks the site's contact/dialect locales (Hunsrik, Castellano,
Portuñol, Talian) whose text derives from the named sibling locale via
the dialect transform layer instead of a dedicated MT model — Cloud
Translation has no codes for them. Sole declaration site — the media
a11y pipeline and the coverage tests share it.
