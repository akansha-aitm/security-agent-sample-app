import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { documentId } = await req.json();
  const res = await fetch(`${process.env.WORKER_URL}/jobs/summarize`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${process.env.WORKER_SECRET}` },
    body: JSON.stringify({ documentId: String(documentId), requestedBy: user.id }),
    signal: AbortSignal.timeout(15_000),
  });
  return Response.json(await res.json(), { status: res.status });
}
