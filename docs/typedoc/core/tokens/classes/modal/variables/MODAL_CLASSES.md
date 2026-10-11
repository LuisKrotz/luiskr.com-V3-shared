[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/modal](../README.md) / MODAL\_CLASSES

```ts
const MODAL_CLASSES: Readonly<{
  MODAL: "modal";
  MODAL_OPEN: "modal-open";
  MODAL_ABOVE: "modal-above";
  MODAL_BELOW: "modal-below";
  MODAL_CLOSE_BAR: "modal-close-bar";
  MODAL_BTN: "modal-btn";
}>;
```

Defined in: core/tokens/classes/modal.ts:23

Frozen modal class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
