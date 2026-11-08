/**
 * @file vite-scss-tiers.mjs
 * @description Vite plugin implementing `styles.scss?tiers` — the
 * component-side half of the breakpoint stylesheet split.
 *
 * A `?tiers` import compiles the sheet exactly like `?inline` (sass →
 * lightningcss at build, plain sass output in dev), then runs the shared
 * splitter (build/css-split.mjs):
 *
 *   - `base` — the non-min-width part — is exported inline so components
 *     adopt it synchronously at mount, same as `?inline` before;
 *   - each width-class tier becomes a `virtual:rcss/<cls>/<file>` module
 *     the generated code lazy-imports — rolldown emits these as their own
 *     chunks (grouped `rcss-<cls>` per entry set by codeSplitting.groups),
 *     so a viewport only downloads the cumulative media css matching its
 *     class.
 *
 * Generated module shape:
 *   export const base = "<css>"
 *   export default { base, tiers: { tablet: () => import("virtual:rcss/tablet/<id>"), … } }
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { splitComponentSheet } from './css-split.mjs'
import { lightningcssTargets } from './css-classes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Repo root — the sass load path and importer resolution anchor. */
const ROOT = path.resolve(__dirname, '..', '..')

/** Sass load path so component sheets resolve @core/sass partials like vite's css pipeline. */
const SASS_LOAD_PATHS = [path.join(ROOT, 'core', 'sass')]

/** Public prefix for lazily-delivered tier modules (the rcss chunk group tests it). */
export const RCSS_PREFIX = 'virtual:rcss/'

/** The import query this plugin owns — `styles.scss?tiers`. */
const TIERS_SUFFIX = '?tiers'

/** Internal module namespace — both `?tiers` modules and `virtual:rcss/` ids live under it. */
const NS = '\0lk-tiers:'
// Virtual ids must NOT end in `.scss` — vite's css plugin matches the
// extension and would run the generated JS module back through sass.
// `.tiers.js` keeps the id a plain JS module while `load` strips the
// marker to recover the underlying sheet path / rcss spec.
const VIRTUAL_SUFFIX = '.tiers.js'

/**
 * Compiles a scss file through the same pipeline vite applies to `?inline`:
 * sass with the core/sass load path, then lightningcss minify+prefix when
 * building (dev ships unminified css like `?inline` does).
 * @param {string} file absolute .scss path
 * @param {{sass:any, transform:any, targets:object|undefined, minify:boolean}} env
 * @returns {Promise<{base:string, tiers:Record<string,string>, guarded:string[]}>}
 */
const compileSheet = async (file, env) => {
  const compiled = env.sass.compile(file, {
    loadPaths: SASS_LOAD_PATHS,
    silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'],
  })

  let css = compiled.css.toString()

  if (env.minify) {
    const out = env.transform({
      filename: path.basename(file),
      code: Buffer.from(css),
      minify: true,
      targets: env.targets,
      errorRecovery: true,
    })

    css = out.code.toString()
  }

  return splitComponentSheet(css)
}

/**
 * The `?tiers` vite plugin factory.
 * @returns {import('vite').Plugin} vite plugin instance
 */
export const scssTiersPlugin = () => {
  const cache = new Map()
  const env = { sass: null, transform: null, targets: undefined, minify: false }

  return {
    name: 'lk-scss-tiers',
    // Pre — vite's core resolver claims `*.scss?tiers` files before
    // normal-order plugins (the file exists, so it resolves), leaving the
    // built-in CSS pipeline to serve an inject-style module with no
    // `default` export. Claiming the query first lets resolveId map the
    // import into the \0lk-tiers: virtual namespace on both dev and build.
    enforce: 'pre',

    async configResolved(config) {
      env.minify = config.command === 'build' && config.build.cssMinify !== false
      env.targets = lightningcssTargets(config.build.cssTarget)

      const [{ default: sass }, { transform }] = await Promise.all([
        import('sass'),
        import('lightningcss'),
      ])

      env.sass = sass
      env.transform = transform
    },

    async resolveId(id, importer) {
      if (id.startsWith(RCSS_PREFIX)) return `${NS}${id}${VIRTUAL_SUFFIX}`

      if (!id.endsWith(TIERS_SUFFIX)) return null

      const spec = id.slice(0, -TIERS_SUFFIX.length)
      const r = await this.resolve(spec, importer, { skipSelf: true })

      return r ? `${NS}${r.id}${VIRTUAL_SUFFIX}` : null
    },

    async load(id) {
      if (!id.startsWith(NS)) return null

      const inner = id.slice(NS.length).replace(/\.tiers\.js$/, '')

      if (inner.startsWith(RCSS_PREFIX)) {
        // virtual:rcss/<cls>/<encoded file> → the tier's cumulative css text
        const rest = inner.slice(RCSS_PREFIX.length)
        const slash = rest.indexOf('/')
        const file = decodeURIComponent(rest.slice(slash + 1))

        const parts = await compileSheet(file, env)
        const cls = rest.slice(0, slash)
        const text = parts.tiers[cls] ?? ''

        return `export default ${JSON.stringify(text)}`
      }

      const file = inner
      const parts = cache.get(file) ?? (await compileSheet(file, env))

      cache.set(file, parts)

      const loaders = Object.keys(parts.tiers)
        .map(
          (cls) =>
            `${JSON.stringify(cls)}:()=>import(${JSON.stringify(`${RCSS_PREFIX}${cls}/${encodeURIComponent(file)}`)})`
        )
        .join(',')

      return (
        `export const base=${JSON.stringify(parts.base)};` +
        `export default{base,tiers:{${loaders}}};`
      )
    },
  }
}
