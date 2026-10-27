[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/utils/canvas/loaders/intro-loader](../README.md) / IntroLoader

Defined in: core/utils/canvas/loaders/intro-loader.ts:72

Experiments-style intro loader — spinner ring + percent + stage readout

- progress bar over a glow veil. The stage text steps through the
  locale's `loader.stages` (site assets/pages copy) as progress climbs.

## Constructors

### Constructor

```ts
new IntroLoader(rootContainer?, onComplete?): IntroLoader;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:84

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
rootContainer: HTMLElement
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:73

---

### onComplete

```ts
onComplete: (() => void) | null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:74

---

### container

```ts
container: HTMLElement | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:75

---

### percentEl

```ts
percentEl: HTMLElement | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:76

---

### msgEl

```ts
msgEl: HTMLElement | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:77

---

### barEl

```ts
barEl: HTMLElement | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:78

---

### progress

```ts
progress: number = 0
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:79

---

### animId

```ts
animId: number | null = null;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:80

---

### startTime

```ts
startTime: number
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:81

---

### copy

```ts
copy: LoaderCopy
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:82

## Methods

### init()

```ts
init(): void;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:104

Builds or adopts the overlay DOM + starts the progress sequence.

#### Returns

`void`

---

### buildOverlay()

```ts
buildOverlay(): void;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:150

Builds the overlay DOM from scratch — used when the document did not
ship the static loader markup (dev server, non-prerendered shells).

#### Returns

`void`

---

### runAnimation()

```ts
runAnimation(): void;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:228

Steps percent + the localized stage line across the boot budget.

#### Returns

`void`

---

### finish()

```ts
finish(): void;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:267

Completes the loader: fades the overlay, retires it, calls onComplete.

#### Returns

`void`

---

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/canvas/loaders/intro-loader.ts:283

Releases the rAF handle and retires the overlay (kept connected so a
painted LQIP's LCP candidacy survives teardown — see retireVeil).

#### Returns

`void`
