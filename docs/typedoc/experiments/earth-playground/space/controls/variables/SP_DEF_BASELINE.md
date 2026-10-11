[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/controls](../README.md) / SP\_DEF\_BASELINE

```ts
const SP_DEF_BASELINE: object[][];
```

Defined in: experiments/earth-playground/space/controls.ts:320

Pristine def/checked snapshot — _applyDbDefaults restores this baseline
before merging so CMS defaults never bleed across locale switches. The
shape mirrors SLIDER_GROUPS (group → controls) so restoration indexes
positionally without re-deriving keys.
