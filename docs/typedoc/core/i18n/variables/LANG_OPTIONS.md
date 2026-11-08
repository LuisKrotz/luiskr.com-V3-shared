[**luiskr.com**](../../../README.md)

---

[luiskr.com](../../../README.md) / [core/i18n](../README.md) / LANG\_OPTIONS

```ts
const LANG_OPTIONS: readonly (
  | {
      code: 'en'
      label: string
      cc: string
      flag: string
      cc2?: undefined
    }
  | {
      code: 'br'
      label: string
      cc: string
      flag: string
      cc2?: undefined
    }
  | {
      code: 'es'
      label: string
      cc: string
      flag: string
      cc2?: undefined
    }
  | {
      code: 'de'
      label: string
      cc: string
      cc2: string
      flag: string
    }
  | {
      code: 'hrk'
      label: string
      cc: string
      cc2: string
      flag: string
    }
  | {
      code: 'cas'
      label: string
      cc: string
      cc2: string
      flag: string
    }
  | {
      code: 'riv'
      label: string
      cc: string
      cc2: string
      flag: string
    }
  | {
      code: 'gn'
      label: string
      cc: string
      flag: string
      cc2?: undefined
    }
  | {
      code: 'it'
      label: string
      cc: string
      flag: string
      cc2?: undefined
    }
  | {
      code: 'ru'
      label: string
      cc: string
      flag: string
      cc2?: undefined
    }
  | {
      code: 'fr'
      label: string
      cc: string
      flag: string
      cc2?: undefined
    }
  | {
      code: 'tln'
      label: string
      cc: string
      cc2: string
      flag: string
    }
  | {
      cc2?: undefined
      code: 'gl'
      label: string
      cc: string
      flag: string
    }
  | {
      cc2?: undefined
      code: 'ca'
      label: string
      cc: string
      flag: string
    }
  | {
      cc2?: undefined
      code: 'nl'
      label: string
      cc: string
      flag: string
    }
  | {
      cc2?: undefined
      code: 'ga'
      label: string
      cc: string
      flag: string
    }
)[]
```

Defined in: core/i18n.ts:48

Language picker rows — frozen registry driving the lang dialog, the
router's VALID_LANGS, and the per-flag WebGL widgets.
