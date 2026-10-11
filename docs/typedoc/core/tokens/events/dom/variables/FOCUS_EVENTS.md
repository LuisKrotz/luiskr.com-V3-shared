[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/events/dom](../README.md) / FOCUS\_EVENTS

```ts
const FOCUS_EVENTS: Readonly<{
  FOCUS: "focus";
  BLUR: "blur";
  FOCUSIN: "focusin";
  FOCUSOUT: "focusout";
}>;
```

Defined in: core/tokens/events/dom.ts:66

Frozen focus event-name map — `focusin`/`focusout` bubble (needed for
delegation on shadow hosts) while `focus`/`blur` do not; both pairs are
kept so listeners pick the right variant for the propagation model.
