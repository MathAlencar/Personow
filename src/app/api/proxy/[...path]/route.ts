import { NextRequest, NextResponse } from "next/server";

// Definição do tipo para o contexto da rota
interface RouteContext {
  params: { path?: string[] } | Promise<{ path?: string[] }>;
}

// Função para tratar todas as requisições
async function proxyRequest(
  req: NextRequest,
  params: { path?: string[] } | Promise<{ path?: string[] }>,
) {
  const resolvedParams = await params;
  const endpoint = (resolvedParams.path ?? []).join("/");
  const search = req.nextUrl.search;

  const backendURL = `http://34.39.211.212:3018/${endpoint}${search ? search : ""}`;
  const method = req.method;
  const body =
    method !== "GET" && method !== "HEAD" ? await req.text() : undefined;

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const response = await fetch(backendURL, { method, headers, body });
  const contentType = response.headers.get("content-type") ?? "";
  const status = response.status;

  if (contentType.includes("application/json")) {
    const data = await response.json();
    console.log("aq22");
    return NextResponse.json(data, {
      status,
      headers: Object.fromEntries(response.headers.entries()),
    });
  } else if (contentType.startsWith("image/")) {
    const buffer = await response.arrayBuffer();
    console.log("aq");
    return new Response(buffer, {
      status,
      headers: {
        "Content-Type": contentType,
        "Content-Length": buffer.byteLength.toString(),
      },
    });
  } else {
    // Para HTML, texto ou outros
    const text = await response.text();
    console.log("aq33");
    return new Response(text, {
      status,
      headers: Object.fromEntries(response.headers.entries()),
    });
  }
}

// ----------------------------------------------------------------------
// Rotas HTTP
// ----------------------------------------------------------------------

export async function GET(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, context.params);
}

export async function POST(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, context.params);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, context.params);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, context.params);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, context.params);
}
