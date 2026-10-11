[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/attrs/microdata](../README.md) / MICRODATA\_ATTRS

```ts
const MICRODATA_ATTRS: Readonly<{
  ITEMSCOPE: "itemscope";
  ITEMTYPE: "itemtype";
  ITEMPROP: "itemprop";
}>;
```

Defined in: core/tokens/attrs/microdata.ts:19

Frozen microdata attribute-name map — sole declaration site for these
tokens; consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.
