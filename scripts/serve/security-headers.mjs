/**
 * @file shared/scripts/serve/security-headers.mjs
 * @description Cross-origin isolation headers shared by every site-facing
 * server (vite dev/preview, the a11y checker's dist server, and — mirrored
 * in firebase.json + desktop/main.mjs — production and the packaged app).
 *
 * `COOP: same-origin` + `COEP: credentialless` qualify the page for
 * `crossOriginIsolated`, which unlocks SharedArrayBuffer → ORT's threaded
 * WASM build (the multi-core inference path). `credentialless` lets the
 * no-cors CDN media (GCS, gravatar, flagcdn) keep loading without CORP
 * headers; `same-origin-allow-popups` does NOT qualify for isolation, so
 * the site uses strict `same-origin` (the site never window.open()s).
 *
 * The CMS is deliberately excluded: its Google-auth popup keeps
 * `same-origin-allow-opener` semantics via `allow-popups` and its
 * third-party auth iframes cannot declare COEP, so /cms keeps the
 * default `unsafe-none` context — behavior identical to before.
 */
export const COOP = 'Cross-Origin-Opener-Policy'

export const COEP = 'Cross-Origin-Embedder-Policy'

export const SITE_COOP_VALUE = 'same-origin'

export const SITE_COEP_VALUE = 'credentialless'

export const CMS_COOP_VALUE = 'same-origin-allow-popups'

export const CMS_COEP_VALUE = 'unsafe-none'

/** Routes that must stay non-isolated (CMS auth iframes + popups). */
export const CMS_PATH_RE = /^\/cms(?:\/|$)/

/** Security headers applied to site routes — the isolation pair. */
export const SITE_SECURITY_HEADERS = {
  [COOP]: SITE_COOP_VALUE,
  [COEP]: SITE_COEP_VALUE,
}

/** Headers applied to CMS routes — keeps popup auth + iframes working. */
export const CMS_SECURITY_HEADERS = {
  [COOP]: CMS_COOP_VALUE,
  [COEP]: CMS_COEP_VALUE,
}

/**
 * Connect-style middleware: stamps the isolation pair on site routes and
 * the popup-preserving opt-out pair on /cms so the two contexts never
 * share a policy.
 * @param req — the incoming request (url is inspected for the /cms prefix)
 * @param res — the outgoing response (headers are set before body write)
 * @param next — calls the next middleware in the stack
 */
export const siteSecurityHeadersMiddleware = (req, res, next) => {
  const pathname = (req.url || '/').split('?')[0]

  const headers = CMS_PATH_RE.test(pathname) ? CMS_SECURITY_HEADERS : SITE_SECURITY_HEADERS

  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value)

  next()
}
