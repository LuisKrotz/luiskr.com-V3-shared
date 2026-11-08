/**
 * @file minify-wasm-glue.mjs
 * @description Minifies the committed wasm-pack JS glue under
 * website/public/wasm/<slug>/ in place. The glue is generated source
 * (wasm-pack build --target web), not authored code — shipping it
 * unminified wastes critical-path bytes on every widget mount. Run after
 * regenerating any widget artifact:
 *
 *   node shared/scripts/build/minify-wasm-glue.mjs
 *
 * Settings: `module: true` lets terser treat the files as ES modules —
 * top-level unexported bindings (FinalizationRegistry helpers, cached
 * decoders) mangle freely while export names and the wasm-import
 * bindings stay stable. The `@ts-self-types` directive comment is kept
 * so the .d.ts sidecar wiring survives.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { minify } from 'terser'

const WASM_ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../../website/public/wasm')
const SELF_TYPES_COMMENT = /@ts-self-types/

/** Minify one glue file in place; returns [beforeBytes, afterBytes]. */
const minifyGlueFile = async (filePath) => {
  const source = readFileSync(filePath, 'utf8')
  const result = await minify(source, {
    module: true,
    compress: { passes: 2 },
    mangle: true,
    format: { comments: SELF_TYPES_COMMENT },
  })

  writeFileSync(filePath, result.code, 'utf8')

  return [source.length, result.code.length]
}

/** Walk <slug>/ dirs, minify each *.js glue file, log the savings. */
const main = async () => {
  const slugs = readdirSync(WASM_ROOT).filter((entry) =>
    statSync(join(WASM_ROOT, entry)).isDirectory()
  )

  let totalBefore = 0
  let totalAfter = 0

  for (const slug of slugs) {
    const dir = join(WASM_ROOT, slug)

    for (const file of readdirSync(dir).filter((f) => f.endsWith('.js'))) {
      const [before, after] = await minifyGlueFile(join(dir, file))

      totalBefore += before
      totalAfter += after
    }
  }

  const saved = ((1 - totalAfter / totalBefore) * 100).toFixed(1)

  console.log(
    `minify-wasm-glue: ${slugs.length} widgets — ${(totalBefore / 1024).toFixed(0)} KiB → ${(totalAfter / 1024).toFixed(0)} KiB (${saved}% smaller)`
  )
}

await main()
