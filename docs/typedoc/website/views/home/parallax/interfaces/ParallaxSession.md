[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/home/parallax](../README.md) / ParallaxSession

Defined in: website/views/home/parallax.ts:89

Live parallax session parked on the view (`view._parallax`). Created
by attachParallax, dropped by detachParallax; syncParallax re-resolves
the layer nodes and re-evaluates the gates on every render pass and
store push.

## Properties

### hero

```ts
hero: ParallaxLayer | null
```

Defined in: website/views/home/parallax.ts:91

<card-stack> inside the #home anchor — deck var + foot var.

---

### about

```ts
about: ParallaxLayer | null
```

Defined in: website/views/home/parallax.ts:94

<about-section> inside the #about anchor — the two column vars
consumed inside the component's own shadow sheet.

---

### contact

```ts
contact: ParallaxLayer | null
```

Defined in: website/views/home/parallax.ts:96

<contact-section> inside the #contact anchor — copy-block var.

---

### awards

```ts
awards: ParallaxLayer | null
```

Defined in: website/views/home/parallax.ts:98

<awards-mentions> band — self-measuring (no wrapper anchor).

---

### ro

```ts
ro: ResizeObserver | null
```

Defined in: website/views/home/parallax.ts:100

Geometry watcher — content landing/reflowing shifts layer tops.

---

### mql

```ts
mql: MediaQueryList | null
```

Defined in: website/views/home/parallax.ts:102

≥1280 gate (the `desktop` width class) — its change re-evaluates.

---

### motionMql

```ts
motionMql: MediaQueryList | null
```

Defined in: website/views/home/parallax.ts:105

Live OS reduced-motion flag — consulted only when the user holds
no explicit pref (the site contract: localStorage wins).

---

### raf

```ts
raf: number
```

Defined in: website/views/home/parallax.ts:107

Armed rAF coalescing scroll bursts into one paint per frame.

---

### vh

```ts
vh: number
```

Defined in: website/views/home/parallax.ts:109

Viewport height cached on each measure pass (px).

---

### armed

```ts
armed: boolean
```

Defined in: website/views/home/parallax.ts:111

Whether the scroll loop currently paints (gates open).
