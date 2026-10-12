[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/fx](../README.md) / buildChannel

```ts
function buildChannel(s, mask): HTMLCanvasElement
```

Defined in: website/components/home/about/glitch/fx.ts:104

Renders a channel-isolated copy of the portrait: the image is drawn
cover-fit, then a pure-channel ink is multiplied over it so only that
RGB channel survives. Two offsets of these under 'lighter' produce a
true chromatic split.

## Parameters

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

The session the channel copy is sized/drawn from.

### mask

`string`

The pure-channel ink (CANVAS_STRINGS.CHANNEL_*).

## Returns

`HTMLCanvasElement`
