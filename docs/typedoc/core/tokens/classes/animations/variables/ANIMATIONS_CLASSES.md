[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/classes/animations](../README.md) / ANIMATIONS\_CLASSES

```ts
const ANIMATIONS_CLASSES: Readonly<{
  ANIMATIONS: 'animations'
  ANIMATIONS_LIST: 'animations-list'
  ANIMATIONS_RECORD: 'animations-record'
  ANIMATIONS_TERM: 'animations-term'
  ANIMATIONS_DESC: 'animations-desc'
}>
```

Defined in: core/tokens/classes/animations.ts:16

Frozen animations-reference class-name map — sole declaration site for
these tokens; consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.
