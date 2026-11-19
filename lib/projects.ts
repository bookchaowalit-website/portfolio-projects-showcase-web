// Projects showcase: the two authored sample records from data/projects.json and the rules over them.
import projectData from "@/data/projects.json";

export type ProjectRecord = { id: string; name: string; description: string; tech: string[]; featured: boolean };
export type ViewMode = "all" | "featured";

/** Reads ?view=; anything unknown means "all". */
export function parseView(value: string | undefined): ViewMode {
  return value === "featured" ? "featured" : "all";
}

export const PROJECTS: ProjectRecord[] = projectData.projects;

/** Case-insensitive search over name, description and technologies, within the chosen view. */
export function filterProjects(projects: ProjectRecord[], viewMode: ViewMode, query: string): ProjectRecord[] {
  const needle = query.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesView = viewMode === "all" || project.featured;
    const matchesQuery = !needle || `${project.name} ${project.description} ${project.tech.join(" ")}`.toLowerCase().includes(needle);
    return matchesView && matchesQuery;
  });
}

/** The selected record if it is visible, else the first visible one, else nothing. */
export function pickSelected(visible: ProjectRecord[], selectedId: string): ProjectRecord | null {
  return visible.find((project) => project.id === selectedId) ?? visible[0] ?? null;
}

export function findProject(id: unknown): ProjectRecord | null {
  return PROJECTS.find((project) => project.id === id) ?? null;
}
