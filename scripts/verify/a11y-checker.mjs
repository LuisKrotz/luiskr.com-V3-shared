#!/usr/bin/env node
/**
 * @file scripts/verify/a11y-checker.mjs — IBM Equal Access
 * accessibility-checker pass over every emitted page in dist/.
 *
 * The checker drives real headless Chrome via puppeteer, so custom
 * elements render and shadow DOM is fully evaluated — this is the
 * production-DOM complement to the happy-dom axe governance suite
 * (shared/tests/governance/axe-scan.test.js).
 *
 * Flow: walks dist for index.html files → serves dist on a loopback
 * port (file:// can't execute module scripts or fetch in headless
 * Chrome) → getCompliance per page → consolidated JSON summary at
 * experiments/docs/reports/a11y-checker.json (bundled into
 * dist/deploy-info by deploy-info.mjs like the axe report) plus the
 * checker's own artifacts under reports/accessibility/.
 *
 * AAA posture: failLevels covers `violation`, `potentialviolation` AND
 * `recommendation` (IBM's ruleset folds WCAG 2.x A/AA plus the
 * AAA-detectable rules); only `manual` prompts are informational. Any
 * finding matching failLevels exits non-zero unless it is covered by
 * the reviewed baseline.
 *
 * Usage:
 *   yarn a11y                — canonical surface: every EN route, docs
 *                              section landings, plus bounded samples of
 *                              the mechanical fan-out (star-field
 *                              dossiers, portfolio tour pages, docs
 *                              per-source pages share one template —
 *                              scanning thousands of near-identical
 *                              pages buys nothing). Locale trees are
 *                              skipped: they are template translations
 *                              of the same DOM shapes; /cms is excluded
 *                              (auth-gated admin surface, not public).
 *   yarn a11y --all          — every emitted page incl. locales + cms
 *                              (hours — CI/deep pass)
 *   yarn a11y --paths=about,portfolio/melissa — explicit routes
 *   yarn a11y --jobs=8       — parallel page workers (default: cores-2,
 *                              capped at 10; each worker drives its own
 *                              Chrome tab → own renderer process)
 *   yarn a11y --write-baseline — record the current findings as the
 *                                reviewed baseline (see BASELINE below)
 *
 * Baseline: IBM splits findings into violation (confirmed fail),
 * potentialviolation (needs human verification), and recommendation /
 * manual (informational). Recommendations gate too — accepted ones are
 * baselined like potentials. Some potentials are unfixable-by-design —
 * the engine cannot resolve colors across shadow boundaries (every
 * shadow-DOM text node reports "both detected as #000000"), asks for
 * visible labels on intentionally icon-only controls, or asks to verify
 * captions on muted ambient videos. Those are reviewed once and recorded
 * in experiments/docs/reports/a11y-baseline.json (per-route
 * ruleId+path-shape+ordinal fingerprints). The gate still fails on
 * every finding that is NOT in the baseline — so any new violation OR
 * new potential blocks, and nothing is silently suppressed: removing a
 * baselined element leaves a stale fingerprint that is flagged in the
 * report for cleanup but does not fail the run.
 */

import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCompliance, setConfig, close } from 'accessibility-checker'
import puppeteer from 'puppeteer'
import {
  CMS_PATH_RE,
  CMS_SECURITY_HEADERS,
  SITE_SECURITY_HEADERS,
} from '../serve/security-headers.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const DIST_DIR = path.join(ROOT, 'dist')
const REPORT_DIR = path.join(ROOT, 'experiments', 'docs', 'reports')
const SUMMARY_FILE = path.join(REPORT_DIR, 'a11y-checker.json')
const BASELINE_FILE = path.join(REPORT_DIR, 'a11y-baseline.json')
const ARTIFACT_DIR = path.join(ROOT, 'reports', 'accessibility')

/** Levels that gate the run when not covered by the reviewed baseline. */
const GATING_LEVELS = new Set(['violation', 'potentialviolation', 'recommendation'])

