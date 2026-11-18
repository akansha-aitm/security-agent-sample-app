import { createClient } from "@supabase/supabase-js";

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

export async function GET() {
  await admin.from("sessions").delete().lt("expires_at", new Date().toISOString());
  return Response.json({ cleaned: true });
}
