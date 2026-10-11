[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [cms/tokens/fields/media](../README.md) / CMS\_MEDIA\_IDS

```ts
const CMS_MEDIA_IDS: Readonly<{
  FILE_INPUT: "cms-media-file-input";
  RUN: "cms-media-run";
  RESET: "cms-media-reset";
  CLEAR_LIST: "cms-media-clear-list";
  DOWNLOAD: "cms-media-download";
  TOOLS_INSTALL: "cms-media-tools-install";
  TOOLS_RECHECK: "cms-media-tools-recheck";
}>;
```

Defined in: cms/tokens/fields/media.ts:47

Frozen cms media element-id map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
