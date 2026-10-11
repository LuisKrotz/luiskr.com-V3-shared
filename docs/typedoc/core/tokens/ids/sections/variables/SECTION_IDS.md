[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/ids/sections](../README.md) / SECTION\_IDS

```ts
const SECTION_IDS: Readonly<{
  ABOUT: "about";
  CONTACT: "contact";
}>;
```

Defined in: core/tokens/ids/sections.ts:13

Frozen section element-id map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
