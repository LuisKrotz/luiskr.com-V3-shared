[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/mounts](../README.md) / mountGenieDemo

```ts
function mountGenieDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/mounts.ts:170

Genie lightbox warp — the REAL expanded/genie strip-warp renderer
replayed on a mini lightbox: the media box liquid-funnels into the
origin card on the close beat and restores on the open beat, over the
production GENIE_TIMING clock (p = opening ? 1−raw : raw), the
landed-frame discipline, and the veil token hiding the unwarped
content while the overlay canvas owns the paint. The 2D backend is
universal — WebGPU is never required — so the demo is a 1:1 replica
of the real lightbox transition on every surface. Frame scheduling
rides the shared framePool (scroll-settled like production); the
open/close alternation lives on the long beat.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context — stage carries the mini lightbox
(expand-modal-content + media figure) and the origin card.

## Returns

Teardown — cancels the cycle/frame loop, drops the overlay,
and restores the painted modal state.

() => `void`
