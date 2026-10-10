/**
 * @file module-public.mjs
 * @description Multi-source public-asset merge for the modular workspace.
 * Every module owns its own `public/` folder (website assets + SEO meta,
 * core WASM/worker payloads, earth-playground textures + music). Vite's
 * `publicDir` accepts a single directory, so this plugin fans the module
 * mounts out to their URL prefixes in both modes:
 *   - dev: `configureServer` middlewares serve each mount at its URL prefix;
 *   - build: `closeBundle` copies each mount into `outDir` (skipped for
 *     `build.lib` module bundles, which never carry static payloads).
 * The root site build consumes it so dist/ layout is identical whether the
 * site was built from the root or a module was run standalone.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Repo root — this file sits at shared/build/. */
const REPO = fileURLToPath(new URL('../..', import.meta.url))

/**
 * Module public mounts: `{ dir }` (repo-relative source) → `{ at }` (URL
 * prefix it answers under). Order is irrelevant — the longest prefixes are
 * just connect routes; `'/'` mounts fall through to `next()` on misses.
 */
export const MODULE_PUBLIC_MOUNTS = Object.freeze([
  { dir: 'website/public', at: '/' },
  { dir: 'core/public', at: '/' },
  { dir: 'experiments/earth-playground/public', at: '/experiments/earth-playground' },
  { dir: 'experiments/star-field/public', at: '/experiments/star-field' },
  // Legacy root mount: bundles deployed before the module-public layout
  // request /textures/earth/* and /music/* (no prefix). Serving the same
  // dir at the root keeps stale cached bundles working on dev and on the
  // next deploy instead of falling through to the SPA index.html.
  { dir: 'experiments/earth-playground/public', at: '/' },
])

/** Minimal content-type table for the dev middleware (build copies need none). */
const MIME = {
  '.wasm': 'application/wasm',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
}

/**
 * Connect middleware serving one module `public/` dir at a mount prefix.
 * Misses and path-traversal attempts fall through to `next()`.
 * Implements single-range byte serving (`Accept-Ranges` + `206`) — media
 * elements probe ranges to discover stream duration and to seek; without
 * them Chrome shows only the buffered seconds and never seeks.
 * @param {string} dirAbs Absolute source directory.
 * @returns {import('connect').NextHandleFunction} Static-file handler.
 */
const serveMount = (dirAbs) => (req, res, next) => {
  const rel = path
    .normalize(decodeURIComponent((req.url || '/').split('?')[0]))
    .replace(/^[/\\]+/, '')
  const file = path.join(dirAbs, rel)

  if (!file.startsWith(dirAbs) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return next()

  const size = fs.statSync(file).size

  res.setHeader(
    'Content-Type',
    MIME[path.extname(file).toLowerCase()] || 'application/octet-stream'
  )
  res.setHeader('Accept-Ranges', 'bytes')

  // Single-range form only — `bytes=a-b`, open `a-`, suffix `-b`. A
  // malformed or out-of-file range answers 416 per RFC 9110.
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '')

  if (range && (range[1] !== '' || range[2] !== '')) {
    let start = range[1] === '' ? 0 : parseInt(range[1], 10)
    let end = range[2] === '' ? size - 1 : parseInt(range[2], 10)

    // Suffix form `bytes=-N` — the last N bytes of the file.
    if (range[1] === '') {
      start = Math.max(0, size - end)
      end = size - 1
    }

    end = Math.min(end, size - 1)

    if (start > end || start >= size) {
      res.statusCode = 416
      res.setHeader('Content-Range', `bytes */${size}`)
      res.end()
      return
    }

    res.statusCode = 206
    res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
    res.setHeader('Content-Length', end - start + 1)

    if (req.method === 'HEAD') {
      res.end()
      return
    }

    fs.createReadStream(file, { start, end }).pipe(res)
    return
  }

  res.setHeader('Content-Length', size)

  if (req.method === 'HEAD') {
    res.end()
    return
  }

  fs.createReadStream(file).pipe(res)
}

/**
 * Vite plugin merging every module `public/` into the served/built site.
 * @param {object} [opts] Options.
 * @param {boolean} [opts.copy] Force-copy into outDir on build (default: only
 *   when the resolved config is not a `build.lib` bundle).
 * @returns {import('vite').Plugin} The plugin instance.
 */
export const modulePublicPlugin = (opts = {}) => {
  let resolved = null

  return {
    name: 'module-public-mounts',
    configResolved(config) {
      resolved = config
    },
    configureServer(server) {
      // Registered synchronously = PRE-internal middlewares. The mounts
      // must answer before vite's SPA html-fallback does — a post-internal
      // registration lets `/scripts/workers/wasm-worker.js` fall through
      // to index.html (200 text/html), which silently breaks every
      // `new Worker(...)` call. Misses and traversals still `next()`.
      for (const { dir, at } of MODULE_PUBLIC_MOUNTS) {
        const abs = path.join(REPO, dir)

        if (fs.existsSync(abs)) server.middlewares.use(at, serveMount(abs))
      }
    },
    closeBundle() {
      // Library bundles (moduleConfig builds) never carry public payloads —
      // unless the caller forces it (e.g. a standalone experiment build).
      if (!resolved || (resolved.build?.lib && !opts.copy)) return

      const outDir = resolved.build?.outDir
        ? path.resolve(resolved.root, resolved.build.outDir)
        : null

      if (!outDir) return

      for (const { dir, at } of MODULE_PUBLIC_MOUNTS) {
        const abs = path.join(REPO, dir)

        if (!fs.existsSync(abs)) continue

        fs.cpSync(abs, path.join(outDir, at.replace(/^\/+|\/+$/g, '')), { recursive: true })
      }
    },
  }
}
