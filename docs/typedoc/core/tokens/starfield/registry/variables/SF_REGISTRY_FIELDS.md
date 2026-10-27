[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/registry](../README.md) / SF\_REGISTRY\_FIELDS

```ts
const SF_REGISTRY_FIELDS: Readonly<Record<string, Readonly<Record<string, string>>>>
```

Defined in: core/tokens/starfield/registry.ts:71

Abbreviated shard-record field dictionary per kind — the single-letter
JSON keys each record carries (mirrors `SFRegistryRecord` in
engine/registry.ts). Emitted to robots so the packed shard vocabulary
is self-describing.
