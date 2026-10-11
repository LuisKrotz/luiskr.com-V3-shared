[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/strings/chars](../README.md) / CHAR\_STRINGS

```ts
const CHAR_STRINGS: Readonly<{
  EMPTY: "";
  SLASH: "/";
  DOUBLE_SLASH: "//";
  COLON: ":";
  SEMICOLON: ";";
  COMMA: ",";
  DOT: ".";
  DASH: "-";
  EM_DASH: "—";
  UNDERSCORE: "_";
  EQUALS: "=";
  QUESTION: "?";
  AMPERSAND: "&";
  HASH: "#";
  PERCENT: "%";
  PIPE_SEP: "|";
  DOT_SEP: "•";
  SPACE_CHAR: " ";
  NBSP: " ";
  ZERO: "0";
  ONE: "1";
  MINUS_ONE: "-1";
  DELAY_8: "8";
  DELAY_30: "30";
  PERCENT_100: "100%";
  ONE_EM: "1em";
  PX: "px";
  REM: "rem";
  VW_100: "100vw";
  VH_100: "100vh";
  DVH_100: "100dvh";
  JSON_EXT: ".json";
}>;
```

Defined in: core/tokens/strings/chars.ts:12

Punctuation, unit and single-character string tokens. Sole declaration site — consumers import members
from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).
