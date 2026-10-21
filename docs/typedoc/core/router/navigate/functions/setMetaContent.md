[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/router/navigate](../README.md) / setMetaContent

```ts
function setMetaContent(selector, content): void
```

Defined in: core/router/navigate.ts:50

Writes `content` into one head <meta> selected by `selector`; no-ops when
absent. Exported for views that resolve their title asynchronously
(project data lands after navigation) and must keep the social mirrors
in step.

## Parameters

### selector

`string`

### content

`string`

## Returns

`void`
