"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PROJECTS, filterProjects, imageFor, pickSelected, type ViewMode } from "@/lib/projects";

const MCP_TOOLS = [
  { name: "get_all", description: "Return the complete project index." },
  { name: "get_by_id", description: "Open one project record by id." },
  { name: "search", description: "Find records by a text query." },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState(PROJECTS[0]?.id ?? "");
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [query, setQuery] = useState("");
  const [copyState, setCopyState] = useState("COPY ENDPOINT");

  const filteredProjects = useMemo(() => filterProjects(PROJECTS, viewMode, query), [query, viewMode]);
  const selectedProject = pickSelected(filteredProjects, selectedId);

  function selectProject(id: string) {
    setSelectedId(id);
    document.getElementById("selected-study")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function selectView(nextView: ViewMode) {
    setViewMode(nextView);
  }

  async function copyEndpoint() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/api/mcp`);
      setCopyState("COPIED");
    } catch {
      setCopyState("COPY FAILED");
    }
  }

  return (
    <main className="showcase-page">
      <header className="showcase-nav">
        <a className="wordmark" href="#top" aria-label="Projects Showcase home">
          BOOK / SHOWCASE
        </a>
        <div className="showcase-nav__context">
          <span>BOOK DEV</span>
          <span className="nav-rule" aria-hidden="true" />
          <span>{PROJECTS.length} PROJECT STUDIES</span>
        </div>
        <a className="nav-link" href="/api/mcp" target="_blank" rel="noreferrer">
          MCP CATALOG <span aria-hidden="true">OPEN</span>
        </a>
      </header>

      <section className="showcase-hero" id="top" aria-labelledby="showcase-title">
        <div className="showcase-hero__copy">
          <h1 id="showcase-title">
            A quiet index
            <span>of built things.</span>
          </h1>
          <p className="showcase-hero__dek">
            A small, honest arrangement of projects from the Book Dev boundary. Choose a stem to inspect the work behind it.
          </p>
        </div>
        <aside className="showcase-hero__note">
          <p className="note-label">PUBLIC ARRANGEMENT</p>
          <p>Projects are shown as working studies, not a promise of production SaaS.</p>
          <a href="#arrangement" className="text-link">ENTER THE ARRANGEMENT</a>
        </aside>
      </section>

      <section className="arrangement-section" id="arrangement" aria-labelledby="arrangement-title">
        <div className="section-lead">
          <div>
            <p className="note-label">THE COLLECTION</p>
            <h2 id="arrangement-title">Project arrangement</h2>
          </div>
          <p className="section-lead__count">{filteredProjects.length} / {PROJECTS.length} visible</p>
        </div>

        <div className="arrangement">
          <div className="arrangement__alcove" role="group" aria-label="Selectable project arrangement">
            <div className="alcove-surface" aria-hidden="true" />
            <div className="branch branch--main" aria-hidden="true" />
            <div className="branch branch--twig" aria-hidden="true" />
            <div className="vessel" aria-hidden="true">
              <span>BOOK DEV</span>
              <strong>WORKS</strong>
            </div>
            <div className="ma-space" aria-hidden="true">MA / SPACE LEFT OPEN</div>

            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <button
                  type="button"
                  className={`stem stem--${index + 1} ${project.id === selectedProject?.id ? "is-selected" : ""}`}
                  key={project.id}
                  onClick={() => selectProject(project.id)}
                  aria-pressed={project.id === selectedProject?.id}
                  aria-label={`Select ${project.name}`}
                >
                  <span className="stem__line" aria-hidden="true" />
                  <span className="stem__bloom" aria-hidden="true" />
                  <span className="stem__label">
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <strong>{project.name}</strong>
                  </span>
                </button>
              ))
            ) : (
              <p className="arrangement__empty">No project holds this view. Try another filter.</p>
            )}
          </div>

          {selectedProject ? (
            <article className="study-panel" id="selected-study" aria-live="polite">
              <div className="study-panel__topline">
                <span>SELECTED STUDY</span>
                <span>{selectedProject.featured ? "FEATURED" : "SUPPORTING"}</span>
              </div>
              <div className="study-panel__image">
                <Image
                  src={imageFor(selectedProject.id)}
                  alt={`${selectedProject.name} visual study`}
                  fill
                  unoptimized
                  loading="eager"
                  sizes="(max-width: 760px) 100vw, 42vw"
                />
                <span className="study-panel__index">{selectedProject.id.padStart(2, "0")}</span>
              </div>
              <div className="study-panel__body">
                <p className="note-label">{selectedProject.featured ? "FEATURED WORK" : "SERVICE STUDY"}</p>
                <h3>{selectedProject.name}</h3>
                <p className="study-panel__description">{selectedProject.description}</p>
                <div className="study-panel__tech" role="group" aria-label="Technologies">
                  {selectedProject.tech.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="archive-section" aria-labelledby="archive-title">
        <div className="archive-section__header">
          <div>
            <p className="note-label">ARRANGEMENT TOOLS</p>
            <h2 id="archive-title">Find a project</h2>
          </div>
          <p>Search the records without leaving the room.</p>
        </div>
        <div className="archive-controls">
          <label className="search-field">
            <span>SEARCH</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, description, technology"
            />
          </label>
          <div className="view-switch" role="group" aria-label="Project view">
            <span>VIEW</span>
            <button type="button" className={viewMode === "all" ? "is-active" : ""} onClick={() => selectView("all")} aria-pressed={viewMode === "all"}>ALL</button>
            <button type="button" className={viewMode === "featured" ? "is-active" : ""} onClick={() => selectView("featured")} aria-pressed={viewMode === "featured"}>FEATURED</button>
          </div>
          <button type="button" className="endpoint-button" onClick={copyEndpoint}>{copyState}</button>
        </div>
      </section>

      <section className="mcp-section" aria-labelledby="mcp-title">
        <div className="mcp-section__intro">
          <p className="note-label">MCP CATALOG</p>
          <h2 id="mcp-title">The arrangement has a handle.</h2>
          <p>Three read-only tools keep the collection discoverable for agents and people.</p>
          <a className="text-link" href="/api/mcp" target="_blank" rel="noreferrer">OPEN JSON ENDPOINT</a>
        </div>
        <div className="mcp-tools">
          {MCP_TOOLS.map((tool, index) => (
            <div className="mcp-tool" key={tool.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{tool.name}</strong><p>{tool.description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <footer className="showcase-footer">
        <span>BOOKCHAOWALIT / PROJECTS SHOWCASE</span>
        <span>LOCAL DATA · HONEST SCOPE · {PROJECTS.length} STUDIES</span>
      </footer>
    </main>
  );
}
