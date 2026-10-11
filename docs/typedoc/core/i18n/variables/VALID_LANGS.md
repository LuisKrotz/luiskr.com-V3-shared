[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [core/i18n](../README.md) / VALID\_LANGS

```ts
const VALID_LANGS: readonly (
  | "en"
  | "br"
  | "es"
  | "de"
  | "fr"
  | "it"
  | "ru"
  | "hrk"
  | "cas"
  | "riv"
  | "gn"
  | "tln"
  | "gl"
  | "ca"
  | "nl"
  | "ga")[];
```

Defined in: core/i18n.ts:67

Ordered list of routable locale codes — drives `detectLangFromPath` and
the CMS locale switcher. Order matches LANG_OPTIONS (picker order).
