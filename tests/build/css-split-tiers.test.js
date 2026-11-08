/**
 * @file css-split-tiers.test.js
 * @description Unit coverage for the breakpoint stylesheet splitter
 * (shared/build/css-split.mjs + css-classes.mjs): pure min-width media
 * blocks are bucketed into cumulative width-class sheets while every
 * non-pure query and non-media rule stays in base, and the component
 * splitter's base/tiers output reproduces the original cascade.
 */
import { WIDTH_CLASSES, WIDTH_CLASS_NAMES, classForMinWidth } from '@build/css-classes.mjs'
import { splitDocumentSheet, splitComponentSheet } from '@build/css-split.mjs'

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
      expect(sheets[cls]).toContain('.h{m:0}')
    }
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
    const { base, tiers } = splitComponentSheet(css)

    expect(base).toBe(css)
    expect(tiers).toEqual({})
  })
})
