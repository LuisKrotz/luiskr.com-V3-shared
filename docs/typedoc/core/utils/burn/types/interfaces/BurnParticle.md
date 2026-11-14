[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/types](../README.md) / BurnParticle

Defined in: core/utils/burn/types.ts:219

One combustion particle — an ember (bright, rises) or fleck (dark, curls).

## Properties

### x

```ts
x: number
```

Defined in: core/utils/burn/types.ts:220

---

### y

```ts
y: number
```

Defined in: core/utils/burn/types.ts:221

---

### vx

```ts
vx: number
```

Defined in: core/utils/burn/types.ts:222

---

### vy

```ts
vy: number
```

Defined in: core/utils/burn/types.ts:223

---

### life

```ts
life: number
```

Defined in: core/utils/burn/types.ts:224

---

### maxLife

```ts
maxLife: number
```

Defined in: core/utils/burn/types.ts:225

---

### size

```ts
size: number
```

Defined in: core/utils/burn/types.ts:226

---

### kind

```ts
kind: number
```

Defined in: core/utils/burn/types.ts:228

0 = ember, 1 = char fleck.

---

### rot

```ts
rot: number
```

Defined in: core/utils/burn/types.ts:230

Rotation for flecks (radians) + tumble speed.

---

### spin

```ts
spin: number
```

Defined in: core/utils/burn/types.ts:231

---

### phase

```ts
phase: number
```

Defined in: core/utils/burn/types.ts:233

Per-particle noise phase — keeps flicker/wobble desynced.

---

### L?

```ts
optional L?: LetterBurn;
```

Defined in: core/utils/burn/types.ts:238

Rebuild deposits only — the letter whose front this particle rains
onto. Undefined for burn particles, which simply rise and die.
