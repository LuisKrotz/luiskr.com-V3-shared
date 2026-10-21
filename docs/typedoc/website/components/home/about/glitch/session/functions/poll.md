[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/session](../README.md) / poll

```ts
function poll(host): void
```

Defined in: website/components/home/about/glitch/session.ts:301

The un-armed half of the loop: polls at ~4 Hz until the portrait has
decoded enough to arm, then hands off to the session's own raf chain.

## Parameters

### host

[`AboutSection`](../../../../AboutSection/classes/AboutSection.md)

## Returns

`void`
