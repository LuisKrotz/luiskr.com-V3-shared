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
 *     class;
 *   - `@media print`/`@page` blocks become `virtual:rcss/print/<file>` —
 *     an `rcss-print` chunk adopted only when paper output is imminent.
 *
 * Generated module shape:
 *   export const base = "<css>"
 *   export default { base, tiers: { tablet: () => import("virtual:rcss/tablet/<id>"), … },
 *                    print: () => import("virtual:rcss/print/<id>") }
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

/**
 * The import query this plugin owns — `styles.scss?tiers`, as a query
 * FLAG rather than a suffix: vite's dev import-analysis stamps its own
 * params into re-served specifiers (`file.scss?t=<ts>&tiers` once an HMR
 * invalidation rewrites the importer), so ownership is decided by flag
 * presence, not position — otherwise the css pipeline claims the file
 * and serves an inject-style module with no `default` export.
 */
const TIERS_RE = /[?&]tiers(?=[&=]|$)/

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

    // Dev invalidation — the per-file compile cache lives for the whole
    // process; without a watcher hook every .scss edit (entry or shared
    // @import partial) stayed frozen until a server restart. Any scss
    // change clears ALL entries (partials are shared across sheets, so
    // per-file dependency tracking would miss importers), evicts the
    // \0lk-tiers: virtual modules from the module graph (their ids are
    // virtual paths, so vite's default file→module mapping never flags
    // them — load() results would stay cached even through the reload),
    // and forces a full reload — the ?tiers virtual modules are JS-side
    // adopted sheets, so css hot-swap can't apply anyway.
    configureServer(server) {
      server.watcher.on('change', (file) => {
        if (!file.endsWith('.scss')) return

        cache.clear()

        for (const mod of server.moduleGraph.idToModuleMap.values()) {
          if (mod.id?.startsWith(NS)) {
            server.moduleGraph.invalidateModule(mod)
          }
        }

        server.ws.send({ type: 'full-reload' })
      })
    },

    async configResolved(config) {
      env.minify = config.command === 'build' && config.build.cssMinify !== false
      env.targets = lightningcssTargets(config.build.cssTarget)

      const [sass, { transform }] = await Promise.all([import('sass'), import('lightningcss')])

      env.sass = sass
      env.transform = transform
    },

    async resolveId(id, importer) {
      if (id.startsWith(RCSS_PREFIX)) return `${NS}${id}${VIRTUAL_SUFFIX}`

      if (!TIERS_RE.test(id)) return null

      // The sheet path is the specifier minus its whole query — a
      // stamped specifier (`?t=<ts>&tiers`) resolves to the same file.
      const q = id.indexOf('?')
      const spec = q < 0 ? id : id.slice(0, q)
      const r = await this.resolve(spec, importer, { skipSelf: true })

      return r ? `${NS}${r.id.split('?')[0]}${VIRTUAL_SUFFIX}` : null
    },

    async load(id) {
      if (!id.startsWith(NS)) return null

      const inner = id.slice(NS.length).replace(/\.tiers\.js$/, '')

      if (inner.startsWith(RCSS_PREFIX)) {
        // virtual:rcss/<cls>/<encoded file> → the tier's cumulative css
        // text ('print' maps to the extracted print bucket, not a width class)
        const rest = inner.slice(RCSS_PREFIX.length)
        const slash = rest.indexOf('/')
        // `?t=` stamps ride the same specifiers — strip before sass sees
        // the path (an encoded `?` in the name arrives as %3F, so a
        // literal `?` is always the query boundary).
        const file = decodeURIComponent(rest.slice(slash + 1)).split('?')[0]

        const parts = await compileSheet(file, env)
        const cls = rest.slice(0, slash)
        const text = cls === 'print' ? (parts.print ?? '') : (parts.tiers[cls] ?? '')

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

      // Sheets without print blocks get no `print` key — the runtime
      // checks for the loader before scheduling its import.
      const print = parts.print
        ? `,print:()=>import(${JSON.stringify(`${RCSS_PREFIX}print/${encodeURIComponent(file)}`)})`
        : ''

      return (
        `export const base=${JSON.stringify(parts.base)};` +
        `export default{base,tiers:{${loaders}}${print}};`
      )
    },
  }
}
