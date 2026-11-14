[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/print/warm-bridge](../README.md) / bindPrintWarm

```ts
function bindPrintWarm(root): void
```

Defined in: core/utils/print/warm-bridge.ts:44

Registers a component shadow root for print-source warming. Called from
the Component constructor: the capture listener attaches immediately
so no post-registration load escapes, and the root joins the pre-install
queue only while the lazy print hook is still absent.

## Parameters

### root

`ShadowRoot` \| `null`

Component shadow root to wire.

## Returns

`void`
