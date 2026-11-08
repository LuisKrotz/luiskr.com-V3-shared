/**
 * @file css-classes.mjs
 * @description Width-class registry — the single build-side source for the
 * breakpoint delivery split. The compiled stylesheet is partitioned into
 * cumulative sheets keyed by these classes, and every consumer (the emit
 * path in scripts/build/build-targets.mjs, the ?tiers vite plugin, the
 * inlined browser loader, and the governance drift test) reads this table
 * so the bucket boundaries can never diverge.
 *
 *   mobile  — pure min-width media queries below the iPad-portrait step
 *             (319/374/413/539px): phones and watches.
 *   tablet  — 767–1278px min-width queries (767/959/1023/1025px): iPad
 *             portrait through small laptop.
 *   desktop — 1279–2558px min-width queries (1279/1281/1439/1559/1679/1919):
 *             HD laptops through FHD desktops.
 *   wide    — ≥2559px min-width queries (2559/3839/5119/7679): 2K–8K.
 *
 * `gate` is the matchMedia `(min-width: Npx)` that first makes the class
 * reachable — it equals the lowest member breakpoint of the class, so a
 * viewport never fetches a cumulative sheet it cannot partially apply.
 */

/** @typedef {{name: string, maxWidth: number, gate: number}} WidthClass */

/**
 * Ordered narrow → wide. Order is load-bearing: cumulative sheets are built
 * by walking this list and matchMedia gates are evaluated wide → narrow.
 * @type {WidthClass[]}
 */
export const WIDTH_CLASSES = [
  { name: 'mobile', maxWidth: 766, gate: 319 },
  { name: 'tablet', maxWidth: 1278, gate: 767 },
  { name: 'desktop', maxWidth: 2558, gate: 1279 },
  { name: 'wide', maxWidth: Number.POSITIVE_INFINITY, gate: 2559 },
]

/** Class names in ascending order — used for manifest + file naming. */
export const WIDTH_CLASS_NAMES = WIDTH_CLASSES.map((c) => c.name)

/**
 * Maps a pure `min-width` breakpoint (px) to the class that owns it. Values
 * below the smallest gate still land in `mobile` — the narrowest class is
 * also the base vehicle for watch-size viewports.
 * @param {number} px min-width breakpoint in px.
 * @returns {string} the owning class name.
 */
export const classForMinWidth = (px) =>
  WIDTH_CLASSES.find((c) => px <= c.maxWidth)?.name ?? WIDTH_CLASS_NAMES[0]

/**
 * Lightningcss `targets` translation shared by the emit path and the ?tiers
 * vite plugin. Vite's cssTarget is an esbuild-style string (`es2022`,
 * `chrome120`, `esnext`); lightningcss wants `{engine: version<<16}`.
 * @param {string|undefined} cssTarget vite `build.cssTarget` value.
 * @returns {object|undefined} lightningcss targets map, or undefined for esnext.
 */
export const lightningcssTargets = (cssTarget) => {
  if (!cssTarget || cssTarget === 'esnext') return undefined

  const m = /^([a-z]+)(\d+)$/.exec(cssTarget)

  if (!m) return undefined

  const version = parseInt(m[2], 10) << 16
  const map = {
    chrome: 'chrome',
    firefox: 'firefox',
    safari: 'safari',
    edge: 'edge',
    ie: 'ie',
    samsung: 'samsung',
    opera: 'opera',
  }
  const engine = map[m[1]]

  return engine ? { [engine]: version } : undefined
}
