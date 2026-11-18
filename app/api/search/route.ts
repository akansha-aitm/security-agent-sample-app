import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { q } = await req.json();
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("q", String(q).slice(0, 200));
  url.searchParams.set("api_key", process.env.SERPAPI_KEY!);
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  return Response.json(await res.json());
}
