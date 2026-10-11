[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/perf/stats-engine](../README.md) / statsEngine

```ts
const statsEngine: StatsEngine;
```

Defined in: core/utils/perf/stats-engine.ts:201

Shared stats singleton — one engine serves every consumer so observers
(rAF loop, PerformanceObservers, fetch patch) exist at most once.
