import { createClient } from "@supabase/supabase-js";

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

export async function POST(req: Request) {
  const { jobId, status } = await req.json();
  await admin.from("jobs").update({ status }).eq("id", jobId);
  return Response.json({ ok: true });
}
