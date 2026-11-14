/**
 * @file patch-project-dates.js
 * @description Seeds `date` + `modified` on every project node in every
 * locale of the local database.json mirror, derived from git history —
 * never invented: `date` is the earliest commit whose database.json
 * already carried the slug under translations.en.projects, `modified`
 * is the newest commit whose English project payload differed from the
 * previous snapshot (omitted when it equals `date`). English is the
 * canonical content language, so one date set is written onto every
 * localized node; locale variants share the article's lifecycle.
 *
 * Consumers map the fields onto NewsArticle datePublished/dateModified,
 * article:published_time / article:modified_time, sitemap <lastmod>,
 * RSS <pubDate> and the Google News sitemap — all gated on the field
 * being present, so projects without history stay undated rather than
 * stamped with a build-time guess.
 *
 * Run: node shared/scripts/i18n/patch-project-dates.js
 * (patches the local mirror only — upload to Firebase separately).
 */
import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Repo root — script lives three levels down (shared/scripts/i18n).
const rootDir = path.resolve(__dirname, '..', '..', '..')

// The local RTDB mirror — patched in place, written back at end.
const dbPath = path.join(rootDir, 'database.json')

/**
 * Stable fingerprint of a project node — sha256 over the canonical JSON
 * with the date fields stripped, so re-running after a patch never
 * counts the migration itself as a content change.
 */
const nodeHash = (node) =>
  createHash('sha256')
    .update(JSON.stringify({ ...node, date: undefined, modified: undefined }))
    .digest('hex')

// Commits that touched the mirror, oldest first — each snapshot decides
// first-appearance (`date`) and last-change (`modified`) per slug.
const commits = execFileSync('git', ['log', '--format=%H|%cI', '--', 'database.json'], {
  cwd: rootDir,
  encoding: 'utf8',
})
  .trim()
  .split('\n')
  .filter(Boolean)
  .reverse()

// slug → { date, modified } — modified only when the payload moved.
const stamps = new Map()
const seen = new Map()

for (const line of commits) {
  const [sha, iso] = line.split('|')

  let json

  try {
    json = JSON.parse(
      execFileSync('git', ['show', `${sha}:database.json`], {
        cwd: rootDir,
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
      })
    )
  } catch {
    // Unparseable/interim snapshot — skip it rather than trusting a
    // half-decoded tree.
    continue
  }

  const projects = json?.translations?.en?.projects || {}

  for (const [slug, node] of Object.entries(projects)) {
    const hash = nodeHash(node)

    if (!seen.has(slug)) {
      stamps.set(slug, { date: iso, modified: iso })
    } else if (seen.get(slug) !== hash) {
      stamps.get(slug).modified = iso
    }

    seen.set(slug, hash)
  }
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

// Write the same date set onto every locale's copy of the slug.
let patched = 0

for (const localeNode of Object.values(db.translations || {})) {
  for (const [slug, node] of Object.entries(localeNode?.projects || {})) {
    const stamp = stamps.get(slug)

    if (!stamp) continue

    node.date = stamp.date

    if (stamp.modified !== stamp.date) node.modified = stamp.modified
    else delete node.modified

    patched++
  }
}

// Write the mirror back — trailing newline matches the file's format.
fs.writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`, 'utf8')

console.log(
  `✅ database.json patched — git-derived dates on ${patched} project nodes across ${Object.keys(db.translations || {}).length} locales (${stamps.size} slugs).`
)
