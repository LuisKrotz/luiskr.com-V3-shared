[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/data/notify](../README.md) / NOTIFY\_TYPES

```ts
const NOTIFY_TYPES: Readonly<{
  ERROR: "error";
  INFO: "info";
  SUCCESS: "success";
}>;
```

Defined in: core/tokens/data/notify.ts:16

Toast severity tokens. ERROR intentionally aliases `WINDOW_EVENTS.ERROR`
so the 'error' literal stays single-declared — the toast modifier and the
window event name share one token source (zero-hardcoding).
