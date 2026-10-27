[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/deploy-info/types](../README.md) / A11yReport

Defined in: cms/deploy-info/types.ts:57

Shape of the IBM Equal Access full-site scan summary — written by
deploy-info.mjs from a11y-checker.json. `rules` aggregates findings by
rule+level (count + page coverage + one example message); `routes`
lists only the routes carrying gated findings so the table stays short.

## Properties

### generatedAt?

```ts
optional generatedAt?: string;
```

Defined in: cms/deploy-info/types.ts:58

---

### engine?

```ts
optional engine?: string;
```

Defined in: cms/deploy-info/types.ts:59

---

### policy?

```ts
optional policy?: string;
```

Defined in: cms/deploy-info/types.ts:60

---

### gatingLevels?

```ts
optional gatingLevels?: string[];
```

Defined in: cms/deploy-info/types.ts:61

---

### pages?

```ts
optional pages?: number;
```

Defined in: cms/deploy-info/types.ts:62

---

### totals?

```ts
optional totals?: Record<string, number>;
```

Defined in: cms/deploy-info/types.ts:63

---

### rules?

```ts
optional rules?: object[];
```

Defined in: cms/deploy-info/types.ts:64

#### level?

```ts
optional level?: string;
```

#### ruleId?

```ts
optional ruleId?: string;
```

#### count?

```ts
optional count?: number;
```

#### pages?

```ts
optional pages?: number;
```

#### message?

```ts
optional message?: string;
```

---

### routes?

```ts
optional routes?: object[];
```

Defined in: cms/deploy-info/types.ts:71

#### route?

```ts
optional route?: string;
```

#### violation?

```ts
optional violation?: number;
```

#### potentialviolation?

```ts
optional potentialviolation?: number;
```

#### recommendation?

```ts
optional recommendation?: number;
```

#### manual?

```ts
optional manual?: number;
```

#### gated?

```ts
optional gated?: number;
```

#### error?

```ts
optional error?: string;
```
