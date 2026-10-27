[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/manifest](../README.md) / onMediaManifest

```ts
function onMediaManifest(cb): () => void
```

Defined in: core/utils/media/manifest.ts:106

Fires `cb` when the manifest lands — components that rendered
originals-only pictures subscribe here and re-render so proven
thumb/webp siblings replace the heavy fallbacks. When the manifest is
already loaded `cb` runs synchronously (subscribe-then-render callers
emit the upgraded markup on their first pass). The returned disposer
detaches the listener — call it in disconnectedCallback/onDestroy so
nothing re-renders a torn-down element.

## Parameters

### cb

() => `void`

Re-render callback, one-shot.

## Returns

Unsubscribe disposer.

() => `void`
