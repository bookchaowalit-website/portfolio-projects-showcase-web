import { describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/mcp/route";

function rpc(body: unknown) {
  return POST(new Request("http://localhost/api/mcp", { method: "POST", body: JSON.stringify(body) }));
}
const call = (id: number, name: string, args?: unknown) => rpc({ jsonrpc: "2.0", id, method: "tools/call", params: { name, arguments: args } }).then((r) => r.json());

describe("MCP route", () => {
  it("echoes the JSON-RPC request id and lists the three tools the page advertises", async () => {
    const body = await (await rpc({ jsonrpc: "2.0", id: 7, method: "tools/list" })).json();
    expect(body.id).toBe(7);
    expect(body.result.tools.map((t: { name: string }) => t.name)).toEqual(["get_all", "get_by_id", "search"]);
  });

  it("get_all returns the real records", async () => {
    const { result } = await call(1, "get_all");
    expect(result.projects.map((p: { name: string }) => p.name)).toEqual(["Portfolio Site", "API Server"]);
  });

  it("get_by_id opens one record and errors on an unknown id", async () => {
    expect((await call(2, "get_by_id", { id: "2" })).result.project.name).toBe("API Server");
    const bad = await call(3, "get_by_id", { id: "99" });
    expect(bad.error.code).toBe(-32602);
    expect(bad.id).toBe(3);
  });

  it("search matches technologies too", async () => {
    expect((await call(4, "search", { query: "express" })).result.projects.map((p: { id: string }) => p.id)).toEqual(["2"]);
  });

  it("rejects an unknown tool instead of echoing it back", async () => {
    const body = await call(5, "delete_all");
    expect(body.result).toBeUndefined();
    expect(body.error.code).toBe(-32602);
  });

  it("answers an unknown method and malformed JSON with JSON-RPC errors", async () => {
    expect((await (await rpc({ jsonrpc: "2.0", id: 6, method: "nope" })).json()).error.code).toBe(-32601);
    const res = await POST(new Request("http://localhost/api/mcp", { method: "POST", body: "{" }));
    expect((await res.json()).error.code).toBe(-32700);
  });

  it("GET describes the same tools", async () => {
    const body = await GET().json();
    expect(body.tools).toHaveLength(3);
  });
});
