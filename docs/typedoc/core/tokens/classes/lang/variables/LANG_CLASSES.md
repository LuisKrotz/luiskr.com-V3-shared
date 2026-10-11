[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/lang](../README.md) / LANG\_CLASSES

```ts
const LANG_CLASSES: Readonly<{
  LANG_DIALOG: "lang-dialog";
  LANG_GLASS_FOLLOWER: "lang-glass-follower";
}>;
```

Defined in: core/tokens/classes/lang.ts:13

Frozen lang class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
