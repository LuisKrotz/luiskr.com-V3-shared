[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/policy](../README.md) / ladderCeiling

```ts
function ladderCeiling(rungCount, boxWidthCssPx): number
```

Defined in: core/utils/media/policy.ts:98

Highest ladder index the climb may reach. Rung order is fixed
(q50 → q75 → original → uncompressed), so the ceiling counts DOWN
from the top:
low budget → first rung only (q50-grade upgrade past LQIP)
medium budget → skip the top rung (uncompressed is the MB tier)
small box (≤768px) → skip two rungs — a ≤768 CSS-px box at 3× DPR
still resolves under a full-resolution q75, so original and
uncompressed are guaranteed waste
The terms stack: a small box on a 3g link lands on q50-grade quality.

## Parameters

### rungCount

`number`

Total rungs in the ladder (manifest-proven).

### boxWidthCssPx

`number`

Rendered width of the media box in CSS px; ≤0
means "unknown" and applies no box term.

## Returns

`number`

Inclusive maximum rung index the climb may publish.
