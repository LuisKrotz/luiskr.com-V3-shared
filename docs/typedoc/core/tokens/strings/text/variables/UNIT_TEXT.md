[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/strings/text](../README.md) / UNIT\_TEXT

```ts
const UNIT_TEXT: Readonly<{
  DOT_SEP: "•";
  KB_S: "KB/s";
  MS: "ms";
  MB: "MB";
  DASH: "—";
}>;
```

Defined in: core/tokens/strings/text.ts:35

Frozen unit UI text map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
