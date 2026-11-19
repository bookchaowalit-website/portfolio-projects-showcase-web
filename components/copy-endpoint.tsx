"use client";

import { useState } from "react";

/** Copies this site's MCP endpoint URL; says so (or that the browser blocked it) in a status line. */
export function CopyEndpoint() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/api/mcp`);
      setState("copied");
    } catch {
      setState("failed");
    }
  }
  return (
    <>
      <button type="button" className="rs-plain" onClick={copy}>{state === "copied" ? "Copied" : "Copy endpoint URL"}</button>
      <span className="rs-sr" role="status">{state === "copied" ? "Endpoint URL copied." : state === "failed" ? "The browser blocked clipboard access." : ""}</span>
    </>
  );
}
