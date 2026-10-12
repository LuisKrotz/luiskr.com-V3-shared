# `shared/scripts/scaffold/new-experiment.mjs`

Scaffolds a new experiment workspace under experiments/&lt;name&gt;/

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/scaffold/new-experiment.mjs`                          |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### (module scope)

",
"**/components/**"
]
}
`,
  'tsconfig.json': `{
"extends": "../../tsconfig.json",
"include": [
"./**/\*.ts",
"./**/*.tsx",
"../../shared/src/globals.d.ts",
"../../shared/src/modules.d.ts"
],
"exclude": ["./tests", "./dist", "./reports", "./node_modules"]
}
`,
  'vite.config.js': `/**

### (module scope)

### (module scope)

### `describe`
