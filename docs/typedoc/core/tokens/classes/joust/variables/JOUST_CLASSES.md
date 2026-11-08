[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/classes/joust](../README.md) / JOUST\_CLASSES

```ts
const JOUST_CLASSES: Readonly<{
  JOUST: 'joust'
  JOUST_OPEN: 'joust--open'
  JOUST_LABEL: 'joust-label'
}>
```

Defined in: core/tokens/classes/joust.ts:17

Frozen joust class-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
