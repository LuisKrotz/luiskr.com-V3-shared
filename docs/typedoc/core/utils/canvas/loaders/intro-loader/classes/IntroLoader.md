[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/loaders/intro-loader](../README.md) / IntroLoader

Defined in: core/utils/canvas/loaders/intro-loader.ts:45

Experiments-style intro loader — spinner ring + percent + stage readout
+ progress bar over a glow veil. The stage text steps through the
locale's `loader.stages` (site assets/pages copy) as progress climbs.

## Constructors

### Constructor

```ts
new IntroLoader(rootContainer?, onComplete?): IntroLoader;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:57

#### Parameters

##### rootContainer?

`HTMLElement` = `document.body`

##### onComplete?

(() => `void`) \| `null`

#### Returns

`IntroLoader`

## Properties

### rootContainer

```ts
rootContainer: HTMLElement;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:46

***

### onComplete

```ts
onComplete: (() => void) | null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:47

***

### container

```ts
container: HTMLElement | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:48

***

### percentEl

```ts
percentEl: HTMLElement | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:49

***

### msgEl

```ts
msgEl: HTMLElement | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:50

***

### barEl

```ts
barEl: HTMLElement | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:51

***

### progress

```ts
progress: number = 0;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:52

***

### animId

```ts
animId: number | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:53

***

### startTime

```ts
startTime: number;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:54

***

### copy

```ts
copy: LoaderCopy;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:55

## Methods

### init()

```ts
init(): void;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:69

Builds the overlay DOM + starts the progress sequence.

#### Returns

`void`

***

### runAnimation()

```ts
runAnimation(): void;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:142

Steps percent + the localized stage line across the boot budget.

#### Returns

`void`

***

### finish()

```ts
finish(): void;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:181

Completes the loader: fades the overlay and calls onComplete.

#### Returns

`void`

***

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:198

Releases the rAF handle and removes the overlay so it can be GC'd.

#### Returns

`void`
