[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/playground/control-groups](../README.md) / SP\_CONTROL\_GROUPS

```ts
const SP_CONTROL_GROUPS: readonly SpControlGroupSpec[]
```

Defined in: core/tokens/playground/control-groups.ts:77

Control-panel group tree — sole declaration site for the panel's
structure (group order, fold state, per-control range geometry and
shipped defaults). `space/controls.ts` expands it into SLIDER_GROUPS
by resolving `key` through the param/action token maps and deriving
the FORM_ATTRS input type from each row's shape; the build scripts
expand it the same way to describe the canvas-rendered control
surface to crawlers and agents.
