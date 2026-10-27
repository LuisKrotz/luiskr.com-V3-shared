[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/webgpu-widget](../README.md) / warmWidgetArtifacts

```ts
function warmWidgetArtifacts(loadModule?): void
```

Defined in: core/utils/gpu/webgpu-widget.ts:247

Fire-and-forget fetch+compile for every `eager` artifact in the
registry — currently just the skeleton, the loading placeholder
itself. Calling this at the first skeleton mount starts the
artifact fetch before `init` would, so the widget is ready the
moment its canvas needs it; failures are swallowed because mount
re-attempts and falls back anyway.

## Parameters

### loadModule?

(`url`) => `Promise`\<[`WidgetModule`](../interfaces/WidgetModule.md)\>

Injectable module loader (tests substitute a stub).

## Returns

`void`
