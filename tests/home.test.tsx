import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the arrangement with both sample records and the honest-scope notice", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("A quiet index");
    expect(html).toContain("Portfolio Site");
    expect(html).toContain("API Server");
    expect(html).toContain("not a promise of production SaaS");
    expect(html).toMatch(/LOCAL DATA · HONEST SCOPE · (<!-- -->)?2(<!-- -->)? STUDIES/);
  });
});
