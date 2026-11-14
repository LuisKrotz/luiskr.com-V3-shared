/**
 * @file browser-loader.js
 * @description Runtime bundle dispatcher, inlined into dist/index.html by
 * scripts/build-targets.mjs. Written in strict ES5 — it must parse on the
 * oldest engines it detects (including IE-era parsers).
 *
 * Boot sequence:
 *   1. Feature ladder — walks build/es-targets.mjs tests newest→oldest.
 *      Module builds additionally require `type=module` AND dynamic import()
 *      support; engines that fail every probe (pre-iOS 16 / pre-ES2022)
 *      get the "needs a newer browser" notice instead.
 *   2. Polyfill gates — each polyfill group is fetched ONLY when its guard
 *      API is actually missing. Modern browsers fetch zero polyfills.
 *   3. Tier assets — injects the tier's stylesheet, then the bundle
 *      (type=module or classic IIFE) once polyfills have executed.
 *
 * window.__LK is the injected manifest:
 *   { targets: [{name, js, css, module, tests:[str]}],
 *     polys:   [{name, file, guard}],
 *     order:   [poly names in load order] }
 */
;(function () {
  'use strict'

  var LK = window.__LK
  if (!LK || !LK.targets || !LK.targets.length) return

  /** Evaluates a feature probe; a thrown parse/runtime error = unsupported. */
  function probe(code) {
    try {
      return !!new Function('return (' + code + ')')()
    } catch (e) {
      void e
      return false
    }
  }

  /** Native ES module support (IE/EdgeHTML and pre-Chrome-61 lack it). */
  function supportsModule() {
    return 'noModule' in document.createElement('script')
  }

  /** Dynamic import() — Safari ≤11.0 / Edge ≤18 have modules but no import().
   *  Compile-only probe: executing the import could hit CSP script-src, so we
   *  only check that the syntax parses. */
  function supportsImport() {
    try {
      new Function('return import("x")')
      return true
    } catch (e) {
      void e
      return false
    }
  }

  /**
   * UA identification — the manifest's `browsers` list is ordered
   * most-specific-first (Samsung Internet / Edge / Opera all claim Chrome;
   * every modern UA claims Safari). Result is exposed to the app as
   * `window.__LK_BROWSER` and to stylesheets as `data-browser` /
   * `data-browser-major` on <html> so engine quirks never get re-sniffed.
   */
  function detectBrowser() {
    var ua = (navigator && navigator.userAgent) || ''
    var specs = LK.browsers || []
    var i, m

    for (i = 0; i < specs.length; i++) {
      m = ua.match(new RegExp(specs[i].pattern))
      if (m)
        return {
          name: specs[i].name,
          major: parseInt(m[1], 10) || 0,
          quirks: specs[i].quirks || {},
        }
    }

    return { name: 'other', major: 0, quirks: {} }
  }

  /**
   * Applies the detected engine's quirks: datasets for CSS hooks plus the
   * `__LK_BROWSER` hint bag the runtime consults (webgpu:false skips a
   * doomed WebGPU init, lowGpu lets renderers start at reduced scale).
   */
  function applyBrowserHints() {
    var b = detectBrowser()
    var html = document.documentElement

    if (html && html.setAttribute) {
      html.setAttribute('data-browser', b.name)
      html.setAttribute('data-browser-major', String(b.major))
    }

    var hints = { name: b.name, major: b.major }
    var q = b.quirks
    var k

    for (k in q) if (Object.prototype.hasOwnProperty.call(q, k)) hints[k] = q[k]

    window.__LK_BROWSER = hints
  }

  /** Picks the newest tier whose probes all pass. */
  function pickTier() {
    var canModule = supportsModule()
    var canImport = canModule && supportsImport()
    var i, j, t, ok
    for (i = 0; i < LK.targets.length; i++) {
      t = LK.targets[i]
      if (t.module && !canImport) continue
      ok = true
      for (j = 0; j < t.tests.length; j++) {
        if (!probe(t.tests[j])) {
          ok = false
          break
        }
      }
      if (ok) return t
    }
    return null
  }

  /** Collects polyfills whose guard APIs are missing, in declared order. */
  function neededPolyfills() {
    var missing = {}

    var out = []

    var i

    // Pass 1 — probe every polyfill's guard API once.
    for (i = 0; i < LK.polys.length; i++) {
      missing[LK.polys[i].name] = !probe(LK.polys[i].guard)
    }

    // Pass 2 — emit the missing ones in the manifest's load order
    // (dependencies between fills are the manifest's concern).
    for (i = 0; i < LK.order.length; i++) {
      var name = LK.order[i]

      if (missing[name]) {
        for (var j = 0; j < LK.polys.length; j++) {
          if (LK.polys[j].name === name) out.push(LK.polys[j].file)
        }
      }
    }

    return out
  }

  /** Injects a classic script; calls back when it has executed. */
  function loadScript(src, done) {
    var s = document.createElement('script')
    s.src = src
    s.async = false
    s.onload = function () {
      done()
    }
    s.onerror = function () {
      done()
    }
    document.head.appendChild(s)
  }

  /** Chains polyfill scripts so each executes before the next is fetched. */
  function loadPolyfills(files, done) {
    if (!files.length) {
      done()
      return
    }
    loadScript(files[0], function () {
      loadPolyfills(files.slice(1), done)
    })
  }

  /** Appends the tier stylesheet to <head>; returns the node for upgrades. */
  function injectCss(href) {
    var l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = href
    document.head.appendChild(l)
    return l
  }

  /**
   * Appends the extracted print sheet — `media="print"` makes it inert to
   * the screen cascade, so browsers fetch it at the lowest priority and it
   * never joins render-blocking CSSOM construction. It is positioned after
   * the screen sheet, matching the source order where print rules sat last.
   */
  function injectPrintCss(href) {
    var l = document.createElement('link')
    l.rel = 'stylesheet'
    l.media = 'print'
    l.href = href
    document.head.appendChild(l)
    return l
  }

  /**
   * Width-class gates, evaluated widest → narrowest against
   * `matchMedia('(min-width:Npx)')`. The manifest's tier.css map is
   * cumulative — `tablet` contains base + mobile + tablet blocks — so the
   * FIRST matching gate names the only sheet the viewport needs; a
   * viewport too narrow for every gate still gets `mobile` (the minimal
   * file carrying base).
   * Gates mirror shared/build/css-classes.mjs WIDTH_CLASSES.gate.
   */
  var CSS_GATES = [
    ['wide', '(min-width:2559px)'],
    ['desktop', '(min-width:1279px)'],
    ['tablet', '(min-width:767px)'],
  ]

  /** Picks the cumulative sheet name for the current viewport class. */
  function pickCssName() {
    var i

    if (!window.matchMedia) return 'wide'
    for (i = 0; i < CSS_GATES.length; i++) {
      if (window.matchMedia(CSS_GATES[i][1]).matches) return CSS_GATES[i][0]
    }

    return 'mobile'
  }

  /**
   * Watches the gates ABOVE the served class: on an upward cross the
   * cumulative superset sheet is appended (cumulative files are nested
   * supersets, so relative order between them never matters) and, once it
   * is live, every still-present NARROWER link drops — no unstyled gap.
   * Wider links are never removed: a shrink leaves their now-inert media
   * blocks in place, so a re-grow needs no refetch.
   */
  function watchCssGrowth(css, link) {
    var gates = {
      tablet: '(min-width:767px)',
      desktop: '(min-width:1279px)',
      wide: '(min-width:2559px)',
    }
    var rank = { mobile: 0, tablet: 1, desktop: 2, wide: 3 }
    var links = {}
    var k

    // matchMedia-less engines already got the wide sheet — nothing to grow into.
    if (!window.matchMedia) return

    links[link._lkClass] = link

    function arm(name) {
      var mql = window.matchMedia(gates[name])

      function detach() {
        if (mql.removeEventListener) mql.removeEventListener('change', on)
        else if (mql.removeListener) mql.removeListener(on)
      }

      function on() {
        var node, k2

        if (!mql.matches) return
        detach()

        node = document.createElement('link')
        node.rel = 'stylesheet'
        node.href = css[name]
        node._lkClass = name
        node.onload = function () {
          for (k2 in links) {
            if (rank[k2] < rank[name] && links[k2].parentNode) {
              links[k2].parentNode.removeChild(links[k2])
            }
          }
        }
        document.head.appendChild(node)
        links[name] = node
      }

      if (mql.addEventListener) mql.addEventListener('change', on)
      else if (mql.addListener) mql.addListener(on)
    }

    for (k in gates) if (rank[k] > rank[link._lkClass]) arm(k)
  }

  /** Injects the viewport's cumulative sheet and arms its grow watchers. */
  function bootCss(css) {
    var name

    if (!css) return
    if (typeof css === 'string') {
      injectCss(css)
      return
    }

    name = pickCssName()

    var link = injectCss(css[name] || css.mobile)
    link._lkClass = name
    watchCssGrowth(css, link)

    // Print rules ship as their own manifest entry — the media-gated link
    // stays out of the width-class selection path entirely.
    if (css.print) injectPrintCss(css.print)
  }

  /** Graceful notice — reached by engines that fail every tier probe
   *  (below the es2022 floor: pre-iOS 16, legacy Edge, IE). */
  function showFallback() {
    var box = document.createElement('div')
    box.setAttribute(
      'style',
      'font-family:sans-serif;max-width:32em;margin:20vh auto;padding:1em;text-align:center'
    )
    box.innerHTML =
      '<p><strong>Luis Krötz</strong></p><p>This site needs a newer browser — please update Chrome, Edge, Firefox or Safari.</p>'
    var app = document.getElementById('app') || document.body || document.documentElement
    app.appendChild(box)
  }

  /** Boots the selected tier after its polyfills have executed. */
  function boot(tier) {
    // Stamp the picked tier so the app can gate modern-only enhancements
    // (ML/NPU inference) without re-probing: read by core/utils/ml/ort-engine.
    window.__LK_TIER = tier.name
    // The stylesheet is always loader-injected now: the manifest's css map
    // is cumulative width-class files (index-mobile/tablet/desktop/wide) —
    // pickCssName serves the single file covering the current viewport and
    // watchCssGrowth upgrades it on upward breakpoint crosses. String-form
    // css (legacy manifest) still gets a plain single link.
    bootCss(tier.css)
    var s = document.createElement('script')
    if (tier.module) {
      s.type = 'module'
      s.src = tier.js
    } else {
      s.src = tier.js
      s.defer = false
    }
    // This loader runs inside <head> during parsing — document.body does not
    // exist yet. Appending to <head> is equivalent for execution (module
    // scripts defer anyway, classic scripts run on load).
    document.head.appendChild(s)
  }

  // ── Boot sequence ──────────────────────────────────────────────
  // 1. Stamp the engine datasets + hint bag first — every later
  //    stage (CSS hooks, tier gating) reads them.
  applyBrowserHints()

  // 2. Pick the newest tier this engine satisfies.
  var tier = pickTier()

  if (!tier) {
    showFallback()

    return
  }

  // 3. Fetch only the missing polyfills, then boot the tier.
  loadPolyfills(neededPolyfills(), function () {
    boot(tier)
  })
})()
