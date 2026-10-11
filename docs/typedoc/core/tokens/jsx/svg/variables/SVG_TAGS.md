[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/jsx/svg](../README.md) / SVG\_TAGS

```ts
const SVG_TAGS: Readonly<Set<string>>;
```

Defined in: core/tokens/jsx/svg.ts:18

Tag names that require `createElementNS(SVG_NS, tag)` — the `h()` JSX
factory consults this set; any tag not listed goes through the HTML
path. Covers the full SVG2 tag vocabulary so consumers never maintain
their own lists.
