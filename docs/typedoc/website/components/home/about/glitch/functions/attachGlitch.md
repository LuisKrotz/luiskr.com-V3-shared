[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/home/about/glitch](../README.md) / attachGlitch

```ts
function attachGlitch(host): void;
```

Defined in: website/components/home/about/glitch.ts:716

Binds the always-on glitch: starts the arm poll immediately (the effect
runs ambient interference as soon as the portrait decodes — no hover
needed) and the delegated hover handlers that only flip the intensity
flag. Listeners live on the shadow root, so they survive _updateDom
re-renders.

## Parameters

### host

[`AboutSection`](../../../AboutSection/classes/AboutSection.md)

## Returns

`void`
