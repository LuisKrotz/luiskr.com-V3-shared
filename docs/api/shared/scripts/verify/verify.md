# `shared\scripts\verify\verify.mjs`

Single quality gate shared by `prebuild` and the git

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\verify\verify.mjs`                  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `runStep`

/*.scss" --max-warnings=0',
test: 'node shared/scripts/verify/scope-gates.mjs links',
'coverage-gate': 'node shared/scripts/verify/coverage-gate.mjs',
'security-scan': 'node shared/scripts/verify/security-scan.mjs',
}

const only = (process.env.VERIFY_ONLY || '')
.split(',')
.map((s) => s.trim())
.filter(Boolean)

const steps = Object.entries(STEPS).filter(([name]) => !only.length || only.includes(name))

const failures = []

/**
Runs one step with piped stdio — the child's full output is captured and
replayed under its banner once it exits, which keeps parallel children
from interleaving their report blocks mid-line.

- `@param` {string} name step name (banner + failure list)
- `@param` {string} cmd shell command to execute
- `@returns` {Promise<void>} resolves after the child's output is flushed
