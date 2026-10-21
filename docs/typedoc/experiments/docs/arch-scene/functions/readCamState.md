[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / readCamState

```ts
function readCamState(): SceneCamState | null
```

Defined in: experiments/docs/arch-scene.ts:216

Reads the session-persisted camera pose — null when storage is
unavailable (tests, privacy mode) or the payload is malformed.

## Returns

[`SceneCamState`](../interfaces/SceneCamState.md) \| `null`
