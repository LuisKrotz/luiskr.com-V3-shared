[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/classes/router](../README.md) / ROUTER\_CLASSES

```ts
const ROUTER_CLASSES: Readonly<{
  ROUTER_LINK_ACTIVE: "router-link-active";
  ROUTER_LINK_EXACT_ACTIVE: "router-link-exact-active";
}>;
```

Defined in: core/tokens/classes/router.ts:13

Frozen router class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
