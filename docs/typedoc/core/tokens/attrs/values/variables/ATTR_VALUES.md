[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/attrs/values](../README.md) / ATTR\_VALUES

```ts
const ATTR_VALUES: Readonly<{
  EMPTY: "";
  TRUE: "true";
  FALSE: "false";
  NONE: "none";
  BLOCK: "block";
  FLEX: "flex";
  AUTO: "auto";
  HIDDEN: "hidden";
  VISIBLE: "visible";
  SMOOTH: "smooth";
  INSTANT: "instant";
  DELAY_25: "25";
  NEGATIVE_TABINDEX: "-1";
  HTTP: "http";
  LAZY: "lazy";
}>;
```

Defined in: core/tokens/attrs/values.ts:11

Generic attribute-value tokens. Sole declaration site — consumers import members
from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).
