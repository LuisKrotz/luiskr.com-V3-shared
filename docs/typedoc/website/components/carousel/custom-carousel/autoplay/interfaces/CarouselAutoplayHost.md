[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/autoplay](../README.md) / CarouselAutoplayHost

Defined in: website/components/carousel/custom-carousel/autoplay.ts:24

Host surface the autoplay engine needs (satisfied by CustomCarousel).

## Properties

### autoplayRunning

```ts
autoplayRunning: boolean
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:26

RAF cycle active flag.

---

### autoplayStart

```ts
autoplayStart: number
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:28

performance.now() the current dwell cycle started at.

---

### autoplayElapsed

```ts
autoplayElapsed: number
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:30

Accumulated ms into the cycle — survives pause→resume.

---

### ringProgress

```ts
ringProgress: number
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:32

0–1 fraction of the autoplay cycle — drives ring + arrow arc.

---

### rafId

```ts
rafId: number | null
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:34

RAF handle for cancellation.

---

### currentIndex

```ts
currentIndex: number
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:36

Logical slide index for goTo(+1) on cycle end.

---

### circumference

```ts
circumference: number
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:38

2πr of the SVG ring — dasharray/dashoffset base.

---

### \_autoplayPermanentlyStopped

```ts
_autoplayPermanentlyStopped: boolean
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:40

Latched by user interaction — blocks all autoplay resumes.

---

### \_isRegressing

```ts
_isRegressing: boolean
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:42

Ring regress animation in flight.

---

### \_prevArrow

```ts
_prevArrow: CarouselArrowLike | null
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:44

Prev/next arrow widgets (null until viewport entry mounts them).

---

### \_nextArrow

```ts
_nextArrow: CarouselArrowLike | null
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:45

---

### \_ringFills

```ts
_ringFills: Element[] | null;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:52

Cached ring-fill elements — `updateCarouselRingDom` queries the
shadow DOM every frame otherwise; the array is refreshed lazily
whenever the first cached node reports detached (shadow re-render
discards the old fills).

## Methods

### goTo()

```ts
goTo(idx): void;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:54

Navigate to slide idx (clone-wrap aware).

#### Parameters

##### idx

`number`

#### Returns

`void`

---

### $$()

```ts
$$(selector): Element[];
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:56

Shadow-scoped querySelectorAll.

#### Parameters

##### selector

`string`

#### Returns

`Element`[]
