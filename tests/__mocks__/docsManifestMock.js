/**
 * @file __mocks__/docsManifestMock.js
 * @description Jest stand-in for `virtual:docs-manifest` — a small
 * deterministic tree exercising every node kind (nested dirs, markdown,
 * code, json, html, media, oversized binary) plus a case-merged subtree
 * ('src/app' lists children whose real paths keep 'App/…' casing, as
 * mergeCaseCollisions produces) so the wire's rel-override arm hydrates.
 * The fixture is written in the verbose scan shape for readability and
 * exported through the real shared encoder — the runtime hydrates it
 * back, so tests assert on the same DocsNode tree production sees.
 */
import { encodeManifest } from '../../build/docs/encode.mjs'

/** Verbose scan-shaped fixture encoded into the wire form below. */
const MANIFEST = {
  generated: '2024-06-01T12:00:00.000Z',
  roots: [
    {
      root: 'docs',
      label: 'Documentation',
      kind: 'docs',
      children: [
        {
          type: 'dir',
          name: 'architecture',
          path: 'docs/architecture',
          children: [
            {
              type: 'file',
              name: 'website.md',
              path: 'docs/architecture/website.md',
              id: 'docs:architecture/website.md',
              format: 'markdown',
              size: 1200,
              mtime: '2024-06-01T12:00:00.000Z',
              embedded: true,
            },
          ],
        },
        {
          type: 'dir',
          name: 'sassdoc',
          path: 'docs/sassdoc',
          children: [
            {
              type: 'file',
              name: 'index.html',
              path: 'docs/sassdoc/index.html',
              id: 'docs:sassdoc/index.html',
              format: 'html',
              size: 600,
              mtime: '2024-06-01T12:00:00.000Z',
              embedded: true,
            },
          ],
        },
        {
          type: 'file',
          name: 'README.md',
          path: 'docs/README.md',
          id: 'docs:README.md',
          format: 'markdown',
          size: 800,
          mtime: '2024-06-01T12:00:00.000Z',
          embedded: true,
        },
      ],
    },
    {
      root: 'reports',
      label: 'Quality Reports',
      kind: 'reports',
      children: [
        {
          type: 'file',
          name: 'axe-report.json',
          path: 'reports/axe-report.json',
          id: 'reports:axe-report.json',
          format: 'json',
          size: 500,
          mtime: '2024-06-01T12:00:00.000Z',
          embedded: true,
        },
      ],
    },
    {
      root: 'src',
      label: 'Source Code',
      kind: 'source',
      children: [
        {
          type: 'file',
          name: 'App.tsx',
          path: 'src/App.tsx',
          id: 'src:App.tsx',
          format: 'code',
          size: 4000,
          mtime: '2024-06-01T12:00:00.000Z',
          embedded: true,
        },
        {
          type: 'file',
          name: 'binary.png',
          path: 'src/binary.png',
          id: 'src:binary.png',
          format: 'media',
          size: 900000,
          mtime: '2024-06-01T12:00:00.000Z',
          embedded: false,
        },
        {
          type: 'file',
          name: 'index.html',
          path: 'src/index.html',
          id: 'src:index.html',
          format: 'code',
          size: 300,
          mtime: '2024-06-01T12:00:00.000Z',
          embedded: true,
        },
        {
          type: 'dir',
          name: 'app',
          path: 'src/app',
          children: [
            // Case-merge survivors — 'App/' was absorbed under 'app/' but
            // these nodes keep their real rel path/id for the fetch URL.
            {
              type: 'file',
              name: 'x.ts',
              path: 'src/App/x.ts',
              id: 'src:App/x.ts',
              format: 'code',
              size: 10,
              mtime: '2024-06-01T12:00:00.000Z',
              embedded: true,
            },
            {
              type: 'dir',
              name: 'sub',
              path: 'src/App/sub',
              children: [
                {
                  type: 'file',
                  name: 'y.ts',
                  path: 'src/App/sub/y.ts',
                  id: 'src:App/sub/y.ts',
                  format: 'code',
                  size: 20,
                  mtime: '2024-06-01T12:00:00.000Z',
                  embedded: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default encodeManifest(MANIFEST)
