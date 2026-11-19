# Projects Showcase design

Since 2026-11-19 the page uses the shared **Reader shell** (`app/reader-shell.css`, `components/reader-shell.tsx`,
rules in `READER.md`): Geist and Geist Mono via next/font, the `--rs-*` light/dark tokens (placeholders use
`--rs-muted`, 4.5:1), one top bar and a footer back to bookchaowalit.com. The old ikebana palette and the
absolutely positioned stems are gone, so any number of records lays out as a card grid.

- Head: says what the page is (an index rendered from `data/projects.json`), that the two records are samples,
  and links to the real project list on bookchaowalit.com.
- Toolbar: GET search and All / Featured chips with counts that follow the search; a count line; an empty state
  with a way back.
- Records: one card each (featured or supporting, description, technologies).
- MCP: the three read-only tools of `/api/mcp` and a 44px Copy endpoint URL button with a status message.
- Floor: text ≥ 12px, targets ≥ 44px, 4.5:1 text in light and dark, forced colors, no horizontal scroll at 320px.
