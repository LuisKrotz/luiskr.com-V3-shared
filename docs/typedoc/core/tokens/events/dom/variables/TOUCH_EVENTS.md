[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/events/dom](../README.md) / TOUCH\_EVENTS

```ts
const TOUCH_EVENTS: Readonly<{
  TOUCHSTART: "touchstart";
  TOUCHEND: "touchend";
  TOUCHMOVE: "touchmove";
}>;
```

Defined in: core/tokens/events/dom.ts:31

Frozen touch event-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
