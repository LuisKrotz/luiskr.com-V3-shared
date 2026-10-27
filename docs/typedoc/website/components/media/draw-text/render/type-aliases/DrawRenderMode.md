[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/render](../README.md) / DrawRenderMode

```ts
type DrawRenderMode = 'plain' | 'words' | 'chars'
```

Defined in: website/components/media/draw-text/render.ts:37

Render modes for the shadow content:
'plain' — pending/done states: contiguous word/space/br runs collapse
into ONE aria-hidden span (O(paragraphs) nodes instead of O(words);
a 500-word legal paragraph would otherwise mount ~1000 permanent
spans for text that may never animate). Tags keep real markup —
an anchor's plain inner text is its accessible name.
'words' — the fit fallback: `fitText` measures `.draw-text__word`
inline-blocks, so `fit` elements keep word spans pre/post animation.
'chars' — the animating state: per-char spans inside word spans.
All modes share one geometry: spaces are literal/natural-width text
everywhere (nbsp inside tags, matching the char-mode link rule), and
word spans are nowrap inline-blocks — so pending → animating → done
swaps never reflow the line.
