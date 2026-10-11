[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/strings/canvas](../README.md) / CANVAS\_STRINGS

```ts
const CANVAS_STRINGS: Readonly<{
  COMPOSITE_SOURCE_OVER: "source-over";
  COMPOSITE_MULTIPLY: "multiply";
  COMPOSITE_LIGHTER: "lighter";
  COMPOSITE_DIFFERENCE: "difference";
  COMPOSITE_DESTINATION_OUT: "destination-out";
  COMPOSITE_DESTINATION_IN: "destination-in";
  COMPOSITE_SOURCE_ATOP: "source-atop";
  CHANNEL_RED: "rgb(255, 0, 0)";
  CHANNEL_CYAN: "rgb(0, 255, 255)";
  INVERT_FILL: "rgb(235, 235, 235)";
  INK_BLACK: "black";
  INK_WHITE: "white";
  INK_CLEAR: "transparent";
  FILTER_ROLL: "saturate(1.7) brightness(1.12)";
  FILTER_NONE: "none";
  EMBER_CORE: "rgb(255, 214, 130)";
  EMBER_MID: "rgb(255, 122, 26)";
  EMBER_TIP: "rgb(198, 44, 10)";
  BURN_SCORCH: "rgba(26, 20, 16, 0.85)";
  BURN_GLOW: "rgba(255, 96, 18, 0.55)";
}>;
```

Defined in: core/tokens/strings/canvas.ts:17

Canvas 2D compositing strings. Sole declaration site — consumers import
members from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).

CHANNEL_RED / CHANNEL_CYAN are channel-isolation mask inks, not theme
colors: filling an image's copy with them under `multiply` keeps only
that RGB channel so offset 'lighter' composites re-add it as a chromatic
ghost — the mechanism behind real analog-style RGB split.
