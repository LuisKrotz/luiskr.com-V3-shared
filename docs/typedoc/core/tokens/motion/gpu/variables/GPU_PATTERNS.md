[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/motion/gpu](../README.md) / GPU\_PATTERNS

```ts
const GPU_PATTERNS: Readonly<{
  DEDICATED: RegExp;
  APPLE: RegExp;
  INTEGRATED: RegExp;
  SOFTWARE: RegExp;
}>;
```

Defined in: core/tokens/motion/gpu.ts:14

GPU detection & power-hint tokens. Sole declaration site — consumers import members
from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).
