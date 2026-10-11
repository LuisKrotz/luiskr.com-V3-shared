[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/coverage-nav](../README.md) / attachCoverageNav

```ts
function attachCoverageNav(box): (() => void) | null;
```

Defined in: experiments/docs/coverage-nav.ts:182

Wires the istanbul report contract when `box` holds a coverage report.

## Parameters

### box

`HTMLElement`

The `.docs-content` element whose innerHTML was just painted.

## Returns

(() => `void`) \| `null`

Disposer removing all listeners, or null when the payload
         contains no istanbul surface (no summary table and no
         uncovered-block markers to navigate).
