# `website\components\search\RouteSearch.tsx`

&lt;route-search&gt; — the 404 route autocomplete: a search

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\search\RouteSearch.tsx`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `QUERY_DEBOUNCE_MS`

Debounce window per keystroke — one scoring dispatch per pause.

### `LIST_VIEWPORT_GAP`

Viewport breathing room kept under the open listbox (px) — the
measured height cap leaves this gap at the screen edge so the panel
reads as a dropdown, not a page edge.

### `RouteSearch`

The RouteSearch — not-found autocomplete class.

### `_catalog`

Full route catalog (static pages + portfolio projects).

### `_hits`

Currently rendered hits — a subset/order of `_catalog`.

### `_active`

Keyboard/hover active row index (-1 = none).

### `_strings`

Localized copy node — seeded from the English fallback at render.

### `_debounce`

Pending input debounce timer.

### `_ring`

Live WebGPU ring-fill session (null = SVG rings render).

### `_seq`

Monotonic query id — stale worker replies can't overwrite newer hits.

### (module scope)

Whether the listbox is logically open — the spring may still be
animating the collapse after this flips false.

### (module scope)

Query the rendered hits were ranked for — a re-rank of the same
query (worker reply, catalog merge) keeps the active row.

### (module scope)

Keyboard owns the active row until the pointer actually moves —
rows scrolling under a resting cursor fire pointerover too.

### `listEl`

The results listbox element (persistent — never re-rendered).

### `inputEl`

The combobox input.

### (module scope)

Lifecycle: loads copy + catalog, wires events, mounts the ring.

### `loadData`

Loads the copy node + catalog for the current locale via SWR.

### (module scope)

The `?q=` parameter of the current URL ('' when absent).

### (module scope)

Writes the query back to `?q=` on every surface hosting the field.

### (module scope)

Store change → locale flips rebuild catalog + copy node.

### (module scope)

Pushes the resolved copy onto the live shell nodes.

### (module scope)

Delegated listeners bound on the shadow root — inside the shadow
tree `e.target` is the real node (host-bound listeners would see
retargeted events), and the root survives every list re-patch.

### (module scope)

Measures the space left under the dropdown panel and writes it to
`--rs-list-avail` — the stylesheet min()es it against the host's
design cap, so on short windows the list just shows fewer rows and
scrolls the rest instead of clipping past the screen edge. The
panel's top edge (field bottom + dropdown gap) is the anchor, so
the result is identical in the absolute (404) and in-flow (modal)
panel layouts. One rect read per open/resize — never per frame.

### (module scope)

Mounts the instanced ring-fill overlay on the results list.

### (module scope)

Focus/hover on the field sweeps its ring open; leaving eases it shut.

### `focusInput`

Moves focus into the search input — hosts (search modal) call it on open.

### (module scope)

Keystroke → debounced scoring dispatch → patched results.

### (module scope)

One scoring pass — worker reply wins; JS fallback is identical.

### (module scope)

Toggles the in-flight query state — the submit glyph spins while a
scoring dispatch is pending (catalog fetch + worker latency).

- `@param` v Whether a scoring round-trip is in flight.

### (module scope)

Patches the listbox with ranked entries and opens it. A new query
resets the active row to the top hit; a re-rank of the same query
(instant JS paint → worker reply, catalog merge) keeps the row the
user arrowed to, so a late reply can't snap the selection back.

- `@param` entries Ranked entries for `q`.
- `@param` q The query the entries were ranked for.

### (module scope)

Rebuilds the option rows inside the persistent list element.

### (module scope)

Sets the active row: class, aria-activedescendant, ring progress.

### (module scope)

Scrolls the listbox (only — never the page) so the row at `index`
sits fully inside its visible box: rows above the top edge align to
the top, rows below the bottom edge align to the bottom, visible
rows leave scrollTop untouched. One rect read per key press.

- `@param` index Row index to bring into view.

### (module scope)

Keyboard row move — marks keyboard as the active-row owner, sets
the row, and scrolls it into the list's visible box.

- `@param` index Target row index.

### (module scope)

Opens the listbox — only once the input carries a query (list on typing).

### (module scope)

Drives the clip reveal — the spring chases px in `0 → offsetHeight`
space but writes `clip-path` (bottom inset shrinks as the chase
grows), so the expansion runs entirely on the compositor: zero
layout, zero reflow per frame, unlike animating `height` itself.
The target is the VISIBLE box (max-height capped), never
scrollHeight — chasing the full scroll content kept the visible box
fully clipped until the final frames, so the reveal read as a snap.

- `@param` list The persistent listbox element.
- `@param` natural Target px — the visible box height to reveal toward.
- `@param` from Chase origin — 0 on a fresh open (element was

### (module scope)

Closes the listbox — springs the reveal to 0, then commits `hidden`.

### (module scope)

Keyboard contract: arrows move, Enter opens, Escape closes.

### (module scope)

Row click → SPA navigation (modified clicks keep anchor semantics).

### (module scope)

Hovering a row makes it the active prediction (ring fill + pill).

### (module scope)

Focus leaving the whole component closes the listbox.

### (module scope)

Navigates to a catalog entry and dismisses the list.

### (module scope)

Lifecycle teardown — debounce + ring session + height spring.

### (module scope)

JSX template — the persistent shell (rendered once per mount).
