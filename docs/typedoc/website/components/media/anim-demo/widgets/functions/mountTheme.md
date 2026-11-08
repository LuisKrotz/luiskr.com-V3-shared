[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/widgets](../README.md) / mountTheme

```ts
function mountTheme(ctx): () => void
```

Defined in: website/components/media/anim-demo/widgets.ts:144

Theme slider — the real ThemeSliderWebGL walking the dark → system →
light stops via its own setTheme() spring. The onThemeChange callback
stays null: the demo animates the track without touching the site's
real theme preference.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the theme canvas).

## Returns

Teardown — stops the cycle and destroys the widget.

() => `void`
