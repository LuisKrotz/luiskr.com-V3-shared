/**
 * @file css-split-tiers.test.js
 * @description Unit coverage for the breakpoint stylesheet splitter
 * (shared/build/css-split.mjs + css-classes.mjs): pure min-width media
 * blocks are bucketed into cumulative width-class sheets, `@media print`
 * and `@page` parts extract into the lazy print bucket, and the component
 * splitter's base/tiers output reproduces the original cascade.
 */
import { WIDTH_CLASSES, WIDTH_CLASS_NAMES, classForMinWidth } from '@build/css-classes.mjs'
import { splitDocumentSheet, splitComponentSheet } from '@build/css-split.mjs'
import { scssTiersPlugin } from '@build/vite-scss-tiers.mjs'

describe('css-classes — width class registry', () => {
  test('class table is ordered mobile→wide with ascending gates', () => {
    expect(WIDTH_CLASS_NAMES).toEqual(['mobile', 'tablet', 'desktop', 'wide'])

    for (let i = 1; i < WIDTH_CLASSES.length; i++) {
      expect(WIDTH_CLASSES[i].gate).toBeGreaterThan(WIDTH_CLASSES[i - 1].gate)
    }
  })

  test('classForMinWidth buckets every authored min-width breakpoint', () => {
    const cases = [
      [319, 'mobile'],
      [539, 'mobile'],
      [766, 'mobile'],
      [767, 'tablet'],
      [959, 'tablet'],
      [1023, 'tablet'],
      [1278, 'tablet'],
      [1279, 'desktop'],
      [1439, 'desktop'],
      [1919, 'desktop'],
      [2558, 'desktop'],
      [2559, 'wide'],
      [3839, 'wide'],
      [7679, 'wide'],
    ]

    for (const [px, cls] of cases) {
      expect(classForMinWidth(px)).toBe(cls)
    }
  })
})

