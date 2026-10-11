[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/consts](../README.md) / PHASE

```ts
const PHASE: Readonly<{
  IDLE: "idle";
  UPLOADING: "uploading";
  CONVERTING: "converting";
  DONE: "done";
  ERROR: "error";
}>;
```

Defined in: cms/media-convert/consts.ts:17

Job state machine: idle → uploading (per-file PUTs) → converting
(server pipeline) → done | error. The component render switches on this.
