[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/events/dom](../README.md) / KEYBOARD\_EVENTS

```ts
const KEYBOARD_EVENTS: Readonly<{
  KEYDOWN: "keydown";
  KEYUP: "keyup";
}>;
```

Defined in: core/tokens/events/dom.ts:56

Frozen keyboard event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