describe('splitDocumentSheet — cumulative document sheets', () => {
  const css =
    '.a{color:red}' +
    '@media (width>=319px){.b{m:0}}' +
    '.c{color:blue}' +
    '@media (width>=767px){.d{m:0}}' +
    '@media (width>=1279px){.e{m:0}}' +
    '@media (width>=2559px){.f{m:0}}' +
    '@media (max-width:100px){.g{m:0}}' +
    '@media print{.h{m:0}}'

  const sheets = splitDocumentSheet(css)

  test('every class keeps base + non-pure media in original order', () => {
    for (const cls of WIDTH_CLASS_NAMES) {
      expect(sheets[cls]).toContain('.a{color:red}')
      expect(sheets[cls]).toContain('.c{color:blue}')
      expect(sheets[cls]).toContain('.g{m:0}')
    }
  })

  test('@media print leaves every width class except wide and joins the print sheet', () => {
    expect(sheets.mobile).not.toContain('.h{m:0}')
    expect(sheets.tablet).not.toContain('.h{m:0}')
    expect(sheets.desktop).not.toContain('.h{m:0}')
    // Wide is the full byte-identical sheet — it still carries the block.
    expect(sheets.wide).toContain('.h{m:0}')
    expect(sheets.print).toBe('@media print{.h{m:0}}')
  })

  test('@page parts and compound print queries split by domain purity', () => {
    const css =
      '.a{x:0}' +
      '@page{margin:1cm}' +
      '@page print-landscape{size:landscape}' +
      '@media print{.p{m:0}}' +
      '@media print and (color){.q{m:0}}' +
      '@media (width>=767px){.d{m:0}}'
    const out = splitDocumentSheet(css)

    expect(out.print).toContain('@page{margin:1cm}')
    expect(out.print).toContain('@page print-landscape{size:landscape}')
    expect(out.print).toContain('@media print{.p{m:0}}')
    // Compound print queries stay on the screen sheets — ambiguous domain,
    // same conservative boundary as compound min-width queries.
    expect(out.print).not.toContain('.q{m:0}')
    expect(out.mobile).toContain('.q{m:0}')
    expect(out.mobile).not.toContain('@page')
    expect(out.mobile).not.toContain('.p{m:0}')
    expect(out.tablet).not.toContain('@page')
    expect(out.desktop).not.toContain('.p{m:0}')
    expect(out.wide).toBe(css)
  })

  test('each class drops only future-class min-width blocks', () => {
    expect(sheets.mobile).toContain('.b{m:0}')
    expect(sheets.mobile).not.toContain('.d{m:0}')
    expect(sheets.mobile).not.toContain('.e{m:0}')
    expect(sheets.mobile).not.toContain('.f{m:0}')

    expect(sheets.tablet).toContain('.d{m:0}')
    expect(sheets.tablet).not.toContain('.e{m:0}')

    expect(sheets.desktop).toContain('.e{m:0}')
    expect(sheets.desktop).not.toContain('.f{m:0}')

    // Wide is the complete sheet — byte-identical to the input.
    expect(sheets.wide).toBe(css)
  })

  test('legacy (min-width: Npx) query form buckets identically', () => {
    const legacy = '.a{x:0}@media (min-width: 767px){.d{m:0}}@media (min-width: 2559px){.f{m:0}}'
    const out = splitDocumentSheet(legacy)

    expect(out.mobile).not.toContain('.d{m:0}')
    expect(out.tablet).toContain('.d{m:0}')
    expect(out.tablet).not.toContain('.f{m:0}')
    expect(out.wide).toBe(legacy)
  })

  test('compound and range queries stay in every class', () => {
    const compound =
      '.a{x:0}@media (min-width:767px) and (max-width:1278px){.i{m:0}}' +
      '@media (767px<=width<1279px){.j{m:0}}'
    const out = splitDocumentSheet(compound)

    expect(out.mobile).toBe(compound)
    expect(out.wide).toBe(compound)
  })

  test('a rule already set at a lower/equal min-width drops its wider copy', () => {
    // `.g{padding:X}` inside >=539 already covers every viewport >=767 —
    // the verbatim repeat at the wider breakpoint is dead text.
    const css =
      '@media (width>=319px){.g{p:1}}' +
      '@media (width>=539px){.g{p:1}.h{q:2}}' +
      '@media (width>=767px){.g{p:1}.h{q:3}}' +
      '@media (width>=1279px){.g{p:1}.i{r:4}}'
    const out = splitDocumentSheet(css)

    // The redundant .g{p:1} copies are gone everywhere; first occurrence wins.
    expect(out.wide.match(/\.g\{p:1\}/g)).toHaveLength(1)
    expect(out.wide).toContain('.h{q:2}')
    expect(out.wide).toContain('.h{q:3}')
    expect(out.wide).toContain('.i{r:4}')
    // The >=767 block survives — it still carries the unique .h{q:3} rule.
    expect(out.wide).toContain('(width>=767px)')
    expect(out.wide).toContain('(width>=1279px)')
  })

  test('a block whose every rule is already covered disappears entirely', () => {
    const css = '.a{x:0}@media (width>=319px){.b{m:0}}@media (width>=767px){.b{m:0}}'
    const out = splitDocumentSheet(css)

    expect(out.wide).toContain('@media (width>=319px){.b{m:0}}')
    expect(out.wide).not.toContain('(width>=767px)')
  })

  test('lowest-width occurrence wins regardless of source order', () => {
    // The >=767 copy is listed before >=319 — the narrower-domain copy is
    // still the redundant one; the >=319 rule reproduces it.
    const css = '@media (width>=767px){.b{m:0}}@media (width>=319px){.b{m:0}}'
    const out = splitDocumentSheet(css)

    expect(out.wide).toBe('@media (width>=319px){.b{m:0}}')
  })

  test('identical non-pure media blocks dedupe as whole blocks', () => {
    const css =
      '@media (max-width:100px){.a{m:0}}' + '.b{y:1}' + '@media (max-width:100px){.a{m:0}}'
    const out = splitDocumentSheet(css)

    expect(out.wide.match(/\.a\{m:0\}/g)).toHaveLength(1)
    expect(out.wide).toContain('.b{y:1}')
  })

  test('dedupe never merges differing rules under the same breakpoint', () => {
    const css = '@media (width>=767px){.a{p:1}.b{p:2}}' + '@media (width>=767px){.a{p:1}.c{p:3}}'
    const out = splitDocumentSheet(css)

    // Second block keeps its unique rule; the shared .a{p:1} copy drops.
    expect(out.wide.match(/\.a\{p:1\}/g)).toHaveLength(1)
    expect(out.wide).toContain('.b{p:2}')
    expect(out.wide).toContain('.c{p:3}')
    expect(out.wide.match(/width>=767px/g)).toHaveLength(2)
  })
})

