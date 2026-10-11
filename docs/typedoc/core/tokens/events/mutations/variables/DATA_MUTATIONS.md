[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/events/mutations](../README.md) / DATA\_MUTATIONS

```ts
const DATA_MUTATIONS: Readonly<{
  SET_STORAGE: "setStorage";
  SET_PORTFOLIO_LIST: "setPortfolioList";
  SET_MENTIONS: "setMentions";
  SET_MENTIONS_ITEMS: "setMentionsItems";
}>;
```

Defined in: core/tokens/events/mutations.ts:56

Frozen data store-mutation name map — sole declaration site for these tokens; consumers
read members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze
makes the token contract immutable at runtime.
