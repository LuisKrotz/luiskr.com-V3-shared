[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/corner-brackets](../README.md) / CornerBracketSpec

Defined in: core/utils/gpu/corner-brackets.ts:46

Per-surface parameters for `mountCornerBrackets` — the pieces the
button styles differ in.

## Properties

### canvasClass

```ts
canvasClass: string
```

Defined in: core/utils/gpu/corner-brackets.ts:48

Overlay canvas class (the `:has()` gate keys on it).

---

### insetVar

```ts
insetVar: string
```

Defined in: core/utils/gpu/corner-brackets.ts:50

CSS var the hover inset resolves from — `calc(100% − var)`.

---

### ease

```ts
ease: readonly[(number, number, number, number)]
```

Defined in: core/utils/gpu/corner-brackets.ts:52

Cubic-bezier control points of the surface's CSS transition.

---

### ms

```ts
ms: number
```

Defined in: core/utils/gpu/corner-brackets.ts:54

Expansion ramp duration (ms) — ANIMATION_DURATIONS.BRACKET* tokens.

---

### hoverOn?

```ts
optional hoverOn?: HTMLElement;
```

Defined in: core/utils/gpu/corner-brackets.ts:60

Element whose hover/focus drives the ramp — defaults to `button`.
`.expand-modal-open-1` animates on `.internal-expand:hover &`
(the parent), so callers pass that ancestor here.

---

### hoverParentSelector?

```ts
optional hoverParentSelector?: string;
```

Defined in: core/utils/gpu/corner-brackets.ts:65

Ancestor selector alternative to `hoverOn` — resolved per button
(`button.closest(...)`) so batch mounts each watch their own parent.
