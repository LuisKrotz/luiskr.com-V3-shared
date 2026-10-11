[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/strings/input](../README.md) / INPUT\_STRINGS

```ts
const INPUT_STRINGS: Readonly<{
  MOUSE: "mouse";
  PEN: "pen";
  TOUCH: "touch";
  POINTER: "pointer";
  POINTERENTER: "pointerenter";
  TOUCHSTART: "touchstart";
  ONTOUCHSTART: "ontouchstart";
  FOCUS: "focus";
}>;
```

Defined in: core/tokens/strings/input.ts:14

Frozen input string map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
