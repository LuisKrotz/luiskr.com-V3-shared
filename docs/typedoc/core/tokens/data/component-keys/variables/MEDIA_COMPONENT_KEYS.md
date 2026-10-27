[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/data/component-keys](../README.md) / MEDIA\_COMPONENT\_KEYS

```ts
const MEDIA_COMPONENT_KEYS: Readonly<{
  MEDIA_CLOSE: 'media.close'
  MEDIA_TO_OPEN: 'media.toOpen'
  MEDIA_AUDIO_NOTE: 'media.audioNote'
  MEDIA_TOGGLE: 'media.toggle'
}>
```

Defined in: core/tokens/data/component-keys.ts:34

Frozen media component key map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
