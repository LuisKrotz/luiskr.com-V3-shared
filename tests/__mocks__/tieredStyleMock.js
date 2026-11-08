/**
 * @file tieredStyleMock.js
 * @description Jest module mock for `?tiers` stylesheet imports — returns
 * the {base, tiers} module shape with an empty base and no lazy tiers so
 * component suites mount without a Sass compile step. The dedicated
 * responsive-css coverage tails drive real tiered objects through
 * BaseComponent directly.
 */
export const base = ''
export default { base, tiers: {} }
