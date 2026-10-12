[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/session](../README.md) / healSession

```ts
function healSession(host, s): boolean
```

Defined in: website/components/home/about/glitch/session.ts:167

Re-homes the session after a shadow re-render: the old wrapper/img were
discarded, so the canvas is re-appended to the fresh wrapper and the
geometry + channel ghosts are rebuilt against the new image node.

## Parameters

### host

[`AboutSection`](../../../../AboutSection/classes/AboutSection.md)

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

## Returns

`boolean`
