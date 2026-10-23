import { NextResponse } from "next/server";
import { PROJECTS, filterProjects, findProject } from "@/lib/projects";

// Stateless JSON-RPC MCP endpoint over the same two authored sample records the page shows. Read-only.

type RpcRequest = { id?: number | string | null; method?: string; params?: { name?: string; arguments?: Record<string, unknown> } };

const TOOLS = [
  { name: "get_all", description: "Return the complete project index.", inputSchema: { type: "object", properties: {} } },
  { name: "get_by_id", description: "Open one project record by id.", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  { name: "search", description: "Find records by a text query.", inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } },
];

class RpcError extends Error {
  constructor(readonly code: number, message: string) {
    super(message);
  }
}

function callTool(name: string | undefined, args: Record<string, unknown> = {}) {
  switch (name) {
    case "get_all":
      return { projects: PROJECTS };
    case "get_by_id": {
      const project = findProject(args.id);
      if (!project) throw new RpcError(-32602, `No project with id ${String(args.id)}`);
      return { project };
    }
    case "search":
      return { projects: filterProjects(PROJECTS, "all", typeof args.query === "string" ? args.query : "") };
    default:
      throw new RpcError(-32602, `Unknown tool: ${String(name)}`);
  }
}

/** Human-readable catalog for the page's "MCP catalog" link. */
export function GET() {
  return NextResponse.json({ name: "Projects Showcase", version: "1.0.0", description: "A read-only catalog of the two sample project records.", tools: TOOLS });
}

export async function POST(request: Request) {
  let id: RpcRequest["id"] = null;
  try {
    const body = (await request.json()) as RpcRequest;
    id = body.id ?? null;
    let result: unknown;
    switch (body.method) {
      case "initialize":
        result = { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "Projects Showcase", version: "1.0.0" } };
        break;
      case "tools/list":
        result = { tools: TOOLS };
        break;
      case "tools/call":
        result = callTool(body.params?.name, body.params?.arguments);
        break;
      default:
        throw new RpcError(-32601, `Unknown method: ${String(body.method)}`);
    }
    return NextResponse.json({ jsonrpc: "2.0", id, result });
  } catch (error) {
    const code = error instanceof RpcError ? error.code : -32700;
    const message = error instanceof RpcError ? error.message : "Parse error";
    return NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } }, { status: 400 });
  }
}
