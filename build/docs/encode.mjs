/**
 * @file docs/encode.mjs
 * @description Manifest → compact wire tuples for `virtual:docs-manifest`.
 *
 * The scanned tree repeats its schema keys (`type`/`name`/`path`/`id`/
 * `format`/`size`/`mtime`/`embedded`) and whole prefix strings
 * (`docs/…`, `docs:…`) once per node — thousands of nodes serialize the
 * same vocabulary over and over, which is what made the docs-data chunk
 * balloon. The wire form stores each distinct string once in a `strings`
 * table and encodes nodes as tuples:
 *
 *   file: [nameIdx, mtimeMs]              | [nameIdx, mtimeMs, relIdx]
 *   dir:  [nameIdx, children]             | [nameIdx, children, relIdx]
 *   root: [rootIdx, labelIdx, kindIdx, children]
 *
 * `path` and `id` are never serialized — they derive positionally
 * (root + '/' + joined ancestor names, ':' for the id namespace) when
 * the runtime hydrates the tree. The optional trailing relIdx is the
 * escape hatch for case-merged subtrees: mergeCaseCollisions can absorb
 * an 'App/' dir's children under 'app/', and those children keep their
 * real 'App/…' rel so `docs-content/<id>.json` fetches stay exact.
 *
 * Client-dead fields (format/size/embedded) are dropped at this
 * projection, not at scan — scanManifest stays the full-fidelity build
 * record for the sitemap, payload emission and pipeline tests while the
 * wire form is what ships to the browser.
 */

/**
 * Compacts a scanManifest() result into the serializable wire object.
 * String values are interned through one table; node tuples recurse with
 * the parent's real rel path so overrides only appear where positional
 * derivation would diverge from the stored path.
 * @param {object} manifest {generated, roots:[{root,label,kind,children}]}.
 * @returns {{generated: string, strings: Array<string>, roots: Array}} Wire manifest.
 */
export const encodeManifest = (manifest) => {
  const strings = []
  const indexByString = new Map()

  const stringIndex = (value) => {
    let idx = indexByString.get(value)

    if (idx === undefined) {
      idx = strings.length

      strings.push(value)
      indexByString.set(value, idx)
    }

    return idx
  }

  const encodeChildren = (nodes, root, parentRel) =>
    nodes.map((node) => {
      const nameIdx = stringIndex(node.name)
      const derived = parentRel ? `${parentRel}/${node.name}` : node.name
      const actual = node.path.slice(root.length + 1)
      const override = actual === derived ? [] : [stringIndex(actual)]

      return node.type === 'dir'
        ? [nameIdx, encodeChildren(node.children, root, actual), ...override]
        : [nameIdx, Date.parse(node.mtime), ...override]
    })

  return {
    generated: manifest.generated,
    strings,
    roots: manifest.roots.map((r) => [
      stringIndex(r.root),
      stringIndex(r.label),
      stringIndex(r.kind),
      encodeChildren(r.children, r.root, ''),
    ]),
  }
}
