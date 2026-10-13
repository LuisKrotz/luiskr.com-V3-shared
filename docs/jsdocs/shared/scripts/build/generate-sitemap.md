# `shared/scripts/build/generate-sitemap.js`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/build/generate-sitemap.js`                            |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### `sitemapDoc`

or /gdpr are never mistaken for a
// locale prefix and dropped from the English sitemap.
const LOCALE_PREFIX_RE = new RegExp(`^/(${VALID_LANGS.join('|')})(/|$)`)

// Experience path segments (canonical + every localized slug) — used for
// sitemap <priority> so immersive pages rank just under home roots.
const EXPERIENCE_SEGMENTS = new Set()
for (const slugs of Object.values(LANG_SLUGS)) {
EXPERIENCE_SEGMENTS.add(slugs.earthPlayground)
EXPERIENCE_SEGMENTS.add(slugs.starField)
}
EXPERIENCE_SEGMENTS.add('space-playground')

function slugify(text) {
return (text || '')
.toString()
.normalize('NFD')
.replace(/[\u0300-\u036f]/g, '')
.toLowerCase()
.trim()
.replace(/[^a-z0-9]+/g, '-')
.replace(/^-+|-+$/g, '')
}

async function run() {
const base = 'https://luiskr.com'
const urlSet = new Set()

// Root + English home-section anchors (about/contact are localized slugs
// for en too — /about, /contact scroll the home view).
urlSet.add('/')

const enSlugs = LANG_SLUGS.en || {}

for (const key of ['about', 'contact', 'privacy', 'gdpr', 'terms']) {
if (enSlugs[key]) urlSet.add(`/${enSlugs[key]}`)
}

// Earth / Space Playground + Star Field (canonical English segments)
urlSet.add('/earth-playground')
urlSet.add('/space-playground')
urlSet.add('/star-field-experiment')

// Localized routes from LANG_SLUGS — each locale's real slug values,
// plus the English playground/star segments the router also accepts
// under a locale prefix. English-segment legal aliases (e.g.
// /br/privacy-policy) resolve in the router but stay unlisted: the
// localized slug is the canonical crawl target.
for (const lang of VALID_LANGS) {
if (lang === 'en') continue
urlSet.add(`/${lang}`)
urlSet.add(`/${lang}/earth-playground`)
urlSet.add(`/${lang}/space-playground`)
urlSet.add(`/${lang}/star-field-experiment`)
const slugs = LANG_SLUGS[lang]
if (slugs) {
if (slugs.privacy) urlSet.add(`/${lang}/${slugs.privacy}`)
if (slugs.gdpr) urlSet.add(`/${lang}/${slugs.gdpr}`)
if (slugs.terms) urlSet.add(`/${lang}/${slugs.terms}`)
if (slugs.about) urlSet.add(`/${lang}/${slugs.about}`)
if (slugs.contact) urlSet.add(`/${lang}/${slugs.contact}`)
if (slugs.earthPlayground) urlSet.add(`/${lang}/${slugs.earthPlayground}`)
if (slugs.starField) urlSet.add(`/${lang}/${slugs.starField}`)
}
}

// Fetch projects data
let data = {}
try {
const res = await fetch('https://luiskr-com.firebaseio.com/translations/en/projects.json')
data = await res.json()
} catch (err) {
console.error(
'Failed to fetch remote projects, falling back to local translations-full.json',
err
)
if (fs.existsSync('shared/scripts/i18n/translations-full.json')) {
const full = JSON.parse(
fs.readFileSync('shared/scripts/i18n/translations-full.json', 'utf-8')
)
data = full.translations?.en?.projects || {}
}
}

// Portfolio routes & media modal URLs
const projectSlugs = []
for (const [projectSlug, projectData] of Object.entries(data || {})) {
urlSet.add(`/portfolio/${projectSlug}`)
projectSlugs.push(projectSlug)
if (projectData && projectData.sections) {
for (const section of projectData.sections) {
if (Array.isArray(section)) {
for (const item of section) {
if (Array.isArray(item)) {
for (const media of item) {
if (media && typeof media === 'object' && media.label && media.canExpand) {
const mediaSlug = slugify(media.label)
if (mediaSlug) {
urlSet.add(`/portfolio/${projectSlug}/${mediaSlug}`)
}
}
}
} else if (item && typeof item === 'object' && item.label && item.canExpand) {
const mediaSlug = slugify(item.label)
if (mediaSlug) {
urlSet.add(`/portfolio/${projectSlug}/${mediaSlug}`)
}
}
}
}
}
}
}

// Backward compatibility aliases
const aliases = {
'brazilian-leather': 'cicb',
'clinica-de-desenvolvimento-nathalia-bond': 'nathalia-bond',
'genesysinf-sageweb': 'sage',
minimelissa: 'mini-melissa',
}
for (const alias of Object.keys(aliases)) {
urlSet.add(`/portfolio/${alias}`)
}

// Localized portfolio — /<loc>/portfolio/<slug> renders the same project
// view in the locale's language. Media-modal deep links stay English-only
// (the modal slugs derive from English labels).
for (const lang of VALID_LANGS) {
if (lang === 'en') continue
for (const projectSlug of projectSlugs) {
urlSet.add(`/${lang}/portfolio/${projectSlug}`)
}
}

// Star Field catalog deep links — /star-field-experiment/<body> opens the
// dossier for each authored body. Body ids are catalog identifiers and
// stay English-canonical (localized dossiers resolve inside the SPA).
const starBodiesDir = path.join(REPO_ROOT, 'experiments', 'star-field', 'public', 'data', 'en')

if (fs.existsSync(starBodiesDir)) {
for (const file of fs.readdirSync(starBodiesDir)) {
if (file.endsWith('.json')) {
urlSet.add(`/star-field-experiment/${file.replace(/\.json$/, '')}`)
}
}
}

// Docs portal — English-only SPA; every publishable manifest file is a
// crawlable '/docs/<root>/<relpath>' route (files only — dirs resolve to
// the same portal page, and media payloads render inline in the viewer).
urlSet.add('/docs')

try {
const { roots } = scanManifest(REPO_ROOT)

    const walkDocs = (nodes) => {
      for (const node of nodes) {
        urlSet.add(`/docs/${node.path}`)

        if (node.type === 'dir') walkDocs(node.children)
      }
    }

    for (const root of roots) walkDocs(root.children)

} catch (err) {
console.error('Failed to scan docs manifest for sitemap — /docs routes skipped', err)
}

const allUrls = Array.from(urlSet).sort()
console.log('Total unique URLs:', allUrls.length)

const META_DIR = 'website/public/meta'
const now = new Date().toISOString().split('T')[0] + 'T00:00:00+00:00'
const priorityOf = (u) => {
const segs = u.split('/').filter(Boolean)

    if (u === '/' || (segs.length === 1 && VALID_LANGS.includes(segs[0]))) return '1.0'

    if (EXPERIENCE_SEGMENTS.has(segs[segs.length - 1])) return '0.9'

    if (u.includes('/portfolio/') && segs.length > 3) return '0.6'

    if (segs.length > 2) return '0.7'

    return '0.8'

}

/** Emits one `<urlset>` document for `urls`.

### `localeUrlsOf`

URLs owned by one locale — `/<loc>` plus its localized, playground and portfolio routes.

### `localizedLlms`

, /docs/** — the docs
// portal is English-only by design); every other locale sitemap lists only
// its own /<loc>/… routes. sitemap.xml becomes the index document.
const sharedUrls = allUrls.filter((u) => u === '/' || !LOCALE_PREFIX_RE.test(u))
const enUrls = sharedUrls
const translations = fs.existsSync('database.json')
? JSON.parse(fs.readFileSync('database.json', 'utf-8')).translations || {}
: {}
const llmsTemplate = fs.readFileSync(path.join(META_DIR, 'llms.txt'), 'utf-8')

/** Localized llms.txt — swaps the intro line for the locale's about text.

### `localizedCatalog`

Localized ai-catalog — entry URLs get the /<loc> prefix (docs stay EN).
