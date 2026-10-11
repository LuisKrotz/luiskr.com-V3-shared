[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / SFRegistryRecord

Defined in: experiments/star-field/engine/registry.ts:48

One catalogued record inside a shard — field keys are short on
purpose (the 14 MB index would double with long names): `n` display
name/designation, `m` apparent magnitude, `d` heliocentric distance
in light-years, `s` spectral class, `c` constellation/catalog name,
`h` host star (exoplanets), `t` object type code (DSOs), `r`
redshift, `y2` discovery year (exoplanets), `x/y/z` heliocentric
light-years, `i` registry id.

## Properties

### i

```ts
i: string;
```

Defined in: experiments/star-field/engine/registry.ts:49

***

### n

```ts
n: string;
```

Defined in: experiments/star-field/engine/registry.ts:50

***

### m?

```ts
optional m?: number | null;
```

Defined in: experiments/star-field/engine/registry.ts:51

***

### d?

```ts
optional d?: number;
```

Defined in: experiments/star-field/engine/registry.ts:52

***

### s?

```ts
optional s?: string;
```

Defined in: experiments/star-field/engine/registry.ts:53

***

### c?

```ts
optional c?: string;
```

Defined in: experiments/star-field/engine/registry.ts:54

***

### h?

```ts
optional h?: string;
```

Defined in: experiments/star-field/engine/registry.ts:55

***

### t?

```ts
optional t?: string;
```

Defined in: experiments/star-field/engine/registry.ts:56

***

### r?

```ts
optional r?: number | null;
```

Defined in: experiments/star-field/engine/registry.ts:57

***

### y2?

```ts
optional y2?: string;
```

Defined in: experiments/star-field/engine/registry.ts:58

***

### x

```ts
x: number;
```

Defined in: experiments/star-field/engine/registry.ts:59

***

### y

```ts
y: number;
```

Defined in: experiments/star-field/engine/registry.ts:60

***

### z

```ts
z: number;
```

Defined in: experiments/star-field/engine/registry.ts:61
