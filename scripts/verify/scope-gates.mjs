#!/usr/bin/env node
/**
 * @file scope-gates.mjs
 * @description Scoped quality-gate runner for the module workspace. Git
 * hooks (pre-commit / pre-push) and CI call this so a change inside one
 * module only pays for that module's gates — scoped `tsc`, eslint,
 * stylelint, and the module's own Jest suite — instead of the whole
 * monorepo.
 *
 * Tests live inside their module (`<module>/tests`, `shared/tests` for the
 * app shell + cross-cutting governance). Each scope therefore delegates to
 * the module's jest.config.mjs rather than to path slices of one monolith.
 *
 * Usage:
 *   node shared/scripts/verify/scope-gates.mjs run <scope…>          # run gates
 *   node shared/scripts/verify/scope-gates.mjs run link:<path>…      # gitlink → stored-result check
 *   node shared/scripts/verify/scope-gates.mjs run --all             # every scope
 *   node shared/scripts/verify/scope-gates.mjs links                 # build-time stored-results pass
 *   node shared/scripts/verify/scope-gates.mjs scope <path>          # module dir → scope name
 *   node shared/scripts/verify/scope-gates.mjs areas <diff-args…>    # map git diff → scopes
 *   node shared/scripts/verify/scope-gates.mjs areas --staged        # map staged files
 *
 * Submodule contract: every workspace module is its own repository with
 * its own hooks — the module's gates already ran when its commit/push was
 * made. A parent diff therefore shows only bare gitlink paths (`website`,
 * `shared`, `experiments/docs`…), which map to `link:<path>` entries, NOT
 * to re-run scopes. A `link:` check passes when `<module>/reports/
 * gate-result.json` records a passing run stamped with the same commit
 * the parent gitlink points at; a missing/stale result falls back to
 * running that scope's full gate set and re-stamps the result. `links`
 * is the build-time pass: same stored-result validation, plus a coverage
 * summary presence check, with `run-modules --coverage` as the fallback —
 * the root verifies stored results instead of paying for a second run.
 *
 * Scope policy (from the workspace contract):
 *   cms        → never runs a11y (axe/contrast governance) or Lighthouse.
 *   docs,earth → Lighthouse never gates them (no performance watching).
 *   app,website,core → full gate set.
 *   local-modules / shared infra → ripple to every scope (toolchain-wide).
 */

