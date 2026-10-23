// Projects showcase: the two authored sample records from data/projects.json and the rules over them.
import projectData from "@/data/projects.json";

export type ProjectRecord = { id: string; name: string; description: string; tech: string[]; featured: boolean };
export type ViewMode = "all" | "featured";

export const PROJECTS: ProjectRecord[] = projectData.projects;

export const PROJECT_IMAGES: Record<string, string> = {
  "1": "/projects/portfolio-site.svg",
  "2": "/projects/api-server.svg",
};

export function imageFor(id: string): string {
  return PROJECT_IMAGES[id] ?? "/projects/portfolio-site.svg";
}

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
