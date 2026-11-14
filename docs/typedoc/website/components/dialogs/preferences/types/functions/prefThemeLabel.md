[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/dialogs/preferences/types](../README.md) / prefThemeLabel

```ts
function prefThemeLabel(appearance, theme): string
```

Defined in: website/components/dialogs/preferences/types.ts:76

Localized option label for a theme value — feeds the slider canvas's
`aria-valuetext` so AT announces "Dark"/"System"/"Light" instead of
the raw 0–2 track position. Falls back to the raw value if a locale
ever ships an unknown theme key.

## Parameters

### appearance

#### title

`string`

Section heading.

#### desc

`string`

Section description under the heading.

#### dark

[`PrefThemeOption`](../interfaces/PrefThemeOption.md)

Dark-theme radio option.

#### system

[`PrefThemeOption`](../interfaces/PrefThemeOption.md)

Follow-OS radio option.

#### light

[`PrefThemeOption`](../interfaces/PrefThemeOption.md)

Light-theme radio option.

### theme

`string`

## Returns

`string`
