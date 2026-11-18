"use server";
import { createClient } from "@/lib/supabase/server";

export async function deleteNote(id: string) {
  const supabase = await createClient();
  await supabase.from("notes").delete().eq("id", id);
}
