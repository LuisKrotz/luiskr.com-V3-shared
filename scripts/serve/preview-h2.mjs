/**
 * @file shared/scripts/serve/preview-h2.mjs
 * @description HTTP/2 + brotli static preview for the production build —
 * the serving contract `vite preview` cannot express.
 *
 * Why this exists: `vite preview` is HTTP/1.1-only and always writes raw
 * bytes. Firebase Hosting — the real target — negotiates h2/h3 and serves
 * the build-emitted `.br`/`.gz` siblings directly. Under Lighthouse's
 * Lantern model the difference is not cosmetic: h1 requests serialize over
 * a 6-connection origin pool (each wave pays a full slow-4G RTT) while h2
 * streams multiplex on one connection, so the local gate measured a wire
 * profile no production visitor ever sees. This server mirrors the
 * hosting contract — h2, precompressed siblings, clean-URL 301s, and the
 * shared security headers — so `yarn lhci autorun` audits the same
 * delivery shape Firebase produces.
 *
 * TLS uses the self-signed localhost pair the CMS-auth dev flow already
 * generates (cms/dev/https); Lighthouse runs pass
 * `--ignore-certificate-errors` via lighthouserc settings.chromeFlags.
 */

import { createSecureServer } from 'node:http2'
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CMS_PATH_RE, CMS_SECURITY_HEADERS, SITE_SECURITY_HEADERS } from './security-headers.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = fileURLToPath(new URL('../../../dist', import.meta.url))
const CERT_DIR = fileURLToPath(new URL('../../../cms/dev/https', import.meta.url))
const KEY_FILE = path.join(CERT_DIR, 'localhost-key.pem')
const CERT_FILE = path.join(CERT_DIR, 'localhost.pem')

const PORT = Number(process.env.PORT || process.argv.find((a) => /^\d{4,5}$/.test(a)) || 4173)

/**
 * Content-Types for every artifact class under dist/. Kept local to this
 * script (the same map lives in vite.config.js for the h1 preview plugin);
 * a shared table would couple a server script to the bundler config.
 */
const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.webm': 'video/webm',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
}

/** Generate the self-signed localhost pair on first use (same recipe vite.config uses). */
const ensureCert = () => {
  if (existsSync(CERT_FILE)) return

  mkdirSync(CERT_DIR, { recursive: true })

  execSync(
    'openssl req -x509 -newkey rsa:2048 -nodes ' +
      `-keyout "${KEY_FILE}" -out "${CERT_FILE}" -days 3650 ` +
      '-subj /CN=localhost -addext subjectAltName=DNS:localhost,IP:127.0.0.1',
    { stdio: 'ignore' }
  )
}

/**
 * Resolves a request path to a dist file the way Firebase Hosting does:
 * `/dir/` → `/dir/index.html`. Returns null when nothing matches.
 * @param {string} reqPath Decoded pathname.
 * @returns {string | null} Absolute file path, or null.
 */
const resolveFile = (reqPath) => {
  const candidate = path.join(DIST_DIR, reqPath.endsWith('/') ? `${reqPath}index.html` : reqPath)

  return existsSync(candidate) && statSync(candidate).isFile() ? candidate : null
}

/**
 * Mirrors Firebase Hosting's clean-URL handling — the same rule the
 * `preview-clean-urls` vite plugin encodes for `vite preview`: an
 * extensionless non-trailing-slash path 301s to `<path>/` when that
 * directory index exists on disk.
 * @param {string} reqPath Decoded pathname.
 * @returns {boolean} True when the request should redirect to `${reqPath}/`.
 */
const shouldRedirect = (reqPath) => {
  if (reqPath.length <= 1 || reqPath.endsWith('/')) return false
  if ((reqPath.split('/').pop() || '').includes('.')) return false

  return resolveFile(`${reqPath}/`) !== null
}

const server = () => {
  ensureCert()

  const srv = createSecureServer(
    {
      key: readFileSync(KEY_FILE),
      cert: readFileSync(CERT_FILE),
      allowHTTP1: true,
    },
    (req, res) => {
      const rawUrl = req.url || '/'
      const reqPath = decodeURIComponent(rawUrl.split('?')[0])
      const headers = CMS_PATH_RE.test(reqPath) ? CMS_SECURITY_HEADERS : SITE_SECURITY_HEADERS

      for (const [key, value] of Object.entries(headers)) res.setHeader(key, value)

      if (shouldRedirect(reqPath)) {
        const query = rawUrl.split('?')[1]

        res.writeHead(301, { Location: `${reqPath}/${query ? `?${query}` : ''}` })
        res.end()
        return
      }

      let filePath = resolveFile(reqPath)

      // SPA fallback — same as vite preview / Firebase rewrites: paths
      // without an on-disk file serve the app shell.
      if (!filePath) filePath = resolveFile('/index.html')
      if (!filePath) {
        res.writeHead(404)
        res.end()
        return
      }

      const mime = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
      const accept = req.headers['accept-encoding'] || ''
      const canEncode = !req.headers.range
      const encoding = canEncode
        ? accept.includes('br')
          ? 'br'
          : accept.includes('gzip')
            ? 'gz'
            : null
        : null
      const encodedPath =
        encoding && existsSync(`${filePath}.${encoding}`) ? `${filePath}.${encoding}` : null
      const served = encodedPath || filePath

      res.setHeader('Content-Type', mime)
      res.setHeader('Vary', 'Accept-Encoding')
      res.setHeader('Content-Length', statSync(served).size)

      if (encodedPath) res.setHeader('Content-Encoding', encoding === 'gz' ? 'gzip' : 'br')

      res.writeHead(200)

      if (req.method === 'HEAD') {
        res.end()
        return
      }

      res.end(readFileSync(served))
    }
  )

  srv.listen(PORT, () => {
    // The word "listening" is the contract — lhci's startServerReadyPattern
    // matches on stdout, not on a TCP probe.
    console.log(`preview-h2 listening on https://localhost:${PORT}`)
  })
}

server()
