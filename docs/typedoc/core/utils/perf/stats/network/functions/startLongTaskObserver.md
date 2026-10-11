[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [core/utils/perf/stats/network](../README.md) / startLongTaskObserver

```ts
function startLongTaskObserver(engine): void;
```

Defined in: core/utils/perf/stats/network.ts:100

Long-task CPU observer — measures main-thread blocking time (tasks
> 50ms). CPU% = busy_ms / window_ms * 100, clamped to [0, 99] at flush.

## Parameters

### engine

[`StatsEngine`](../../../stats-engine/classes/StatsEngine.md)

## Returns

`void`