import { execSync, execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

/**
 * Scope registry: module dirs, the per-module tsconfig and jest config,
 * and policy flags.
 *   dirs     — source roots eslint/stylelint scan.
 *   tsconfig — scoped compilation target.
 *   jest     — the module's own Jest config (its tests live inside it).
 *   governance — also run the cross-cutting scan suite in shared/tests.
 *   a11y     — include axe-scan + contrast-aaa in that governance run.
 *   lighthouse — the scope is eligible for Lighthouse performance checks.
 */
const SCOPES = {
  app: {
    dirs: ['shared/src'],
    tsconfig: 'tsconfig.json',
    jest: 'shared/jest.config.mjs',
    // shared's suite already contains governance — no second invocation.
    governance: false,
    a11y: true,
    lighthouse: true,
  },
  core: {
    dirs: ['core'],
    tsconfig: 'core/tsconfig.json',
    jest: 'core/jest.config.mjs',
    governance: true,
    a11y: true,
    lighthouse: false,
  },
  website: {
    dirs: ['website'],
    tsconfig: 'website/tsconfig.json',
    jest: 'website/jest.config.mjs',
    governance: true,
    a11y: true,
    lighthouse: true,
  },
  cms: {
    dirs: ['cms'],
    tsconfig: 'cms/tsconfig.json',
    jest: 'cms/jest.config.mjs',
    governance: true,
    // Contract: the CMS never runs accessibility scans or Lighthouse.
    a11y: false,
    lighthouse: false,
  },
  earth: {
    dirs: ['experiments/earth-playground'],
    tsconfig: 'experiments/earth-playground/tsconfig.json',
    jest: 'experiments/earth-playground/jest.config.mjs',
    governance: true,
    a11y: true,
    // Contract: experiments never watch Lighthouse performance.
    lighthouse: false,
  },
  docs: {
    dirs: ['experiments/docs'],
    tsconfig: 'experiments/docs/tsconfig.json',
    jest: 'experiments/docs/jest.config.mjs',
    governance: true,
    a11y: true,
    lighthouse: false,
  },
  'star-field': {
    dirs: ['experiments/star-field'],
    tsconfig: 'experiments/star-field/tsconfig.json',
    jest: 'experiments/star-field/jest.config.mjs',
    governance: true,
    a11y: true,
    lighthouse: false,
  },
}

/**
 * Scope → module repository root. Every module is a git submodule whose
 * own hooks ran its gates; `root` is where the stored gate result lives
 * (`<root>/reports/gate-result.json`). 'app' is the shared module.
 */
const SCOPE_ROOTS = {
  app: 'shared',
  core: 'core',
  website: 'website',
  cms: 'cms',
  earth: 'experiments/earth-playground',
  docs: 'experiments/docs',
  'star-field': 'experiments/star-field',
}

/** Submodule path (gitlink) → scope, derived from SCOPE_ROOTS. */
const LINK_SCOPES = Object.fromEntries(
  Object.entries(SCOPE_ROOTS).map(([scope, root]) => [root, scope])
)

/** Ordered most-specific first — first match wins. */
const PATH_SCOPE_RULES = [
  [/^experiments\/earth-playground\//, 'earth'],
  [/^experiments\/docs\//, 'docs'],
  [/^experiments\/star-field\//, 'star-field'],
  [/^website\//, 'website'],
  [/^core\//, 'core'],
  [/^cms\//, 'cms'],
  [/^shared\/src\//, 'app'],
  // Vendored publishable packages feed every module — a change ripples wide.
  [/^shared\/local-modules\//, 'all'],
  // Shared infra (scripts, build toolchain, test harness) ripples to all.
  [/^shared\/(scripts|build|tests)\//, 'shared'],
  [/^shared\//, 'app'],
]

/** Files whose change ripples to every module (toolchain, lockfile, config). */
const GLOBAL_FILES =
  /^(package\.json|yarn\.lock|tsconfig\.json|jest\.config\.js|vite\.config\.js|eslint\.config\.js|\.stylelintrc|lighthouserc|\.github)/

/**
 * Governance scans that are NOT accessibility checks — style, JSDoc, and
 * portability governance run for every gated scope including cms. The a11y
 * pair (axe-scan, contrast-aaa) is appended only when the scope's `a11y`
 * flag allows it.
 */
const GOVERNANCE_DIR = 'shared/tests/governance'
const A11Y_SCANS = [/^axe-scan\./, /^contrast-aaa\./]

/** Maps one changed path to its scope (or 'shared' for infra/toolchain). */
const scopeForPath = (p) => {
  // Bare submodule paths are gitlink bumps — the module's own hooks
  // already gated that commit; emit a stored-results check, not a scope.
  if (LINK_SCOPES[p]) return `link:${p}`
  for (const [re, scope] of PATH_SCOPE_RULES) if (re.test(p)) return scope
  if (GLOBAL_FILES.test(p)) return 'all'
  return 'shared'
}

/** Expands a scope set: 'shared'/'all' resolve to concrete scopes. */
const expand = (scopes) => {
  const links = [...scopes].filter((s) => s.startsWith('link:'))
  if (scopes.has('all') || scopes.has('shared')) return [...Object.keys(SCOPES), ...links]
  return [...scopes].filter((s) => s in SCOPES || s.startsWith('link:'))
}

/**
 * Lists files changed in a diff range (or the index for --staged). The
 * 64 MiB maxBuffer absorbs mega-diffs — the default 1 MiB silently
 * truncated a ~21k-file push and produced an empty list. A diff failure
 * is fatal, not skippable: returning [] would push with zero gates.
 */
const changedFiles = (args) => {
  const opts = { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }

  if (args.includes('--staged')) {
    return execSync('git diff --cached --name-only', opts).split('\n').filter(Boolean)
  }

  const range = args.find((a) => !a.startsWith('-')) || 'HEAD'

  return execSync(`git diff --name-only ${range}`, opts).split('\n').filter(Boolean)
}

const exists = (p) => fs.existsSync(path.join(ROOT, p))

const run = (label, cmd, args) => {
  process.stdout.write(`\n── ${label}: ${cmd} ${args.join(' ')} ──\n`)
  execFileSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: false })
}

const JEST = [
  '--experimental-vm-modules',
  '--disable-warning=ExperimentalWarning',
  'node_modules/jest/bin/jest.js',
]

/**
 * Runs the cross-cutting governance suite (shared/tests/governance) under
 * the shared module's Jest config. Scopes flagged `a11y: false` (cms)
 * exclude the axe/contrast pair per the workspace contract.
 */
const runGovernance = (scope, a11y) => {
  const dir = path.join(ROOT, GOVERNANCE_DIR)
  if (!fs.existsSync(dir)) return

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.test.js'))
    .filter((f) => a11y || !A11Y_SCANS.some((re) => re.test(f)))
    .map((f) => path.join(GOVERNANCE_DIR, f))

  if (!files.length) return

  run(`${scope} governance`, 'node', [...JEST, '--config', 'shared/jest.config.mjs', ...files])
}

/**
 * Stored gate-result path for a module — `reports/` is gitignored, so the
 * stamp is a local artifact: the superproject validates it locally before
 * pushing, and CI (fresh checkout, no reports) simply falls back to
 * running the gates.
 */
const resultFile = (moduleRoot) => path.join(ROOT, moduleRoot, 'reports', 'gate-result.json')

/** The commit a parent's HEAD gitlink points at for a submodule path. */
const gitlinkSha = (modulePath) =>
  execSync(`git rev-parse HEAD:${modulePath}`, { cwd: ROOT, encoding: 'utf8' }).trim()

/** The module worktree's own HEAD — what its hooks stamped. */
const moduleHead = (moduleRoot) =>
  execSync('git rev-parse HEAD', { cwd: path.join(ROOT, moduleRoot), encoding: 'utf8' }).trim()

/**
 * Stamps a passing gate run: `<module>/reports/gate-result.json` records
 * the module HEAD and the checks that ran, so later parent-level pushes
 * of the same commit validate instantly instead of re-running.
 */
const stamp = (scope, checks) => {
  const moduleRoot = SCOPE_ROOTS[scope]
  if (!moduleRoot) return

  const file = resultFile(moduleRoot)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(
    file,
    JSON.stringify(
      {
        scope,
        sha: moduleHead(moduleRoot),
        ok: true,
        checks,
        ts: new Date().toISOString(),
      },
      null,
      2
    ) + '\n'
  )
}

/** Runs the gate set for one scope and stamps the stored result. */
const runScope = (scope) => {
  const def = SCOPES[scope]
  const dirs = def.dirs.filter(exists)
  const checks = ['tsc', 'eslint']

  run(`${scope} tsc`, 'yarn', ['tsc', '-p', def.tsconfig, '--noEmit'])
  run(`${scope} eslint`, 'yarn', ['eslint', ...dirs, '--max-warnings=0'])

  // Module dirs are their own repos — ls-files must run inside each one
  // (the superproject index holds only gitlinks, never module paths).
  const hasScss = dirs.some((d) => {
    try {
      return execSync('git ls-files "*.scss"', {
        cwd: path.join(ROOT, d),
        encoding: 'utf8',
      }).trim()
    } catch {
      return false
    }
  })

  if (hasScss) {
    checks.push('stylelint')
    run(`${scope} stylelint`, 'yarn', [
      'stylelint',
      ...dirs.map((d) => `${d}/**/*.scss`),
      '--max-warnings=0',
    ])
  }

  if (exists(def.jest)) {
    checks.push('jest')
    run(`${scope} jest`, 'node', [...JEST, '--config', def.jest])
  }

  if (def.governance) {
    checks.push('governance')
    runGovernance(scope, def.a11y)
  }

  stamp(scope, checks)
}

/**
 * Validates a gitlink bump via the module's stored gate result. The
 * module's own hooks stamped `reports/gate-result.json` when its commit
 * was gated; if that stamp matches the commit the parent is about to
 * record, nothing re-runs. Missing/stale stamps fall back to the scope's
 * full gate set (then re-stamp) — the gate stays honest either way.
 */
const runLink = (modulePath) => {
  const scope = LINK_SCOPES[modulePath]

  if (!scope) {
    process.stderr.write(`scope-gates: ${modulePath} is not a gated submodule\n`)
    process.exitCode = 1
    return
  }

  const want = gitlinkSha(modulePath)
  let stored = null

  try {
    stored = JSON.parse(fs.readFileSync(resultFile(modulePath), 'utf8'))
  } catch {
    /* no stored result — fall through to the real run */
  }

  if (stored?.ok && stored.sha === want) {
    process.stdout.write(`\n── ${scope}: gates already passed at ${want.slice(0, 7)} (stored) ──\n`)
    return
  }

  process.stdout.write(
    `\n── ${scope}: no stored result for ${want.slice(0, 7)} — running gates ──\n`
  )
  runScope(scope)

  // runScope stamps the WORKTREE head; require it to match the gitlink so
  // a dirty/diverged module can't smuggle an ungated commit upstream.
  const stamped = JSON.parse(fs.readFileSync(resultFile(modulePath), 'utf8'))
  if (stamped.sha !== want) {
    process.stderr.write(
      `scope-gates: ${modulePath} gated ${stamped.sha.slice(0, 7)} but the ` +
        `gitlink records ${want.slice(0, 7)} — commit the module's HEAD or ` +
        `re-record the gitlink\n`
    )
    process.exitCode = 1
  }
}

const [, , mode, ...args] = process.argv

if (mode === 'areas') {
  const files = changedFiles(args)

  if (!files.length) {
    console.log('')
    process.exit(0)
  }

  const scopes = expand(new Set(files.map(scopeForPath)))

  process.stdout.write(scopes.join(' ') + '\n')
} else if (mode === 'scope') {
  // Module hook context: map the module's repo-relative path to its scope.
  const scope = LINK_SCOPES[args[0]] || (SCOPES[args[0]] ? args[0] : '')
  process.stdout.write(scope + '\n')
} else if (mode === 'self') {
  // Module hook context: a re-push of an already-gated HEAD skips —
  // the stamp proves this commit passed the module's full gate set.
  const scope = args[0]
  const moduleRoot = SCOPE_ROOTS[scope]

  if (!scope || !moduleRoot) {
    process.stderr.write(`scope-gates: unknown self scope '${scope}'\n`)
    process.exit(1)
  }

  const want = moduleHead(moduleRoot)
  let stored = null

  try {
    stored = JSON.parse(fs.readFileSync(resultFile(moduleRoot), 'utf8'))
  } catch {
    /* absent */
  }

  if (stored?.ok && stored.sha === want) {
    process.stdout.write(`── ${scope}: gates already passed at ${want.slice(0, 7)} (stored) ──\n`)
    process.exit(0)
  }

  runScope(scope)
} else if (mode === 'links') {
  // Build-time validation: every submodule must carry a stored gate
  // result for the commit its gitlink records, plus a coverage summary
  // the coverage-gate can read. Missing pieces run the module's suite
  // with coverage (the stored results CI/fresh checkouts can't have).
  for (const modulePath of Object.keys(LINK_SCOPES)) {
    const scope = LINK_SCOPES[modulePath]
    const moduleRoot = path.join(ROOT, modulePath)

    if (!fs.existsSync(moduleRoot)) continue

    const want = gitlinkSha(modulePath)
    let stored = null

    try {
      stored = JSON.parse(fs.readFileSync(resultFile(modulePath), 'utf8'))
    } catch {
      /* absent */
    }

    const coverageOk = fs.existsSync(
      path.join(moduleRoot, 'reports', 'coverage', 'coverage-summary.json')
    )

    if (stored?.ok && stored.sha === want && coverageOk) {
      process.stdout.write(`── ${scope}: stored gates + coverage ok at ${want.slice(0, 7)} ──\n`)
      continue
    }

    process.stdout.write(`── ${scope}: stored results incomplete — running suite ──\n`)
    run(`${scope} jest`, 'node', [
      'shared/scripts/test/run-modules.mjs',
      '--coverage',
      modulePath === 'shared' ? 'shared' : path.basename(modulePath),
    ])
    stamp(scope, ['jest', 'coverage'])
  }
} else if (mode === 'run') {
  const scopes = args.includes('--all') ? Object.keys(SCOPES) : expand(new Set(args))

  if (!scopes.length) {
    process.stdout.write('scope-gates: nothing to run\n')
    process.exit(0)
  }

  for (const scope of scopes) {
    if (scope.startsWith('link:')) runLink(scope.slice(5))
    else runScope(scope)
  }
} else {
  process.stderr.write(
    'usage: scope-gates.mjs run <scope…|link:<path>…|--all> | links | scope <path> | areas <git-range|--staged>\n'
  )
  process.exit(1)
}
