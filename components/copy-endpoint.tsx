"use client";

import { useState } from "react";

/**
 * Copies this site's MCP endpoint URL and says so in a visible status line (a live region that is rendered
 * before the click). When the browser blocks the clipboard, the line says so and shows the URL as selectable
 * text, so it can still be copied by hand.
 */
export function CopyEndpoint() {
  const [state, setState] = useState<{ status: "idle" | "copied" | "failed"; url: string }>({ status: "idle", url: "" });
  async function copy() {
    const url = `${window.location.origin}/api/mcp`;
    try {
      await navigator.clipboard.writeText(url);
      setState({ status: "copied", url });
    } catch {
      setState({ status: "failed", url });
    }
  }
  return (
    <>
      <button type="button" className="rs-plain" onClick={copy}>{state.status === "copied" ? "Copied" : "Copy endpoint URL"}</button>
      <p className="sc-copy-status" role="status">
        {state.status === "copied" ? "Endpoint URL copied." : null}
        {state.status === "failed" ? <>The browser blocked clipboard access. Select the URL and copy it by hand: <code className="sc-copy-url">{state.url}</code></> : null}
      </p>
    </>
  );
}
