[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/deploy-info/types](../README.md) / ConsoleScanReport

Defined in: cms/deploy-info/types.ts:105

Shape of the console-scan gate output — `ok` is the pass/fail,
`violations` lists each `console.*` callsite found under src/ (file, line,
method) since src is a zero-console zone (AGENTS.md rule 12).

## Properties

### ok?

```ts
optional ok?: boolean;
```

Defined in: cms/deploy-info/types.ts:106

---

### totals?

```ts
optional totals?: Record<string, number>;
```

Defined in: cms/deploy-info/types.ts:107

---

### violations?

```ts
optional violations?: object[];
```

Defined in: cms/deploy-info/types.ts:108

#### file?

```ts
optional file?: string;
```

#### line?

```ts
optional line?: number;
```

#### method?

```ts
optional method?: string;
```
