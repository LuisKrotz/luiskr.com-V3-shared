[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/types](../README.md) / BurnParticle

Defined in: website/components/home/mosaic/burn/types.ts:120

One combustion particle — an ember (bright, rises) or fleck (dark, curls).

## Properties

### x

```ts
x: number
```

Defined in: website/components/home/mosaic/burn/types.ts:121

---

### y

```ts
y: number
```

Defined in: website/components/home/mosaic/burn/types.ts:122

---

### vx

```ts
vx: number
```

Defined in: website/components/home/mosaic/burn/types.ts:123

---

### vy

```ts
vy: number
```

Defined in: website/components/home/mosaic/burn/types.ts:124

---

### life

```ts
life: number
```

Defined in: website/components/home/mosaic/burn/types.ts:125

---

### maxLife

```ts
maxLife: number
```

Defined in: website/components/home/mosaic/burn/types.ts:126

---

### size

```ts
size: number
```

Defined in: website/components/home/mosaic/burn/types.ts:127

---

### kind

```ts
kind: number
```

Defined in: website/components/home/mosaic/burn/types.ts:129

0 = ember, 1 = char fleck.

---

### rot

```ts
rot: number
```

Defined in: website/components/home/mosaic/burn/types.ts:131

Rotation for flecks (radians) + tumble speed.

---

### spin

```ts
spin: number
```

Defined in: website/components/home/mosaic/burn/types.ts:132

---

### phase

```ts
phase: number
```

Defined in: website/components/home/mosaic/burn/types.ts:134

Per-particle noise phase — keeps flicker/wobble desynced.

---

### L?

```ts
optional L?: LetterBurn;
```

Defined in: website/components/home/mosaic/burn/types.ts:139

Rebuild deposits only — the letter whose front this particle rains
onto. Undefined for burn particles, which simply rise and die.
