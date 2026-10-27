[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/controls](../README.md) / SLIDER\_GROUPS

```ts
const SLIDER_GROUPS: readonly SpGroup[]
```

Defined in: experiments/earth-playground/space/controls.ts:127

Declarative control schema — the panel renders straight from this so a
new engine knob needs no JSX change. The group tree ships as data in
`core/tokens/playground/control-groups.ts` (a zero-import leaf the
Node build scripts read too — the same schema describes the
canvas-rendered panel to crawlers); each row expands here with:
label translation key looked up in the earth-playground node (and
the key used by the CMS `defaults` map)
param SP_PARAMS token — resolved from the row's `key`; the
persisted-settings key + data-param attr
type _R range slider | _C WebGL checkbox — shape-derived:
`checked` rows are checkboxes, the rest sliders
min/max/step/def range geometry; `def` is the shipped default until
the CMS `defaults` map or a saved user value wins
checked checkbox shipped state — same precedence as `def`
actions group-level buttons (reset view, screenshot, copy settings)
`collapsed` controls whether the group starts folded in the panel.
