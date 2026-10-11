[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/loader](../README.md) / LOADER\_CLASSES

```ts
const LOADER_CLASSES: Readonly<{
  INTRO_LOADER: "intro-loader";
  INTRO_LOADER_GLOW: "intro-loader-glow";
  INTRO_LOADER_CONTENT: "intro-loader-content";
  INTRO_LOADER_SPINNER: "intro-loader-spinner";
  INTRO_LOADER_PERCENT: "intro-loader-percent";
  INTRO_LOADER_TITLE: "intro-loader-title";
  INTRO_LOADER_MSG: "intro-loader-msg";
  INTRO_LOADER_BAR: "intro-loader-bar";
  INTRO_LOADER_BAR_FILL: "intro-loader-bar-fill";
  INTRO_LOADER_HIDDEN: "intro-loader--hidden";
}>;
```

Defined in: core/tokens/classes/loader.ts:13

Frozen loader class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