/**
 * Review granularity for one route's baseline entry: `{ruleId: count}` —
 * the set of potential-violation/recommendation rules a human reviewed on
 * that route (count kept for the report, not for gating). Element-path
 * fingerprints proved unusable: portfolio/playground pages render a
 * different DOM depth every run (media ladder rungs, HUD rows, lazy
 * reveals), so the same verified issue re-flags at shifted paths forever.
 * The reviewable subject is the RULE — "all text_contrast_sufficient
 * prompts on this route are engine artifacts", signed off in the CMS
 * report. A rule never seen on the route still fails the gate.
 * Legacy formats convert on read: `key|ordinal` arrays and `{key: n}`
 * maps collapse to their ruleId set.
 * @param {object|Array<string>|undefined} entry raw baseline entry
 * @returns {Set<string>} reviewed ruleIds for the route
 */
const baselineRoute = (entry) => {
  const out = new Set()

  if (!entry) return out

  if (Array.isArray(entry)) {
    for (const fp of entry) out.add(String(fp).split('|')[0])

    return out
  }

  for (const k of Object.keys(entry)) out.add(k.split('|')[0])

  return out
}

/** MIME table for the loopback dist server — only what emitted pages load. */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.onnx': 'application/octet-stream',
  '.br': 'application/octet-stream',
  '.gz': 'application/gzip',
}

/**
 * Recursively collects emitted pages — every directory holding an
 * index.html is a servable route (dist is fully prerendered per route
 * and per locale).
 * @param {string} dir - directory to walk
 * @returns {string[]} route paths relative to dist ('/about/' style)
 */
const collectRoutes = (dir) => {
  const routes = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const sub = path.join(dir, entry.name)

    if (fs.existsSync(path.join(sub, 'index.html'))) {
      routes.push(`/${path.relative(DIST_DIR, sub).replaceAll('\\', '/')}/`)
    }

    routes.push(...collectRoutes(sub))
  }

  return routes
}

/**
 * Mechanical fan-out generators: the star-field dossier pages and the
 * per-screenshot portfolio tour pages all instantiate one template with
 * different copy — a bounded sample covers the accessibility surface
 * without an hours-long scan. Same for the docs portal's per-source-file
 * pages (one page per repo file).
 */
const EN_FANOUT_RE = [
  /^\/star-field-experiment\/[^/]+\/$/, // ~130 celestial-body dossiers
  /^\/portfolio\/[^/]+\/[^/]+\/$/, // per-screenshot tour pages
]

/** Deeper-than-section-landing docs portal pages (one page per repo file). */
const DOCS_DEEP_RE = /^\/docs\/.+\/[^/]+\/$/

/**
 * Canonical exclusions: `/<loc>/…` locale trees and the `/langs/<loc>/`
 * mirror are template translations of the EN surface — same DOM shapes,
 * different copy — and `/cms/…` is the auth-gated admin shell, not part
 * of the public accessibility surface.
 */
