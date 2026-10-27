[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/data/ui-keys](../README.md) / NAV\_UI\_KEYS

```ts
const NAV_UI_KEYS: Readonly<{
  SELECTED_WORK: 'featured'
  PREFERENCES: 'preferences'
  LANGUAGE: 'language'
  MENU: 'menu'
  CLOSE: 'close'
  SKIP: 'skip'
  SITE_PREFERENCES: 'sitePreferences'
  EXPERIMENTS: 'experiments'
  SCROLL_UP: 'scrollUp'
}>
```

Defined in: core/tokens/data/ui-keys.ts:42

Frozen nav ui key map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.
