[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/events/dom](../README.md) / SW\_EVENTS

```ts
const SW_EVENTS: Readonly<{
  UPDATE_FOUND: 'updatefound'
  STATE_CHANGE: 'statechange'
  ONLINE: 'online'
  OFFLINE: 'offline'
}>
```

Defined in: core/tokens/events/dom.ts:194

Frozen service-worker event/state map — registration lifecycle
(`updatefound` on the registration, `statechange`/`installed` on the
installing worker) plus window online/offline. Local replacement for
the retired `register-service-worker` dependency.