describe('splitComponentSheet — base + lazy tiers', () => {
  test('pure min-width blocks move to cumulative tiers in source order', () => {
    const css =
      '.a{color:red}' +
      '@media (width>=319px){.b{m:0}}' +
      '@media (width>=767px){.d{m:0}}' +
      '@media (width>=2559px){.f{m:0}}'

    const { base, tiers } = splitComponentSheet(css)

    expect(base).toBe('.a{color:red}')
    expect(tiers.mobile).toContain('.b{m:0}')
    expect(tiers.tablet).toContain('.b{m:0}')
    expect(tiers.tablet).toContain('.d{m:0}')
    // No desktop-class blocks → the desktop key is omitted; the runtime
    // falls back to the highest defined lower tier.
    expect(tiers.desktop).toBeUndefined()
    expect(tiers.wide).toContain('.f{m:0}')
  })

  test('a moved block stays in base when a later base part shares its selector', () => {
    const css = '@media (width>=767px){.same{m:0}}.same{color:blue}'

    const { base, tiers, guarded } = splitComponentSheet(css)

    // Reordering the media block after `.same` would flip the cascade —
    // the guard keeps it in base and reports the query.
    expect(base).toBe(css)
    expect(tiers).toEqual({})
    expect(guarded).toEqual(['(width>=767px)'])
  })

  test('empty tiers collapse — mobile-only content defines no tablet/desktop keys', () => {
    const css = '.a{x:0}@media (width>=375px){.b{m:0}}'
    const { tiers } = splitComponentSheet(css)

    expect(Object.keys(tiers)).toEqual(['mobile'])
    expect(tiers.mobile).toContain('.b{m:0}')
  })

  test('sheets with no media rules return untouched base and no tiers', () => {
    const css = '.a{x:0}.b{y:1}'
    const { base, tiers, print } = splitComponentSheet(css)

    expect(base).toBe(css)
    expect(tiers).toEqual({})
    expect(print).toBe('')
  })

  test('@media print and @page parts move to the print bucket in source order', () => {
    const css =
      '.a{x:0}' +
      '@page{margin:1cm}' +
      '@media print{.p{m:0}}' +
      '@media (width>=767px){.d{m:0}}' +
      '@media print{.q{m:0}}'

    const { base, tiers, print } = splitComponentSheet(css)

    expect(base).toBe('.a{x:0}')
    expect(print).toBe('@page{margin:1cm}@media print{.p{m:0}}@media print{.q{m:0}}')
    expect(tiers.tablet).toContain('.d{m:0}')
    expect(tiers.tablet).not.toContain('.p{m:0}')
    expect(base).not.toContain('@media print')
  })

  test('a print part stays in base when a later base part shares its selector', () => {
    const css = '@media print{.same{m:0}}.same{color:blue}'

    const { base, print, guarded } = splitComponentSheet(css)

    // Moving the block to the lazily-adopted print sheet would put it
    // after `.same` — flipping the tie on paper — so the guard keeps it.
    expect(base).toBe(css)
    expect(print).toBe('')
    expect(guarded).toEqual(['print'])
  })

  test('a print part stays in base when a later width-tier block shares its selector', () => {
    const css = '@media print{.same{m:0}}@media (width>=767px){.same{m:1}}'

    const { base, tiers, print, guarded } = splitComponentSheet(css)

    // The print sheet adopts after every width tier — moving both would
    // put the media block after the print rule it originally followed.
    // Keeping only the print block in base preserves the source order.
    expect(base).toBe('@media print{.same{m:0}}')
    expect(print).toBe('')
    expect(tiers.tablet).toContain('.same{m:1}')
    expect(guarded).toEqual(['print'])
  })

  test('compound print queries stay in base like other non-pure media', () => {
    const css = '.a{x:0}@media print and (color){.q{m:0}}'
    const { base, print } = splitComponentSheet(css)

    expect(base).toBe(css)
    expect(print).toBe('')
  })
})

describe('scssTiersPlugin.resolveId — ?tiers flag ownership', () => {
  const plugin = scssTiersPlugin()

  // Vite binds plugin hooks with the plugin context — resolveId only
  // uses this.resolve, so an echo resolver is the whole contract.
  const ctx = (echo) => ({ resolve: async (spec) => (echo ? { id: spec } : null) })

  test('claims the authored ?tiers suffix form', async () => {
    const id = await plugin.resolveId.call(ctx(true), '/x/nav-icons.scss?tiers', 'i.js')

    expect(id).toBe('\0lk-tiers:/x/nav-icons.scss.tiers.js')
  })

  test('claims an HMR-stamped specifier — ?t=<ts>&tiers', async () => {
    // Dev import-analysis rewrites re-served specifiers with its own
    // timestamp param ahead of the flag — the css pipeline claiming it
    // serves an inject-style module with no `default` export and kills
    // the whole app boot (the nav-icons.scss regression).
    const id = await plugin.resolveId.call(ctx(true), '/x/nav-icons.scss?t=1&tiers', 'i.js')

    expect(id).toBe('\0lk-tiers:/x/nav-icons.scss.tiers.js')
  })

  test('claims ?tiers with trailing params and strips the resolved id query', async () => {
    const id = await plugin.resolveId.call(ctx(true), '/x/a.scss?tiers&t=9', 'i.js')

    expect(id).toBe('\0lk-tiers:/x/a.scss.tiers.js')
  })

  test('resolves the sheet path without any query params', async () => {
    const seen = []
    const spy = {
      resolve: async (spec) => {
        seen.push(spec)
        return { id: spec }
      },
    }

    await plugin.resolveId.call(spy, '/x/a.scss?t=2&tiers&v=3', 'i.js')

    expect(seen).toEqual(['/x/a.scss'])
  })

  test('ignores non-tiers sheets and tiers-less query strings', async () => {
    const cases = ['/x/a.scss', '/x/a.scss?inline', '/x/a-tiers.scss', '/x/a.scss?tiersx']

    for (const c of cases) {
      expect(await plugin.resolveId.call(ctx(true), c, 'i.js')).toBeNull()
    }
  })

  test('unresolvable specs stay unclaimed', async () => {
    expect(await plugin.resolveId.call(ctx(false), '/x/a.scss?tiers', 'i.js')).toBeNull()
  })

  test('virtual:rcss ids resolve into the namespace unchanged', async () => {
    const id = await plugin.resolveId.call(ctx(true), 'virtual:rcss/tablet/x.scss', 'i.js')

    expect(id).toBe('\0lk-tiers:virtual:rcss/tablet/x.scss.tiers.js')
  })
})
