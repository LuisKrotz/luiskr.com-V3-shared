# `core\utils\canvas\loaders\page-backdrop\theme.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\loaders\page-backdrop\theme.ts`    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `sampleTheme`

Samples the theme palette into the host's uniform buffers.

`_base` receives `--bg-primary`; `_colors` receives the seven field
hues in FIELD_CSS_PROP_LIST order (the shader's `u_col[i]` slots) as
one flat RGB Float32Array so the upload is a single `uniform3fv`. An
unparseable hue copies the base colour (a lobe of the surface tint is
invisible) rather than defaulting to a literal; an unparseable base
returns false so the caller can take the CSS fallback — there is no
sensible colour to invent for the page surface.
`_key` receives the specular white + the theme's key gain (rgb +
alpha packed vec4); `_shade` receives the ink pole + the counter-pool
gain the same way. `_gain` is the dark/light lobe strength;
`_darkAtStart` records the theme so `renderFrame` can detect a
mid-loop flip.

- `@param` host - the backdrop instance whose buffers to fill
- `@returns` true when the base surface colour parsed
