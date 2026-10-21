[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/types](../README.md) / BurnParticle

Defined in: website/components/home/mosaic/burn/types.ts:139

One combustion particle — an ember (bright, rises) or fleck (dark, curls).

## Properties

### x

```ts
x: number
```

Defined in: website/components/home/mosaic/burn/types.ts:140

---

### y

```ts
y: number
```

Defined in: website/components/home/mosaic/burn/types.ts:141

---

### vx

```ts
vx: number
```

Defined in: website/components/home/mosaic/burn/types.ts:142

---

### vy

```ts
vy: number
```

Defined in: website/components/home/mosaic/burn/types.ts:143

---

### life

```ts
life: number
```

Defined in: website/components/home/mosaic/burn/types.ts:144

---

### maxLife

```ts
maxLife: number
```

Defined in: website/components/home/mosaic/burn/types.ts:145

---

### size

```ts
size: number
```

Defined in: website/components/home/mosaic/burn/types.ts:146

---

### kind

```ts
kind: number
```

Defined in: website/components/home/mosaic/burn/types.ts:148

0 = ember, 1 = char fleck.

---

### rot

```ts
rot: number
```

Defined in: website/components/home/mosaic/burn/types.ts:150

Rotation for flecks (radians) + tumble speed.

---

### spin

```ts
spin: number
```

Defined in: website/components/home/mosaic/burn/types.ts:151

---

### phase

```ts
phase: number
```

Defined in: website/components/home/mosaic/burn/types.ts:153

Per-particle noise phase — keeps flicker/wobble desynced.

---

### L?

```ts
optional L?: LetterBurn;
```

Defined in: website/components/home/mosaic/burn/types.ts:158

Rebuild deposits only — the letter whose front this particle rains
onto. Undefined for burn particles, which simply rise and die.
