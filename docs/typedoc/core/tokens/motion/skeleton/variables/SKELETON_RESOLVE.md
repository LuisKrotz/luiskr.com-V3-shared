[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/motion/skeleton](../README.md) / SKELETON\_RESOLVE

```ts
const SKELETON_RESOLVE: Readonly<{
  RESOLVE_DURATION: 480;
}>;
```

Defined in: core/tokens/motion/skeleton.ts:56

Frozen skeleton map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.
