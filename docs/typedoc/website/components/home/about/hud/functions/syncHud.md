[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/about/hud](../README.md) / syncHud

```ts
function syncHud(host): void
```

Defined in: website/components/home/about/hud.ts:88

Writes the session's current-index lines into the live HUD spans. Safe on
every render pass: re-resolves the nodes each call so a detached HUD (or
a session that predates the spans) just no-ops.

## Parameters

### host

[`AboutSection`](../../../AboutSection/classes/AboutSection.md)

The <about-section> component the session parks on.

## Returns

`void`
