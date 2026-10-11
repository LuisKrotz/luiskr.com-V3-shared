[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/telemetry](../README.md) / trackCopyAttempt

```ts
function trackCopyAttempt(kind, path): void;
```

Defined in: experiments/docs/telemetry.ts:49

Posts one copy-attempt record. Fire-and-forget: the guard never blocks
the UI on the POST (beacon for unload safety, fetch keepalive fallback).

## Parameters

### kind

[`CopyAttemptKind`](../type-aliases/CopyAttemptKind.md)

Which guard surface fired.

### path

`string`

The docs path being viewed (manifest-relative).

## Returns

`void`
