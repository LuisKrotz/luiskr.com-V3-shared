[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [cms/tokens](../README.md) / CMS\_TABS

```ts
const CMS_TABS: Readonly<{
  PORTFOLIO: "portfolio";
  PROJECTS: "projects";
  ABOUT: "about";
  FOOTER: "footer";
  PLAYGROUND: "playground";
  LANGUAGES: "languages";
  MEDIA: "media";
  DEPLOY: "deploy";
}>;
```

Defined in: cms/tokens.ts:26

Frozen cms map — sole declaration site for these tokens; consumers read members and never
re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.
