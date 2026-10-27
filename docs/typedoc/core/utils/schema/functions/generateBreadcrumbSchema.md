[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generateBreadcrumbSchema

```ts
function generateBreadcrumbSchema(items?, id?): Record<string, unknown> | null
```

Defined in: core/utils/schema.ts:309

BreadcrumbList entity from an ordered crumb trail — positions are
1-based per the spec. Returns null for an empty/absent trail so
callers can spread the result unconditionally.

## Parameters

### items?

`BreadcrumbItem`[] = `[]`

Ordered crumbs ending at the current page.

### id?

`string`

Optional entity identifier the page's `breadcrumb` can point at.

## Returns

`Record`\<`string`, `unknown`\> \| `null`

BreadcrumbList entity or null.