const EXCLUDED_RE = [/^\/[a-z]{2,3}\//, /^\/langs\//, /^\/cms(?:\/|$)/]

/** Routes per fan-out family kept for the canonical scope. */
const FANOUT_SAMPLE = 3

/**
 * Picks the canonical scan surface — English routes only, CMS excluded:
 * - every EN route scans, except fan-out families which contribute
 *   a small deterministic sample (first N per family)
 * - docs portal depth-2 landings always scan; deeper per-source pages
 *   contribute a sample
 * @param {string[]} routes every emitted route
 * @returns {string[]} canonical routes to scan
 */
const canonicalRoutes = (routes) => {
  const picked = []
  const sampled = new Map()

  const takeSample = (family) => {
    const seen = sampled.get(family) || 0

    sampled.set(family, seen + 1)

    return seen < FANOUT_SAMPLE
  }

  for (const r of routes) {
    if (EXCLUDED_RE.some((re) => re.test(r))) continue

    if (DOCS_DEEP_RE.test(r)) {
      if (takeSample('docs')) picked.push(r)

      continue
    }

    const fanout = EN_FANOUT_RE.find((re) => re.test(r))

    if (fanout ? takeSample(String(fanout)) : true) picked.push(r)
  }

  return picked
}

/** Starts the loopback static server for dist/. Resolves with {server, base}. */
const serveDist = () =>
  new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
        const rel = urlPath.replace(/^\/+/, '')
        let file = path.join(DIST_DIR, rel)

        if (!file.startsWith(DIST_DIR)) {
          res.writeHead(403).end()

          return
        }

        if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
          file = path.join(file, 'index.html')
        }

        if (!fs.existsSync(file)) {
          res.writeHead(404).end()

          return
        }

        res.writeHead(200, {
          'Content-Type': MIME[path.extname(file)] || MIME['.br'],
          // Match prod: the scan must evaluate the page under the same
          // crossOriginIsolated context the deployed headers create.
          ...(CMS_PATH_RE.test(urlPath) ? CMS_SECURITY_HEADERS : SITE_SECURITY_HEADERS),
        })
        fs.createReadStream(file).pipe(res)
      } catch {
        res.writeHead(500).end()
      }
    })

    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }))
  })

