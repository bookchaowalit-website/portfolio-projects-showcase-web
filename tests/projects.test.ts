import { describe, expect, it } from "vitest";
import { PROJECTS, filterProjects, findProject, imageFor, pickSelected } from "@/lib/projects";

describe("filterProjects", () => {
  it("shows both records in the all view and only the featured one in the featured view", () => {
    expect(filterProjects(PROJECTS, "all", "")).toHaveLength(2);
    expect(filterProjects(PROJECTS, "featured", "").map((p) => p.id)).toEqual(["1"]);
  });

  it("searches name, description and technology, case-insensitive and trimmed", () => {
    expect(filterProjects(PROJECTS, "all", "  TYPESCRIPT ").map((p) => p.id)).toEqual(["1"]);
    expect(filterProjects(PROJECTS, "all", "rest api").map((p) => p.id)).toEqual(["2"]);
    expect(filterProjects(PROJECTS, "featured", "express")).toEqual([]);
  });
});

describe("pickSelected", () => {
  it("keeps the selection while it is visible", () => {
    expect(pickSelected(PROJECTS, "2")?.id).toBe("2");
  });

  it("opens the first visible record when a filter hides the selection", () => {
    expect(pickSelected(filterProjects(PROJECTS, "featured", ""), "2")?.id).toBe("1");
  });

  it("opens nothing when nothing is visible", () => {
    expect(pickSelected([], "1")).toBeNull();
  });
});

describe("lookups", () => {
  it("finds records by id only", () => {
    expect(findProject("1")?.name).toBe("Portfolio Site");
    expect(findProject(1)).toBeNull();
  });

  it("falls back to the portfolio image for an unknown id", () => {
    expect(imageFor("2")).toBe("/projects/api-server.svg");
    expect(imageFor("x")).toBe("/projects/portfolio-site.svg");
  });
});
