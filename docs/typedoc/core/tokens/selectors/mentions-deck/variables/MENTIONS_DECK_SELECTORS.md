[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/selectors/mentions-deck](../README.md) / MENTIONS\_DECK\_SELECTORS

```ts
const MENTIONS_DECK_SELECTORS: Readonly<{
  MENTIONS_DECK: '.mentions-deck'
  MENTIONS_DECK_DECK: '.mentions-deck-deck'
  MENTIONS_DECK_CARD: '.mentions-deck-card'
  MENTIONS_DECK_DOT: '.mentions-deck-dot'
}>
```

Defined in: core/tokens/selectors/mentions-deck.ts:13

Frozen mentions-deck selector map — sole declaration site for these tokens;
consumers read members and never re-declare the strings (zero-hardcoding
rules 4–5). Object.freeze makes the token contract immutable at runtime.
