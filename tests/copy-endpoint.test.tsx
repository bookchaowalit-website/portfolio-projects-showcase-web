// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { CopyEndpoint } from "@/components/copy-endpoint";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("CopyEndpoint", () => {
  it("copies the MCP URL and reports a blocked clipboard", async () => {
    const host = document.createElement("div");
    document.body.append(host);
    const root = createRoot(host);
    act(() => root.render(<CopyEndpoint />));
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    await act(async () => { host.querySelector("button")!.click(); });
    expect(writeText).toHaveBeenCalledWith(expect.stringMatching(/\/api\/mcp$/));
    expect(host.textContent).toContain("Copied");
    writeText.mockRejectedValueOnce(new Error("no"));
    await act(async () => { host.querySelector("button")!.click(); });
    const status = host.querySelector("[role='status']")!;
    expect(status.textContent).toContain("blocked");
    // Visible (not screen-reader-only) and offers the URL to copy by hand.
    expect(status.classList.contains("rs-sr")).toBe(false);
    expect(status.querySelector("code")?.textContent).toMatch(/^https?:\/\/[^/]+\/api\/mcp$/);
    expect(host.querySelector("button")!.textContent).toBe("Copy endpoint URL");
    act(() => root.unmount());
  });
});
