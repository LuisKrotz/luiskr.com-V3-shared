[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/locale/ui-text](../README.md) / rightsParts

```ts
function rightsParts(): object
```

Defined in: core/locale/ui-text.ts:108

Segmented copyright line for the site footers — the same resolved
`rightsText()` split around the © glyph and the year so renderers can
wrap those two tokens in emphasis markup without hardcoding where the
translation places them. `post` carries any suffix after the year
(empty today, kept for translation freedom); when either anchor is
missing the whole line lands in `pre` and renders unsegmented.

## Returns

`object`

— render as
pre + <b>copy</b> + mid + <b>year</b> + post.

### pre

```ts
pre: string
```

### copy

```ts
copy: string
```

### mid

```ts
mid: string
```

### year

```ts
year: string
```

### post

```ts
post: string
```
