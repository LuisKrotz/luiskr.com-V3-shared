[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/deploy-info/types](../README.md) / SnykReport

Defined in: cms/deploy-info/types.ts:54

Shape of the security-scan report — `scanner` records whether snyk or
yarn audit produced it, `ok` the gate outcome, `vulnerabilities` the advisory
rows (acceptedRisk marks entries waived via security-exceptions.json).

## Properties

### scanner?

```ts
optional scanner?: string;
```

Defined in: cms/deploy-info/types.ts:55

***

### ok?

```ts
optional ok?: boolean;
```

Defined in: cms/deploy-info/types.ts:56

***

### totals?

```ts
optional totals?: Record<string, number>;
```

Defined in: cms/deploy-info/types.ts:57

***

### vulnerabilities?

```ts
optional vulnerabilities?: object[];
```

Defined in: cms/deploy-info/types.ts:58

#### packageName?

```ts
optional packageName?: string;
```

#### severity?

```ts
optional severity?: string;
```

#### title?

```ts
optional title?: string;
```

#### acceptedRisk?

```ts
optional acceptedRisk?: boolean;
```

#### fixedIn?

```ts
optional fixedIn?: string;
```
