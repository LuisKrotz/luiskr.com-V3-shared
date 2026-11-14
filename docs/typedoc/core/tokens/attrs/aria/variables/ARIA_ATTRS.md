[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/attrs/aria](../README.md) / ARIA\_ATTRS

```ts
const ARIA_ATTRS: Readonly<{
  ARIA_LABEL: 'aria-label'
  ARIA_EXPANDED: 'aria-expanded'
  ARIA_CONTROLS: 'aria-controls'
  ARIA_LABELLEDBY: 'aria-labelledby'
  ARIA_DESCRIBEDBY: 'aria-describedby'
  ARIA_MODAL: 'aria-modal'
  ARIA_DESCRIPTION: 'aria-description'
  ARIA_HIDDEN: 'aria-hidden'
  ARIA_LIVE: 'aria-live'
  ARIA_PRESSED: 'aria-pressed'
  ARIA_CHECKED: 'aria-checked'
  ARIA_ACTIVEDESCENDANT: 'aria-activedescendant'
  ARIA_AUTOCOMPLETE: 'aria-autocomplete'
  ARIA_HASPOPUP: 'aria-haspopup'
  ARIA_ORIENTATION: 'aria-orientation'
  ARIA_VALUEMIN: 'aria-valuemin'
  ARIA_VALUEMAX: 'aria-valuemax'
  ARIA_VALUENOW: 'aria-valuenow'
  ARIA_VALUETEXT: 'aria-valuetext'
  POLITE: 'polite'
  ROLE: 'role'
  ROLE_DIALOG: 'dialog'
  ROLE_GROUP: 'group'
  ROLE_SWITCH: 'switch'
  ROLE_SLIDER: 'slider'
  ROLE_BUTTON: 'button'
  ROLE_NAVIGATION: 'navigation'
  ROLE_ALERT: 'alert'
  ROLE_STATUS: 'status'
  ROLE_REGION: 'region'
  ROLE_TREE: 'tree'
  ROLE_TREEITEM: 'treeitem'
  ROLE_NONE: 'none'
  ROLE_IMG: 'img'
  ROLE_APPLICATION: 'application'
  ROLE_COMBOBOX: 'combobox'
  ROLE_LISTBOX: 'listbox'
  ROLE_OPTION: 'option'
  AUTOCOMPLETE_LIST: 'list'
  TABINDEX: 'tabindex'
}>
```

Defined in: core/tokens/attrs/aria.ts:13

Frozen aria attribute-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
