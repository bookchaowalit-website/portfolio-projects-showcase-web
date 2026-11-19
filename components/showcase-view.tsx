import Link from "next/link";
import { EmptyState, Reader, ReaderFoot, ReaderHead, ReaderTop, ResultCount, SearchForm, Tags, TagFilter } from "@/components/reader-shell";
import { CopyEndpoint } from "@/components/copy-endpoint";
import { filterProjects, type ProjectRecord, type ViewMode } from "@/lib/projects";

const SOURCE = "https://github.com/bookchaowalit-website/portfolio-projects-showcase-web";

export const MCP_TOOLS = [
  { name: "get_all", description: "Return the complete project index." },
  { name: "get_by_id", description: "Open one project record by id." },
  { name: "search", description: "Find records by a text query." },
];

function href(query: string, view: ViewMode): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (view !== "all") params.set("view", view);
  const search = params.toString();
  return search ? `/?${search}` : "/";
}

export function ShowcaseView({ projects, query, view }: { projects: ProjectRecord[]; query: string; view: ViewMode }) {
  const shown = filterProjects(projects, view, query);
  const count = (mode: ViewMode) => filterProjects(projects, mode, query).length;
  return (
    <Reader>
      <ReaderTop name="Projects Showcase" tagline="Rendered from one data file" links={[{ href: "/", label: "Index", current: true }, { href: "#mcp", label: "MCP" }]} />
      <main id="main" className="rs-main">
        <ReaderHead
          eyebrow="Demo"
          title="A small index rendered from one data file."
          lede="Every record on this page comes from data/projects.json, with search and an all / featured view. The two records are samples; the real project list lives on bookchaowalit.com."
        >
          <a className="rs-button" href="https://bookchaowalit.com/">See the real projects</a>
        </ReaderHead>

        <div className="rs-toolbar">
          <SearchForm label="Search records" placeholder="Name, description or technology" defaultValue={query} hidden={view !== "all" ? { view } : {}} clearHref={href("", view)} />
          <TagFilter
            label="View"
            options={[
              { href: href(query, "all"), label: "All", count: count("all"), current: view === "all" },
              { href: href(query, "featured"), label: "Featured", count: count("featured"), current: view === "featured" },
            ]}
          />
        </div>
        <ResultCount shown={shown.length} total={projects.length} noun="sample record" query={query || undefined} filter={view === "featured" ? "Featured" : undefined} />

        {shown.length ? (
          <ul className="rs-list" data-layout="cards">
            {shown.map((project) => (
              <li key={project.id}>
                <article className="rs-entry">
                  <h2>{project.name}</h2>
                  <p className="rs-entry-meta">{project.featured ? "Featured" : "Supporting"} · sample record {project.id}</p>
                  <p className="rs-entry-summary">{project.description}</p>
                  <Tags tags={project.tech} label={`${project.name} technologies`} />
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No record matches" action={<Link className="rs-button" href="/">Show all records</Link>}>
            Nothing in the {view === "featured" ? "featured view" : "index"} matches{query ? ` “${query}”` : ""}. Clear the search or switch to All.
          </EmptyState>
        )}

        <section id="mcp" className="sc-mcp" aria-labelledby="mcp-title">
          <h2 id="mcp-title">Read the same file over MCP</h2>
          <p>A read-only <code>/api/mcp</code> route serves the same records to AI clients. It cannot add or change anything.</p>
          <ul>
            {MCP_TOOLS.map((tool) => <li key={tool.name}><code>{tool.name}</code> — {tool.description}</li>)}
          </ul>
          <div className="rs-actions"><CopyEndpoint /></div>
        </section>
      </main>
      <ReaderFoot source={SOURCE} note="A demo of a data-driven index. The records are samples, not client work." />
    </Reader>
  );
}
