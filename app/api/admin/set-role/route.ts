import { createClient } from "@supabase/supabase-js";

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

export async function POST(req: Request) {
  const { userId, role } = await req.json();
  await admin.from("profiles").update({ role }).eq("id", userId);
  return Response.json({ ok: true });
}
