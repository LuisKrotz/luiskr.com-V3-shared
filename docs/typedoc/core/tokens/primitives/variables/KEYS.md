[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/tokens/primitives](../README.md) / KEYS

```ts
const KEYS: Readonly<{
  ESCAPE: 'Escape'
  ENTER: 'Enter'
  SPACE: ' '
  ARROW_LEFT: 'ArrowLeft'
  ARROW_RIGHT: 'ArrowRight'
  ARROW_UP: 'ArrowUp'
  ARROW_DOWN: 'ArrowDown'
  SLASH: '/'
  KEY_I: 'i'
  KEY_N: 'n'
  KEY_O: 'o'
  KEY_S: 's'
}>
```

Defined in: core/tokens/primitives.ts:54

Frozen keys key map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.
