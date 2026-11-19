import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "geist" }), Geist_Mono: () => ({ variable: "geist-mono" }) }));

import Home from "@/app/page";
import RootLayout, { metadata } from "@/app/layout";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { parseView } from "@/lib/projects";

const page = async (values: Record<string, string> = {}) => renderToStaticMarkup(await Home({ searchParams: Promise.resolve(values) }));

describe("home page on the Reader shell", () => {
  it("renders both sample records, says they are samples and links to the hub", async () => {
    const html = await page();
    expect(html).toContain("<h1>A small index rendered from one data file.</h1>");
    expect(html).toContain("Portfolio Site");
    expect(html).toContain("API Server");
    expect(html).toContain("2 sample records");
    expect(html).toContain("The two records are samples");
    expect(html).toContain('href="https://bookchaowalit.com/"');
    expect(html).toContain("get_by_id");
  });

  it("filters to featured and by search, keeping the view in the form", async () => {
    const html = await page({ view: "featured", q: "next" });
    expect(html).toContain("Showing 1 of 2 sample records in Featured for “next”");
    expect(html).toContain('name="view" value="featured"');
    expect(html).not.toContain("API Server");
  });

  it("shows an empty state with a way back", async () => {
    const html = await page({ q: "cobol" });
    expect(html).toContain("No record matches");
    expect(html).toContain("Show all records");
  });

  it("uses projects-showcase.bookchaowalit.com for canonical, sitemap and robots", () => {
    expect(renderToStaticMarkup(RootLayout({ children: <p>x</p> }))).toContain('class="geist geist-mono"');
    expect(String(metadata.metadataBase)).toBe("https://projects-showcase.bookchaowalit.com/");
    expect(metadata.alternates?.canonical).toBe("/");
    expect(JSON.stringify(metadata.twitter)).not.toContain("A modern web application");
    expect(sitemap()[0].url).toBe("https://projects-showcase.bookchaowalit.com");
    expect(robots().sitemap).toBe("https://projects-showcase.bookchaowalit.com/sitemap.xml");
    expect(parseView("weird")).toBe("all");
  });
});
