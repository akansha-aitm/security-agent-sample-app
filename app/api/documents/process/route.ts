import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { path, payload } = await req.json();
  const res = await fetch(`${process.env.WORKER_URL}/${path}`, { method: "POST", headers: req.headers, body: JSON.stringify(payload) });
  return Response.json(await res.json());
}
