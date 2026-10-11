[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/awards-carousel/render](../README.md) / renderAwardsCarousel

```ts
function renderAwardsCarousel(host): Element;
```

Defined in: website/components/carousel/awards-carousel/render.tsx:120

JSX template for the component's shadow DOM — the track is
`[clone(last)] …real slides… [clone(first)]`; the clone ends are what
make the infinite wrap seamless (see nav.ts). An empty item list still
emits the root wrapper so the element keeps its box for layout.

## Parameters

### host

[`AwardsCarousel`](../../../AwardsCarousel/classes/AwardsCarousel.md)

The AwardsCarousel element.

## Returns

[`Element`](../../../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)
