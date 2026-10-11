[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/autoplay](../README.md) / CarouselAutoplayHost

Defined in: website/components/carousel/custom-carousel/autoplay.ts:23

Host surface the autoplay engine needs (satisfied by CustomCarousel).

## Properties

### autoplayRunning

```ts
autoplayRunning: boolean;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:25

RAF cycle active flag.

***

### autoplayStart

```ts
autoplayStart: number;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:27

performance.now() the current dwell cycle started at.

***

### autoplayElapsed

```ts
autoplayElapsed: number;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:29

Accumulated ms into the cycle — survives pause→resume.

***

### ringProgress

```ts
ringProgress: number;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:31

0–1 fraction of the autoplay cycle — drives ring + arrow arc.

***

### rafId

```ts
rafId: number | null;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:33

RAF handle for cancellation.

***

### currentIndex

```ts
currentIndex: number;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:35

Logical slide index for goTo(+1) on cycle end.

***

### circumference

```ts
circumference: number;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:37

2πr of the SVG ring — dasharray/dashoffset base.

***

### \_autoplayPermanentlyStopped

```ts
_autoplayPermanentlyStopped: boolean;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:39

Latched by user interaction — blocks all autoplay resumes.

***

### \_isRegressing

```ts
_isRegressing: boolean;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:41

Ring regress animation in flight.

***

### \_prevArrow

```ts
_prevArrow: CarouselArrowLike | null;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:43

Prev/next arrow widgets (null until viewport entry mounts them).

***

### \_nextArrow

```ts
_nextArrow: CarouselArrowLike | null;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:44

## Methods

### goTo()

```ts
goTo(idx): void;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:46

Navigate to slide idx (clone-wrap aware).

#### Parameters

##### idx

`number`

#### Returns

`void`

***

### $$()

```ts
$$(selector): Element[];
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:48

Shadow-scoped querySelectorAll.

#### Parameters

##### selector

`string`

#### Returns

`Element`[]
