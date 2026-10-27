[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/deploy-info/types](../README.md) / AxeReport

Defined in: cms/deploy-info/types.ts:42

Shape of the axe-scan report — `engine` names the axe-core version and
`surfaces` lists each mounted DOM surface with its violations (id, impact, help)
so the CMS tab can render them grouped by page area.

## Properties

### engine?

```ts
optional engine?: string;
```

Defined in: cms/deploy-info/types.ts:43

---

### totals?

```ts
optional totals?: Record<string, number>;
```

Defined in: cms/deploy-info/types.ts:44

---

### surfaces?

```ts
optional surfaces?: object[];
```

Defined in: cms/deploy-info/types.ts:45

#### surface

```ts
surface: string
```

#### violations?

```ts
optional violations?: object[];
```
