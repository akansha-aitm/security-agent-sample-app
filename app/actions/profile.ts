"use server";
import { createClient } from "@/lib/supabase/server";

export async function updateDisplayName(name: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  await supabase.from("profiles").update({ display_name: name.slice(0, 80) }).eq("id", user.id);
}