const main = async () => {
  if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    console.error('[a11y] dist/index.html missing — run `yarn build` first')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  const all = args.includes('--all')
  const writeBaseline = args.includes('--write-baseline')
  const pathsArg = args.find((a) => a.startsWith('--paths='))
  const jobsArg = args.find((a) => a.startsWith('--jobs='))

  // Parallel workers = independent headless tabs; each tab runs in its
  // own Chrome renderer process, so the pool spreads rule evaluation
  // across CPU cores (the DOM scan is CPU-bound JS in-page — an NPU is
  // an ML accelerator and cannot execute it). Default leaves headroom
  // for the dev box; --jobs overrides.
  const jobs = jobsArg
    ? Math.max(1, parseInt(jobsArg.slice('--jobs='.length), 10) || 1)
    : Math.max(2, Math.min(10, (os.availableParallelism?.() || os.cpus().length) - 2))

  // Bare paths in --paths normalize to '/<route>/' — a leading-slash list
  // gets path-converted to C:/… by MSYS/Git-Bash before node ever sees
  // it, so unrecognized entries suffix-match the canonical route list
  // ('C:/Program Files/Git/portfolio/x' → '/portfolio/x/').
  const canonical = canonicalRoutes(collectRoutes(DIST_DIR))

  const routes = pathsArg
    ? pathsArg
        .slice('--paths='.length)
        .split(',')
        .filter(Boolean)
        .map((r) => {
          const clean = r.replace(/^\/+|\/+$/g, '')
          const route = clean === '' || clean === 'index' ? '/' : `/${clean}/`

          if (canonical.includes(route) || all) return route

          const match = canonical.find((c) => route.replace(/\\/g, '/').endsWith(c))

          if (!match) console.warn(`[a11y] ignoring unknown --paths entry: ${r}`)

          return match || null
        })
        .filter(Boolean)
    : all
      ? collectRoutes(DIST_DIR)
      : canonical

  if (!routes.length) {
    console.error('[a11y] no emitted pages found in dist/')
    process.exit(1)
  }

  // Stale per-page artifacts (from a killed or differently-scoped run)
  // otherwise linger in the report folder and read as current findings.
  fs.rmSync(ARTIFACT_DIR, { recursive: true, force: true })
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true })

  await setConfig({
    ruleArchive: 'latest',
    policies: ['IBM_Accessibility'],
    failLevels: [...GATING_LEVELS],
    reportLevels: ['violation', 'potentialviolation', 'recommendation', 'manual'],
    outputFormat: ['json'],
    outputFolder: path.relative(process.cwd(), ARTIFACT_DIR) || ARTIFACT_DIR,
    outputFilenameTimestamp: false,
    captureScreenshots: false,
    headless: true,
  })

  // Reviewed-finding baseline — see the file header for the contract.
  const baseline = fs.existsSync(BASELINE_FILE)
    ? JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'))
    : {}

  const { server, port } = await serveDist()
  const base = `http://127.0.0.1:${port}`

  // Drive our own browser + worker pages instead of handing the checker
  // a URL: the checker's own navigation resolves on `load`, which scans
  // the document mid-boot — intro loader still covering the page,
  // DrawText chars still at opacity:0, media ladder not settled.
  // Passing a Page (getCompliance accepts Puppeteer/Playwright/Selenium
  // drivers and runs checker.check(document) directly on it) lets us
  // wait for the real settled state first. The route queue is shared
  // across `jobs` pages — each tab is its own renderer process, so the
  // CPU-bound rule evaluation genuinely parallelizes.
  const browser = await puppeteer.launch({ headless: true })

  const pages = []
  const queue = [...routes]

  const worker = async () => {
    const page = await browser.newPage()

    await page.setViewport({ width: 1366, height: 900 })

    while (queue.length) {
      const route = queue.shift()
      const label = route === '/' ? 'index' : route.replaceAll('/', '_')
      const url = `${base}${route}`

      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 })

        // Settle: the boot veil lifts when the app finishes mounting —
        // that is the state a real user (and Readability) sees. Bounded
        // wait: a page that never finishes boots still gets scanned.
        // .intro-loader is the app shell veil; .sp-loader/.sf-loader are
        // the playground-engine veils — all three self-remove after a
        // fade-out, and sampling one mid-fade reports its ghosted boot
        // text at a fractional opacity as a bogus contrast violation.
        await page
          .waitForFunction(
            () =>
              !document.querySelector('.intro-loader') &&
              !document.querySelector('.sp-loader') &&
              !document.querySelector('.sf-loader'),
            { timeout: 60000 }
          )
          .catch(() => {})

        // One more beat for fonts/media ladder to land post-mount.
        await new Promise((r) => setTimeout(r, 1200))

        // Scroll through the page once so viewport-triggered reveals
        // fire for below-the-fold content — draw-text chars with
        // trigger=viewport stay at opacity:0 until their section enters
        // the viewport, and sampling never-revealed text reports bogus
        // contrast failures (and invisible-but-focusable anchors lose
        // their accessible name in the checker's visibility-gated
        // acc-name calc). Step ≈ 80% of the viewport, then return to
        // the top for the scan. Views also scroll inside their own
        // overflow containers — window scrolling alone never intersects
        // that content, so each scrollable element (incl. inside open
        // shadow roots) gets its own pass.
        await page.evaluate(async () => {
          const settle = (ms) => new Promise((r) => setTimeout(r, ms))
          const step = window.innerHeight * 0.8

          for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
            window.scrollTo(0, y)

            await settle(120)
          }

          window.scrollTo(0, 0)

          const scrollables = []

          const walk = (root) => {
            for (const el of root.querySelectorAll('*')) {
              if (el.shadowRoot) walk(el.shadowRoot)

              if (
                el.scrollHeight > el.clientHeight + 40 &&
                ['auto', 'scroll'].includes(getComputedStyle(el).overflowY)
              ) {
                scrollables.push(el)
              }
            }
          }

          walk(document)

          for (const el of scrollables) {
            const innerStep = el.clientHeight * 0.8 || step

            for (let y = 0; y <= el.scrollHeight - el.clientHeight; y += innerStep) {
              el.scrollTop = y

              await settle(60)
            }

            el.scrollTop = 0
          }
        })

        // The scroll pass only *triggers* viewport reveals — the component
        // drops --pending after onScrollStop + rAF + animation start, so a
        // bounded wait lets the class flip before measuring. Hidden
        // content that never intersects times out and scans as-is. The
        // wait must also cover --visible: that's the animating state, and
        // chars sampled mid-fade report a bogus sub-4.5:1 contrast (a
        // transition's midpoint is not a state a user reads). Only
        // --done — plain text, opacity 1 — is the honest scan target.
        // Both flags live inside the draw-text shadow root, so the
        // predicate walks open shadows (document.querySelector can't).
        // 30s bound: under 8-way CPU contention a late lazy mount +
        // staggered char delays can exceed a tighter budget.
        await page
          .waitForFunction(
            () => {
              const anyUnsettled = (root) => {
                if (
                  root.querySelector('.draw-text--pending') ||
                  root.querySelector('.draw-text--visible')
                )
                  return true

                for (const el of root.querySelectorAll('*')) {
                  if (el.shadowRoot && anyUnsettled(el.shadowRoot)) return true
                }

                return false
              }

              return !anyUnsettled(document)
            },
            { timeout: 30000 }
          )
          .catch(() => {})

        // Last-chance loader recheck — under parallel load the first
        // bounded wait can lapse while a veil is still fading.
        await page
          .waitForFunction(
            () =>
              !document.querySelector('.intro-loader') &&
              !document.querySelector('.sp-loader') &&
              !document.querySelector('.sf-loader'),
            { timeout: 30000 }
          )
          .catch(() => {})

        // Fast-forward finite CSS animations to their end state: legal
        // pages stagger draw-text chars with multi-second --offsets, and
        // pixel-sampling a char mid-fade reports a bogus sub-4.5:1
        // contrast ratio. The settled DOM — every reveal at 100% — is the
        // honest state to measure. Document.getAnimations() does NOT
        // traverse shadow roots, so walk open shadow roots explicitly
        // (draw-text, view-legal, app-nav all live in one); infinite
        // loops (star field) are skipped via the endTime guard.
        // Runs after the last long wait: reveals triggered during the
        // settle waits start fresh animations that must also be finished.
        await page.evaluate(() => {
          const finishAll = (root) => {
            for (const a of root.getAnimations({ subtree: true })) {
              const end = a.effect?.getComputedTiming?.().endTime

              if (typeof end === 'number' && Number.isFinite(end)) a.currentTime = end

              a.pause?.()
            }

            // Same class of intervention as the fast-forward — normalize
            // lingering draw-text states to the settled contract:
            // --pending/--visible → --done and chars at full opacity with
            // the CSS animation killed (a running animation overrides an
            // inline opacity, so removing it is what makes the settled
            // state stick when the wait lapsed under contention).
            for (const t of root.querySelectorAll('.draw-text--pending, .draw-text--visible')) {
              t.classList.remove('draw-text--pending', 'draw-text--visible')
              t.classList.add('draw-text--done')
            }

            for (const c of root.querySelectorAll('.draw-text__char')) {
              c.style.animation = 'none'
              c.style.opacity = '1'
            }

            for (const el of root.querySelectorAll('*')) {
              if (el.shadowRoot) finishAll(el.shadowRoot)
            }
          }

          finishAll(document)
        })

        await new Promise((r) => setTimeout(r, 200))

        const { report } = await getCompliance(page, label)
        const results = report?.results || []
        const counts = { violation: 0, potentialviolation: 0, recommendation: 0, manual: 0 }
        const reviewed = baselineRoute(baseline[route])

        for (const r of results) {
          const level = String(r.level || '').toLowerCase()

          if (level in counts) counts[level] += 1
        }

        // Violations are engine-confirmed defects — never baselined, they
        // always fail the gate. Potential violations/recommendations are
        // verify-prompts: they pass when the rule was reviewed on this
        // route, so only a previously-unseen rule class blocks.
        const fresh = results.filter(
          (f) =>
            String(f.level || '').toLowerCase() === 'violation' ||
            (GATING_LEVELS.has(String(f.level || '').toLowerCase()) && !reviewed.has(f.ruleId))
        )

        const pageResult = { route, ...counts, gated: fresh.length, findings: results }

        pages.push(pageResult)

        console.log(
          `[a11y] ${route} — violation:${counts.violation} potential:${counts.potentialviolation} rec:${counts.recommendation} new:${fresh.length}`
        )
      } catch (e) {
        pages.push({ route, error: String(e?.message || e) })
        console.warn(`[a11y] ${route} — scan failed: ${e?.message || e}`)
      }
    }

    await page.close()
  }

  try {
    console.log(`[a11y] scanning ${routes.length} routes across ${jobs} workers`)

    await Promise.all(Array.from({ length: Math.min(jobs, routes.length) }, worker))

    // Deterministic report order — workers interleave by completion, the
    // report keeps canonical route order.
    pages.sort((a, b) => routes.indexOf(a.route) - routes.indexOf(b.route))
  } finally {
    await close()
    await browser.close()
    server.close()
  }

  const failed = pages.some((p) => p.error || p.gated > 0)

  fs.mkdirSync(REPORT_DIR, { recursive: true })

  const totals = pages.reduce(
    (t, p) => {
      for (const k of Object.keys(t)) t[k] += p[k] || 0

      return t
    },
    { violation: 0, potentialviolation: 0, recommendation: 0, manual: 0, gated: 0, errors: 0 }
  )

  totals.errors = pages.filter((p) => p.error).length

  fs.writeFileSync(
    SUMMARY_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        engine: 'accessibility-checker (IBM Equal Access)',
        policy: 'IBM_Accessibility',
        gatingLevels: [...GATING_LEVELS],
        pages: pages.length,
        totals,
        results: pages.map(({ findings, ...p }) => ({
          ...p,
          findings: (findings || []).map((f) => ({
            ruleId: f.ruleId,
            level: f.level,
            message: f.message,
            xpath: f.path?.dom || f.xpath,
            snippet: f.snippet,
          })),
        })),
      },
      null,
      2
    )
  )

  if (writeBaseline) {
    // Record the reviewed baseline — per route, the set of verify-prompt
    // rules a human signed off in the CMS report (count kept for the
    // report). Violations are never recorded: they are confirmed defects
    // and must always be fixed, never baselined. The write UNIONS into
    // the existing baseline rather than replacing it — a reviewed rule
    // doesn't become un-reviewed because a later run happened to render
    // less dynamic content; each run only ADDS newly-seen rules.
    const out = {}

    for (const p of pages) {
      const routeMap = {
        ...(baseline[p.route] && !Array.isArray(baseline[p.route]) ? baseline[p.route] : {}),
      }

      for (const f of p.findings || []) {
        const level = String(f.level || '').toLowerCase()

        if (level === 'potentialviolation' || level === 'recommendation') {
          routeMap[f.ruleId] = (routeMap[f.ruleId] || 0) + 1
        }
      }

      // Legacy array/map entries fold their ruleIds in too.
      if (baseline[p.route]) {
        for (const ruleId of baselineRoute(baseline[p.route])) {
          routeMap[ruleId] ??= 0
        }
      }

      out[p.route] = routeMap
    }

    fs.writeFileSync(BASELINE_FILE, JSON.stringify(out, null, 2))
    console.log(`[a11y] baseline written → ${path.relative(ROOT, BASELINE_FILE)}`)
  }

  console.log(`[a11y] ${pages.length} pages scanned — report: ${path.relative(ROOT, SUMMARY_FILE)}`)
  console.log(`[a11y] totals: ${JSON.stringify(totals)}`)

  if (failed) {
    console.error('[a11y] FAIL — unreviewed violations/potential violations or scan errors')
    process.exit(1)
  }

  console.log('[a11y] PASS — zero unreviewed findings across all pages')
}

main().catch((e) => {
  console.error(`[a11y] fatal: ${e?.message || e}`)
  process.exit(1)
})
