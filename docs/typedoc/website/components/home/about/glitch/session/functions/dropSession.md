[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/session](../README.md) / dropSession

```ts
function dropSession(host, s): void
```

Defined in: website/components/home/about/glitch/session.ts:216

Tears a session down in place — stops the loop, destroys the wasm
widget, disconnects the observer, removes the overlay and un-parks it
from the host. Used by the wasm arm when every backend failed and by
disarmGlitch for normal teardown.

## Parameters

### host

[`AboutSection`](../../../../AboutSection/classes/AboutSection.md)

The component the session was parked on.

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

The session to kill.

## Returns

`void`
