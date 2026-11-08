[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/genie](../README.md) / GenieClasses

Defined in: core/utils/motion/genie.ts:28

Class contract a genie host must satisfy: the element the enter/leave
modifier lands on (the backdrop), the two modifiers themselves, and the
dialog panel that scales from the recorded origin.

## Properties

### backdrop

```ts
backdrop: string
```

Defined in: core/utils/motion/genie.ts:30

Selector for the element that carries the enter/leave modifier.

---

### backdropEnter

```ts
backdropEnter: string
```

Defined in: core/utils/motion/genie.ts:32

Modifier applied while the dialog flies in (collapsed start state).

---

### backdropLeave

```ts
backdropLeave: string
```

Defined in: core/utils/motion/genie.ts:34

Modifier applied while the dialog collapses back to the origin.

---

### dialog

```ts
dialog: string
```

Defined in: core/utils/motion/genie.ts:36

Selector for the dialog panel the genie transforms.
