[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/timer](../README.md) / autoElapsed

```ts
function autoElapsed(host): number
```

Defined in: website/components/home/cardstack/timer.ts:21

Milliseconds into the current countdown — the banked elapsed from
before the last (re)start plus the in-flight span while the clock
runs. The progress writer reads it per frame; a frozen clock (paused
or off-screen held) reports the banked figure so the border light
hangs mid-fill exactly where the pause left it.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`number`

Elapsed ms in [0, AUTOPLAY_MS]; 0 when autoplay is off.
