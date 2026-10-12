# `shared/scripts/verify/scope-gates.mjs`

Scoped quality-gate runner for the module workspace. Git

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/verify/scope-gates.mjs`                               |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### `SCOPES`

Scope registry: module dirs, the per-module tsconfig and jest config,
and policy flags.
dirs — source roots eslint/stylelint scan.
tsconfig — scoped compilation target.
jest — the module's own Jest config (its tests live inside it).
governance — also run the cross-cutting scan suite in shared/tests.
a11y — include axe-scan + contrast-aaa in that governance run.
lighthouse — the scope is eligible for Lighthouse performance checks.

### `SCOPE_ROOTS`

Scope → module repository root. Every module is a git submodule whose
own hooks ran its gates; `root` is where the stored gate result lives
(`<root>/reports/gate-result.json`). 'app' is the shared module.

### `LINK_SCOPES`

Submodule path (gitlink) → scope, derived from SCOPE_ROOTS.

### `PATH_SCOPE_RULES`

Ordered most-specific first — first match wins.

### `GLOBAL_FILES`

Files whose change ripples to every module (toolchain, lockfile, config).

### `GOVERNANCE_DIR`

Governance scans that are NOT accessibility checks — style, JSDoc, and
portability governance run for every gated scope including cms. The a11y
pair (axe-scan, contrast-aaa) is appended only when the scope's `a11y`
flag allows it.

### `scopeForPath`

Maps one changed path to its scope (or 'shared' for infra/toolchain).

### `expand`

Expands a scope set: 'shared'/'all' resolve to concrete scopes.

### `changedFiles`

Lists files changed in a diff range (or the index for --staged). The
64 MiB maxBuffer absorbs mega-diffs — the default 1 MiB silently
truncated a ~21k-file push and produced an empty list. A diff failure
is fatal, not skippable: returning [] would push with zero gates.

### `runGovernance`

Runs the cross-cutting governance suite (shared/tests/governance) under
the shared module's Jest config. Scopes flagged `a11y: false` (cms)
exclude the axe/contrast pair per the workspace contract.

### `resultFile`

Stored gate-result path for a module — `reports/` is gitignored, so the
stamp is a local artifact: the superproject validates it locally before
pushing, and CI (fresh checkout, no reports) simply falls back to
running the gates.

### `gitlinkSha`

The commit a parent's HEAD gitlink points at for a submodule path.

### `moduleHead`

The module worktree's own HEAD — what its hooks stamped.

### `stamp`

Stamps a passing gate run: `<module>/reports/gate-result.json` records
the module HEAD and the checks that ran, so later parent-level pushes
of the same commit validate instantly instead of re-running.

### `runScope`

Runs the gate set for one scope and stamps the stored result.

### `runLink`

/*.scss`),
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
Validates a gitlink bump via the module's stored gate result. The
module's own hooks stamped `reports/gate-result.json` when its commit
was gated; if that stamp matches the commit the parent is about to
record, nothing re-runs. Missing/stale stamps fall back to the scope's
full gate set (then re-stamp) — the gate stays honest either way.
