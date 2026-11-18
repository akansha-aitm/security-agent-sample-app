import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const theme = new URL(req.url).searchParams.get("theme");
  await supabase.from("profiles").update({ theme }).eq("id", user.id);
  return Response.json({ theme });
}
