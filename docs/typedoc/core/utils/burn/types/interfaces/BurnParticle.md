[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/types](../README.md) / BurnParticle

Defined in: core/utils/burn/types.ts:209

One combustion particle — an ember (bright, rises) or fleck (dark, curls).

## Properties

### x

```ts
x: number
```

Defined in: core/utils/burn/types.ts:210

---

### y

```ts
y: number
```

Defined in: core/utils/burn/types.ts:211

---

### vx

```ts
vx: number
```

Defined in: core/utils/burn/types.ts:212

---

### vy

```ts
vy: number
```

Defined in: core/utils/burn/types.ts:213

---

### life

```ts
life: number
```

Defined in: core/utils/burn/types.ts:214

---

### maxLife

```ts
maxLife: number
```

Defined in: core/utils/burn/types.ts:215

---

### size

```ts
size: number
```

Defined in: core/utils/burn/types.ts:216

---

### kind

```ts
kind: number
```

Defined in: core/utils/burn/types.ts:218

0 = ember, 1 = char fleck.

---

### rot

```ts
rot: number
```

Defined in: core/utils/burn/types.ts:220

Rotation for flecks (radians) + tumble speed.

---

### spin

```ts
spin: number
```

Defined in: core/utils/burn/types.ts:221

---

### phase

```ts
phase: number
```

Defined in: core/utils/burn/types.ts:223

Per-particle noise phase — keeps flicker/wobble desynced.

---

### L?

```ts
optional L?: LetterBurn;
```

Defined in: core/utils/burn/types.ts:228

Rebuild deposits only — the letter whose front this particle rains
onto. Undefined for burn particles, which simply rise and die.
