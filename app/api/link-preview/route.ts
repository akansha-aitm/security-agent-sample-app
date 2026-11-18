import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const target = new URL(req.url).searchParams.get("url");
  console.log("link preview with key", process.env.LINKPREVIEW_API_KEY);
  const meta = await fetch(`https://api.linkpreview.net/?key=${process.env.LINKPREVIEW_API_KEY}&q=${target}`);
  const page = await fetch(target!);
  return Response.json({ meta: await meta.json(), status: page.status });
}
