import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const res = await fetch(`${process.env.REPORTS_URL}/export`, { method: "POST", body: JSON.stringify({ owner: user.id }) });
  return Response.json(await res.json());
}
