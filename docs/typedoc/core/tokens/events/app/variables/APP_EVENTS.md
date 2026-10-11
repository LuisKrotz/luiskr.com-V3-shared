[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/events/app](../README.md) / APP\_EVENTS

```ts
const APP_EVENTS: Readonly<{
  COOKIE_ACTION: "cookieAction";
  SLIDE_CHANGE: "slidechange";
  AUTOPLAY_STOP: "autoplaystop";
  AUTOPLAY_START: "autoplaystart";
  CANCEL: "cancel";
  CLOSE: "close";
  OPEN_LANG_DIALOG: "open-lang-dialog";
  OPEN_PREFERENCES_MODAL: "open-preferences-modal";
  NOTIFY: "notify";
}>;
```

Defined in: core/tokens/events/app.ts:14

Frozen app event-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
